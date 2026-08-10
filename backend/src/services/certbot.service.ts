import dns from "dns";
import fs from "fs-extra";
import { execa } from "execa";
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
    const stderr = error?.stderr || error?.stdout || "";
    return [message, stderr].filter(Boolean).join(" | ");
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
          stdio: "inherit",
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
          stdio: "inherit",
        });
        issued = true;
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
    if (!env.nginxReloadCommand) {
      return;
    }

    await execa(env.nginxReloadCommand, {
      shell: true,
      stdio: "inherit",
    });
  }
}

export default new CertbotService();