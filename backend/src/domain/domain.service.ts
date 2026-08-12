import dns from "dns";
import Domain from "./domain.model";
import Website from "../models/Website";
import env from "../config/env";
import certbotService from "../services/certbot.service";

const resolver = dns.promises;

class DomainService {
  // ==========================
  // Connect Custom Domain
  // ==========================

  async connectDomain(
    websiteId: string,
    domain: string,
    cnameHost?: string,
    cnameTarget?: string
  ) {
    const normalizedInputDomain = domain
      .toLowerCase()
      .trim();
    const normalizedHost =
      cnameHost && cnameHost !== "@"
        ? cnameHost.toLowerCase().trim()
        : "@";

    const domainParts = normalizedInputDomain.split(".");

    let normalizedDomain = normalizedInputDomain;
    let hostname = normalizedInputDomain;

    if (domainParts.length === 2) {
      normalizedDomain = normalizedInputDomain;
      hostname =
        normalizedHost === "@"
          ? normalizedInputDomain
          : `${normalizedHost}.${normalizedInputDomain}`;
    } else if (domainParts.length > 2) {
      // Treat input with more than two labels as a full host.
      normalizedDomain = normalizedInputDomain;
      hostname = normalizedInputDomain;
    }

    // Prevent duplicate hostname or domain records
    const exists = await Domain.findOne({
      $or: [
        { hostname },
        { domain: normalizedDomain },
      ],
    });

    if (exists) {
      throw new Error(
        "This domain is already connected."
      );
    }

    const newDomain = await Domain.create({
      websiteId,

      domain: normalizedDomain,

      hostname,

      type: "custom",

      cnameHost: cnameHost || "www",

      cnameTarget:
        cnameTarget || env.customDomainTarget,

      verificationStatus: "pending",

      sslStatus: "pending",
    });

    await Website.findByIdAndUpdate(websiteId, {
      customDomain: normalizedDomain,
      domain: normalizedDomain,
    });

    return newDomain;
  }

  // ==========================
  // Verify Domain DNS
  // ==========================

  async verifyDomain(websiteId: string) {
    const domainRecord = await Domain.findOne({
      websiteId,
    });

    if (!domainRecord) {
      throw new Error(
        "No connected domain found for this website."
      );
    }

    const host =
      domainRecord.hostname ||
      (domainRecord.cnameHost === "@" ||
      !domainRecord.cnameHost
        ? domainRecord.domain
        : `${domainRecord.cnameHost}.${domainRecord.domain}`);

    const target =
      domainRecord.cnameTarget || env.customDomainTarget;
    let verified = false;
    let reason = "";

    console.log(
      `[DomainService] verifyDomain websiteId=${websiteId} host=${host} target=${target}`
    );

    try {
      if (/^[0-9.]+$/.test(target)) {
        const addresses = await resolver.resolve4(
          host
        );
        verified = addresses.includes(target);
      } else {
        try {
          const cnames = await resolver.resolveCname(
            host
          );
          verified = cnames.some(
            (cname) =>
              cname.toLowerCase() ===
                target.toLowerCase() ||
              cname
                .toLowerCase()
                .endsWith(target.toLowerCase())
          );
        } catch (err) {
          reason = String(err);
        }

        if (!verified) {
          const hostA = await resolver.resolve4(
            host
          );
          const targetA = await resolver.resolve4(
            target
          );
          verified = hostA.some((ip) =>
            targetA.includes(ip)
          );
        }
      }
    } catch (error: any) {
      reason = error.message || String(error);
    }

    domainRecord.verificationStatus =
      verified ? "verified" : "failed";
    // persist the reason (dns error or resolver message) for frontend debugging
    domainRecord.verificationReason = reason || (verified ? "" : "DNS records did not resolve to the expected target");

    if (verified && env.certbotEnabled) {
      domainRecord.sslStatus = "generating";
      domainRecord.sslError = "";
      await domainRecord.save();

      console.log(
        `[DomainService] starting SSL issuance for websiteId=${websiteId} domain=${domainRecord.domain}`
      );

      try {
        await certbotService.issueCertificate(domainRecord);
        domainRecord.sslStatus = "active";
        domainRecord.sslError = "";
        console.log(
          `[DomainService] SSL issuance succeeded for websiteId=${websiteId} domain=${domainRecord.domain}`
        );
      } catch (error: any) {
        domainRecord.sslStatus = "failed";
        domainRecord.sslError =
          error?.message || String(error);
        console.error(
          `[DomainService] SSL issuance failed for websiteId=${websiteId} domain=${domainRecord.domain}:`,
          error
        );
      }
    }

      await domainRecord.save();

    return {
      ...domainRecord.toObject(),
      verified,
      reason,
    };
  }

  // ==========================
  // List all connected domains
  // ==========================

  async getAllDomains() {
    return await Domain.find().lean();
  }

  // ==========================
  // Issue SSL for verified domain
  // ==========================

  async issueSsl(
    websiteId: string
  ) {
    const domainRecord = await Domain.findOne({
      websiteId,
    });

    if (!domainRecord) {
      throw new Error(
        "No connected domain found for this website."
      );
    }

    if (domainRecord.verificationStatus !== "verified") {
      throw new Error(
        "Domain DNS must be verified before issuing SSL."
      );
    }

    if (!env.certbotEnabled) {
      throw new Error(
        "SSL issuance is disabled. Enable CERTBOT_ENABLED=true in your environment."
      );
    }

    domainRecord.sslStatus = "generating";
    domainRecord.sslError = "";
    await domainRecord.save();

    try {
      await certbotService.issueCertificate(domainRecord);
      domainRecord.sslStatus = "active";
      domainRecord.sslError = "";
    } catch (error: any) {
      domainRecord.sslStatus = "failed";
      domainRecord.sslError =
        error?.message || String(error);
    }

    await domainRecord.save();
    return domainRecord;
  }

  // ==========================
  // Get Website Domain
  // ==========================

  async getDomain(
    websiteId: string
  ) {
    return await Domain.findOne({
      websiteId,
    });
  }

  // ==========================
  // Delete Domain
  // ==========================

  async removeDomain(
    websiteId: string
  ) {
    const domainRecord = await Domain.findOneAndDelete({
      websiteId,
    });

    if (domainRecord) {
      await Website.findByIdAndUpdate(websiteId, {
        customDomain: "",
        domain: "",
      });
    }

    return domainRecord;
  }
}

export default new DomainService();