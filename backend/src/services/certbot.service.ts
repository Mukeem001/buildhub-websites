import dns from "dns";
import fs from "fs-extra";
import path from "path";
import { execa, execaCommand } from "execa";
import env from "../config/env";
import { IDomain } from "../domain/domain.model";

const resolver = dns.promises;

class CertbotService {
  private async isHostResolvedToTarget(
    host: string,
    target: string
  ): Promise<boolean> {
    try {
      if (/^[0-9.]+$/.test(target)) {
        const addresses = await resolver.resolve4(host);
        return addresses.includes(target);
      }

      try {
        const cnames = await resolver.resolveCname(host);
        const resolved = cnames.some(
          (cname) =>
            cname.toLowerCase() === target.toLowerCase() ||
            cname.toLowerCase().endsWith(target.toLowerCase())
        );

        if (resolved) {
          return true;
        }
      } catch {
        // Ignore CNAME failures and fall back to A record comparison.
      }

      const hostA = await resolver.resolve4(host);
      const targetA = await resolver.resolve4(target);
      return hostA.some((ip) => targetA.includes(ip));
    } catch {
      return false;
    }
  }

  private async getCertificateHosts(
    domainRecord: IDomain
  ): Promise<string[]> {
    const rootDomain = domainRecord.domain.toLowerCase();
    const hostname = domainRecord.hostname.toLowerCase();
    const target =
      domainRecord.cnameTarget || env.customDomainTarget;

    const hosts = new Set<string>([hostname]);

    if (hostname === rootDomain) {
      const wwwHost = `www.${rootDomain}`;
      if (await this.isHostResolvedToTarget(wwwHost, target)) {
        hosts.add(wwwHost);
      }
    } else if (hostname === `www.${rootDomain}`) {
      if (await this.isHostResolvedToTarget(rootDomain, target)) {
        hosts.add(rootDomain);
      }
    }

    return Array.from(hosts);
  }

  private parseCommand(command: string): string[] {
    return command
      .trim()
      .split(" ")
      .filter(Boolean);
  }

  private stringifyCertbotError(error: any): string {
    const message = error?.message || String(error);
    const stderr = error?.stderr || "";
    const stdout = error?.stdout || "";
    const details = [stderr, stdout].filter(Boolean).join("\n");
    return [message, details].filter(Boolean).join(" | ");
  }

  public async issueCertificate(
    domainRecord: IDomain
  ): Promise<string[]> {
    if (!env.certbotEnabled) {
      throw new Error("CERTBOT_ENABLED is not enabled in the environment.");
    }

    if (!env.certbotEmail) {
      throw new Error("CERTBOT_EMAIL must be set to request certificates.");
    }

    let hosts = await this.getCertificateHosts(domainRecord);

    // If nginx mode enabled, ensure we request both root and www forms
    if (env.certbotUseNginx) {
      const root = domainRecord.domain.toLowerCase();
      hosts = Array.from(new Set([root, `www.${root}`, ...hosts]));
    }

    if (hosts.length === 0) {
      throw new Error(
        "No valid hostnames were available for certificate issuance."
      );
    }

    await fs.ensureDir(env.certbotWebrootPath);

    // Ensure an nginx HTTP site exists to serve the ACME challenge
    try {
      await this.ensureNginxHttpSite(domainRecord, hosts);
      await this.testAndReloadNginx();
    } catch (err: any) {
      console.error("[Certbot] failed to prepare nginx for webroot challenges:", err);
      // continue — certbot webroot will likely fail but surface a clearer error
    }

    const commandParts = this.parseCommand(env.certbotCommand);

    // Support nginx plugin mode or fallback to webroot
    console.log(
      `[Certbot] issuing certificate for ${hosts.join(", ")} using nginx=${env.certbotUseNginx}`
    );

    let nginxError: string | null = null;
    let issued = false;

    if (env.certbotUseNginx) {
      const args = [
        "--nginx",
        ...hosts.flatMap((h) => ["-d", h]),
        "--non-interactive",
        "--agree-tos",
        "-m",
        env.certbotEmail,
        "--no-eff-email",
      ];

      if (env.certbotUseStaging) args.push("--staging");

      try {
        await execa(commandParts[0], [...commandParts.slice(1), ...args], {
          stdio: ["ignore", "pipe", "pipe"],
          shell: false,
        });
        issued = true;
      } catch (error: any) {
        nginxError = this.stringifyCertbotError(error);
        console.error("[Certbot] nginx issuance failed:", nginxError);
      }
    }

    if (!issued) {
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
        ...hosts.flatMap((host) => ["-d", host]),
      ];

      if (env.certbotUseStaging) {
        args.push("--staging");
      }

      try {
        await execa(commandParts[0], [...commandParts.slice(1), ...args], {
          stdio: ["ignore", "pipe", "pipe"],
        });
        issued = true;
        // After successful webroot issuance, write HTTPS site config
        try {
          await this.ensureNginxSslSite(domainRecord, hosts);
          await this.testAndReloadNginx();
        } catch (err: any) {
          console.error("[Certbot] warning: ssl site write/reload failed:", err);
        }
      } catch (error: any) {
        const webrootError = this.stringifyCertbotError(error);
        console.error("[Certbot] webroot issuance failed:", webrootError);

        if (nginxError && env.certbotUseNginx && env.certbotFallbackToWebroot) {
          throw new Error(
            `Nginx issuance failed: ${nginxError} | Webroot issuance failed: ${webrootError}`
          );
        }

        throw error;
      }
    }

    console.log("[Certbot] certificate issuance completed successfully");

    await this.reloadNginx();

    return hosts;
  }

  private async reloadNginx(): Promise<void> {
    // kept for backward compatibility
    await this.testAndReloadNginx();
  }

  private async testAndReloadNginx(): Promise<void> {
    if (!env.nginxTestCommand) {
      throw new Error("NGINX test command is not configured");
    }

    console.log("[Certbot] testing nginx configuration...");
    try {
      await execaCommand(env.nginxTestCommand, { shell: true });
    } catch (err: any) {
      const out = this.stringifyCertbotError(err);
      console.error("[Certbot] nginx test failed:", out);
      throw new Error(`nginx test failed: ${out}`);
    }

    if (!env.nginxReloadCommand) {
      console.log("[Certbot] nginx reload command not configured; skipping reload");
      return;
    }

    console.log("[Certbot] reloading nginx...");
    try {
      await execaCommand(env.nginxReloadCommand, { shell: true });
    } catch (err: any) {
      const out = this.stringifyCertbotError(err);
      console.error("[Certbot] nginx reload failed:", out);
      throw new Error(`nginx reload failed: ${out}`);
    }
  }

  private async ensureNginxHttpSite(domainRecord: IDomain, hosts: string[]): Promise<void> {
    const primary = hosts[0];
    const filename = `${primary}.conf`;
    const sitesAvailable = env.nginxSitesAvailablePath;
    const sitesEnabled = env.nginxSitesEnabledPath;
    const destPath = path.join(sitesAvailable, filename);
    const enabledPath = path.join(sitesEnabled, filename);

    const serverNames = hosts.join(" ");

    const conf = `server {
    listen 80;
    server_name ${serverNames};

    root ${env.certbotWebrootPath};

    location /.well-known/acme-challenge/ {
        alias ${path.join(env.certbotWebrootPath, ".well-known/acme-challenge")}/;
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

    await fs.ensureDir(path.dirname(destPath));
    await fs.writeFile(destPath, conf, { encoding: "utf8" });

    // create symlink in sites-enabled if missing
    try {
      const exists = await fs.pathExists(enabledPath);
      if (!exists) {
        await fs.ensureSymlink(destPath, enabledPath);
      }
    } catch (err) {
      // not fatal; log and continue
      console.error("[Certbot] failed to create symlink for nginx site:", err);
    }
  }

  private async ensureNginxSslSite(domainRecord: IDomain, hosts: string[]): Promise<void> {
    const primary = hosts[0];
    const filename = `${primary}.conf`;
    const sitesAvailable = env.nginxSitesAvailablePath;
    const sitesEnabled = env.nginxSitesEnabledPath;
    const destPath = path.join(sitesAvailable, filename);
    const enabledPath = path.join(sitesEnabled, filename);

    const serverNames = hosts.join(" ");

    const certPath = `/etc/letsencrypt/live/${primary}/fullchain.pem`;
    const keyPath = `/etc/letsencrypt/live/${primary}/privkey.pem`;

    const conf = `server {
    listen 80;
    server_name ${serverNames};
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name ${serverNames};

    ssl_certificate ${certPath};
    ssl_certificate_key ${keyPath};

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

    await fs.ensureDir(path.dirname(destPath));
    await fs.writeFile(destPath, conf, { encoding: "utf8" });

    // ensure symlink
    try {
      const exists = await fs.pathExists(enabledPath);
      if (!exists) {
        await fs.ensureSymlink(destPath, enabledPath);
      }
    } catch (err) {
      console.error("[Certbot] failed to create symlink for ssl nginx site:", err);
    }
  }
}

export default new CertbotService();