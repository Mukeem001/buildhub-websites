import dns from "dns";
import fs from "fs-extra";
import path from "path";
import { execa, execaCommand } from "execa";
import env from "../config/env";
import { IDomain } from "../domain/domain.model";

const resolver = dns.promises;

class CertbotService {
  /**
   * Check whether a hostname resolves to the configured server target.
   *
   * Supports:
   * - A record -> IP
   * - CNAME -> hostname
   * - CNAME/A fallback
   */
  private async isHostResolvedToTarget(
    host: string,
    target: string
  ): Promise<boolean> {
    try {
      host = host.toLowerCase().replace(/\.$/, "");
      target = target.toLowerCase().replace(/\.$/, "");

      // Target is an IPv4 address
      if (/^[0-9.]+$/.test(target)) {
        const addresses = await resolver.resolve4(host);

        return addresses.includes(target);
      }

      // Try CNAME first
      try {
        const cnames = await resolver.resolveCname(host);

        const resolved = cnames.some((cname) => {
          const normalized = cname.toLowerCase().replace(/\.$/, "");

          return (
            normalized === target ||
            normalized.endsWith(`.${target}`)
          );
        });

        if (resolved) {
          return true;
        }
      } catch {
        // Ignore CNAME failures.
      }

      // Fallback to A record comparison
      const hostA = await resolver.resolve4(host);
      const targetA = await resolver.resolve4(target);

      return hostA.some((ip) => targetA.includes(ip));
    } catch {
      return false;
    }
  }

  /**
   * Get all hostnames that should be included in the certificate.
   */
  private async getCertificateHosts(
    domainRecord: IDomain
  ): Promise<string[]> {
    const rootDomain = domainRecord.domain
      .toLowerCase()
      .replace(/\.$/, "");

    const hostname = domainRecord.hostname
      .toLowerCase()
      .replace(/\.$/, "");

    const target =
      domainRecord.cnameTarget || env.customDomainTarget;

    const hosts = new Set<string>();

    hosts.add(hostname);

    /**
     * If root domain is connected,
     * also include www if it points to the server.
     */
    if (hostname === rootDomain) {
      const wwwHost = `www.${rootDomain}`;

      if (await this.isHostResolvedToTarget(wwwHost, target)) {
        hosts.add(wwwHost);
      }
    }

    /**
     * If www is connected,
     * also include root domain if it points to the server.
     */
    if (hostname === `www.${rootDomain}`) {
      if (await this.isHostResolvedToTarget(rootDomain, target)) {
        hosts.add(rootDomain);
      }
    }

    return Array.from(hosts);
  }

  /**
   * Convert command string to executable + arguments.
   *
   * Example:
   * "sudo -n /usr/bin/certbot"
   *
   * becomes:
   * ["sudo", "-n", "/usr/bin/certbot"]
   */
  private parseCommand(command: string): string[] {
    return command
      .trim()
      .split(/\s+/)
      .filter(Boolean);
  }

  /**
   * Convert execa error into readable message.
   */
  private stringifyCertbotError(error: any): string {
    const message =
      error?.message ||
      String(error);

    const stderr =
      error?.stderr ||
      "";

    const stdout =
      error?.stdout ||
      "";

    const details = [stderr, stdout]
      .filter(Boolean)
      .join("\n");

    return [message, details]
      .filter(Boolean)
      .join(" | ");
  }

  /**
   * Optional Certbot config/work/log directories.
   */
  private getCertbotDirArgs(): string[] {
    const args: string[] = [];

    if (env.certbotConfigDir) {
      args.push(
        "--config-dir",
        env.certbotConfigDir
      );
    }

    if (env.certbotWorkDir) {
      args.push(
        "--work-dir",
        env.certbotWorkDir
      );
    }

    if (env.certbotLogsDir) {
      args.push(
        "--logs-dir",
        env.certbotLogsDir
      );
    }

    return args;
  }

  /**
   * Main SSL issuance flow.
   *
   * Flow:
   *
   * Domain
   *   ↓
   * DNS verification
   *   ↓
   * ACME webroot
   *   ↓
   * Certbot
   *   ↓
   * Nginx config
   *   ↓
   * nginx -t
   *   ↓
   * nginx reload
   */
  public async issueCertificate(
    domainRecord: IDomain
  ): Promise<string[]> {
    if (!env.certbotEnabled) {
      throw new Error(
        "CERTBOT_ENABLED is not enabled in the environment."
      );
    }

    if (!env.certbotEmail) {
      throw new Error(
        "CERTBOT_EMAIL must be set to request certificates."
      );
    }

    const hosts =
      await this.getCertificateHosts(domainRecord);

    if (hosts.length === 0) {
      throw new Error(
        "No valid hostnames were available for certificate issuance."
      );
    }

    console.log(
      `[Certbot] requested hosts: ${hosts.join(", ")}`
    );

    /**
     * Make sure ACME webroot exists.
     */
    await fs.ensureDir(
      env.certbotWebrootPath
    );

    await fs.ensureDir(
      path.join(
        env.certbotWebrootPath,
        ".well-known",
        "acme-challenge"
      )
    );

    /**
     * Make sure temporary HTTP Nginx configuration exists.
     *
     * This is required before Certbot HTTP-01 validation.
     */
    try {
      await this.ensureNginxHttpSite(
        domainRecord,
        hosts
      );

      await this.testAndReloadNginx();
    } catch (error: any) {
      const message =
        this.stringifyCertbotError(error);

      console.error(
        "[Certbot] Failed to prepare Nginx:",
        message
      );

      throw new Error(
        `Unable to prepare Nginx for SSL challenge: ${message}`
      );
    }

    /**
     * Certbot command.
     *
     * Example env:
     *
     * CERTBOT_COMMAND="sudo -n /usr/bin/certbot"
     */
    const commandParts =
      this.parseCommand(
        env.certbotCommand
      );

    if (commandParts.length === 0) {
      throw new Error(
        "CERTBOT_COMMAND is not configured."
      );
    }

    console.log(
      `[Certbot] issuing certificate for ${hosts.join(", ")}`
    );

    /**
     * We use WEBROOT here because it works cleanly
     * with our own Nginx configuration.
     */
    const args = [
      "certonly",

      "--webroot",

      "--non-interactive",

      "--agree-tos",

      "--email",
      env.certbotEmail,

      "--no-eff-email",

      "-w",
      env.certbotWebrootPath,

      ...hosts.flatMap((host) => [
        "-d",
        host,
      ]),

      ...this.getCertbotDirArgs(),
    ];

    if (env.certbotUseStaging) {
      args.push("--staging");
    }

    let certbotOutput: any;

    try {
      certbotOutput = await execa(
        commandParts[0],
        [
          ...commandParts.slice(1),
          ...args,
        ],
        {
          stdio: [
            "ignore",
            "pipe",
            "pipe",
          ],
          shell: false,
        }
      );
    } catch (error: any) {
      const errorMessage =
        this.stringifyCertbotError(error);

      console.error(
        "[Certbot] certificate issuance failed:",
        errorMessage
      );

      throw new Error(
        `Certbot SSL issuance failed: ${errorMessage}`
      );
    }

    console.log(
      "[Certbot] certificate created successfully."
    );

    if (certbotOutput?.stdout) {
      console.log(
        "[Certbot] stdout:",
        certbotOutput.stdout
      );
    }

    /**
     * IMPORTANT:
     *
     * Certificate is now created.
     *
     * Automatically create the HTTPS Nginx config.
     */
    try {
      await this.ensureNginxSslSite(
        domainRecord,
        hosts
      );
    } catch (error: any) {
      const message =
        this.stringifyCertbotError(error);

      console.error(
        "[Certbot] Failed to create SSL Nginx config:",
        message
      );

      throw new Error(
        `Certificate created, but Nginx SSL configuration failed: ${message}`
      );
    }

    /**
     * Test Nginx BEFORE reload.
     */
    try {
      await this.testAndReloadNginx();
    } catch (error: any) {
      const message =
        this.stringifyCertbotError(error);

      console.error(
        "[Certbot] Nginx validation/reload failed:",
        message
      );

      throw new Error(
        `Certificate created, but Nginx could not be reloaded: ${message}`
      );
    }

    console.log(
      `[Certbot] HTTPS successfully enabled for ${hosts.join(", ")}`
    );

    return hosts;
  }

  /**
   * Backward compatibility.
   */
  private async reloadNginx(): Promise<void> {
    await this.testAndReloadNginx();
  }

  /**
   * Test Nginx configuration and reload only if test succeeds.
   */
  private async testAndReloadNginx(): Promise<void> {
    if (!env.nginxTestCommand) {
      throw new Error(
        "NGINX test command is not configured."
      );
    }

    console.log(
      "[Certbot] testing nginx configuration..."
    );

    try {
      await execaCommand(
        env.nginxTestCommand,
        {
          shell: true,
        }
      );
    } catch (error: any) {
      const output =
        this.stringifyCertbotError(error);

      console.error(
        "[Certbot] nginx test failed:",
        output
      );

      throw new Error(
        `nginx test failed: ${output}`
      );
    }

    if (!env.nginxReloadCommand) {
      throw new Error(
        "NGINX reload command is not configured."
      );
    }

    console.log(
      "[Certbot] reloading nginx..."
    );

    try {
      await execaCommand(
        env.nginxReloadCommand,
        {
          shell: true,
        }
      );
    } catch (error: any) {
      const output =
        this.stringifyCertbotError(error);

      console.error(
        "[Certbot] nginx reload failed:",
        output
      );

      throw new Error(
        `nginx reload failed: ${output}`
      );
    }

    console.log(
      "[Certbot] nginx reloaded successfully."
    );
  }

  /**
   * Write a file using sudo.
   *
   * Backend user writes temporary file,
   * then sudo moves it into /etc/nginx.
   */
  private async writeFileAsRoot(
    tempPath: string,
    destPath: string,
    content: string
  ): Promise<void> {
    await fs.ensureDir(
      path.dirname(tempPath)
    );

    await fs.writeFile(
      tempPath,
      content,
      {
        encoding: "utf8",
      }
    );

    try {
      await execaCommand(
        `sudo -n mv "${tempPath}" "${destPath}"`,
        {
          shell: true,
        }
      );

      await execaCommand(
        `sudo -n chown root:root "${destPath}"`,
        {
          shell: true,
        }
      );

      await execaCommand(
        `sudo -n chmod 644 "${destPath}"`,
        {
          shell: true,
        }
      );
    } catch (error) {
      try {
        await fs.remove(tempPath);
      } catch {
        // Ignore cleanup error.
      }

      throw error;
    }
  }

  /**
   * Remove any stale nginx config for the same hostnames before ACME validation.
   *
   * This prevents nginx -t from failing on a missing certificate that belongs to
   * an older or incomplete SSL config.
   */
  private async removeConflictingNginxSiteConfigs(
    hosts: string[]
  ): Promise<void> {
    const siteNames = new Set(
      hosts.map((host) =>
        host.toLowerCase().replace(/\.$/, "")
      )
    );

    for (const host of siteNames) {
      const availablePath = path.join(
        env.nginxSitesAvailablePath,
        `${host}.conf`
      );

      const enabledPath = path.join(
        env.nginxSitesEnabledPath,
        `${host}.conf`
      );

      await Promise.allSettled([
        fs.remove(availablePath),
        fs.remove(enabledPath),
      ]);
    }
  }

  /**
   * Create HTTP Nginx site.
   *
   * This configuration is used for:
   *
   * /.well-known/acme-challenge/
   *
   * and during certificate issuance.
   */
  private async ensureNginxHttpSite(
    domainRecord: IDomain,
    hosts: string[]
  ): Promise<void> {
    const primary =
      hosts[0];

    const filename =
      `${primary}.conf`;

    const sitesAvailable =
      env.nginxSitesAvailablePath;

    const sitesEnabled =
      env.nginxSitesEnabledPath;

    const destPath =
      path.join(
        sitesAvailable,
        filename
      );

    const enabledPath =
      path.join(
        sitesEnabled,
        filename
      );

    const serverNames =
      hosts.join(" ");

    const challengePath =
      path.join(
        env.certbotWebrootPath,
        ".well-known",
        "acme-challenge"
      );

    const conf = `
server {
    listen 80;
    listen [::]:80;

    server_name ${serverNames};

    client_max_body_size 100M;

    location ^~ /.well-known/acme-challenge/ {
        root ${env.certbotWebrootPath};
        default_type text/plain;
        try_files $uri =404;
    }

    location / {
        proxy_pass http://127.0.0.1:${env.port};

        proxy_http_version 1.1;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Port $server_port;
    }
}
`;

    await fs.ensureDir(
      sitesAvailable
    );

    await fs.ensureDir(
      sitesEnabled
    );

    await this.removeConflictingNginxSiteConfigs(hosts);

    await fs.ensureDir(
      challengePath
    );

    const tmp =
      path.join(
        env.certbotWebrootPath,
        `${filename}.tmp`
      );

    await this.writeFileAsRoot(
      tmp,
      destPath,
      conf
    );

    /**
     * Enable site automatically.
     */
    await execaCommand(
      `sudo -n ln -sf "${destPath}" "${enabledPath}"`,
      {
        shell: true,
      }
    );

    console.log(
      `[Certbot] HTTP Nginx site enabled: ${filename}`
    );
  }

  /**
   * Create HTTPS Nginx configuration.
   *
   * This is called automatically AFTER Certbot succeeds.
   */
  private async ensureNginxSslSite(
    domainRecord: IDomain,
    hosts: string[]
  ): Promise<void> {
    const primary =
      hosts[0];

    const filename =
      `${primary}.conf`;

    const sitesAvailable =
      env.nginxSitesAvailablePath;

    const sitesEnabled =
      env.nginxSitesEnabledPath;

    const destPath =
      path.join(
        sitesAvailable,
        filename
      );

    const enabledPath =
      path.join(
        sitesEnabled,
        filename
      );

    const serverNames =
      hosts.join(" ");

    /**
     * Certbot creates:
     *
     * /etc/letsencrypt/live/domain/fullchain.pem
     * /etc/letsencrypt/live/domain/privkey.pem
     */
    const certPath =
      `/etc/letsencrypt/live/${primary}/fullchain.pem`;

    const keyPath =
      `/etc/letsencrypt/live/${primary}/privkey.pem`;

    /**
     * HTTP:
     *
     * Keep ACME challenge available.
     * Everything else redirects to HTTPS.
     *
     * HTTPS:
     *
     * Serve certificate and proxy to backend.
     */
    const conf = `
server {
    listen 80;
    listen [::]:80;

    server_name ${serverNames};

    client_max_body_size 100M;

    location ^~ /.well-known/acme-challenge/ {
        root ${env.certbotWebrootPath};
        default_type text/plain;
        try_files $uri =404;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;

    server_name ${serverNames};

    client_max_body_size 100M;

    ssl_certificate ${certPath};
    ssl_certificate_key ${keyPath};

    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    location / {
        proxy_pass http://127.0.0.1:${env.port};

        proxy_http_version 1.1;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Port $server_port;
    }
}
`;

    await fs.ensureDir(
      sitesAvailable
    );

    await fs.ensureDir(
      sitesEnabled
    );

    const tmp =
      path.join(
        env.certbotWebrootPath,
        `${filename}.tmp`
      );

    await this.writeFileAsRoot(
      tmp,
      destPath,
      conf
    );

    /**
     * Automatically enable Nginx site.
     */
    await execaCommand(
      `sudo -n ln -sf "${destPath}" "${enabledPath}"`,
      {
        shell: true,
      }
    );

    console.log(
      `[Certbot] HTTPS Nginx site enabled: ${filename}`
    );

    console.log(
      `[Certbot] certificate: ${certPath}`
    );

    console.log(
      `[Certbot] private key: ${keyPath}`
    );
  }
}

export default new CertbotService();