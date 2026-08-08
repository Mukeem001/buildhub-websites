import dns from "dns";
import Domain from "./domain.model";
import Website from "../models/Website";
import env from "../config/env";

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
    let normalizedDomain = domain.toLowerCase();
    let normalizedHost =
      cnameHost && cnameHost !== "@"
        ? cnameHost.toLowerCase()
        : "@";

    const domainParts = normalizedDomain.split(".");

    if (domainParts.length > 2 && normalizedHost !== "@") {
      if (domainParts[0] === normalizedHost) {
        normalizedDomain = domainParts.slice(1).join(".");
      } else {
        normalizedHost = domainParts[0];
        normalizedDomain = domainParts.slice(1).join(".");
      }
    }

    const hostname =
      normalizedHost === "@"
        ? normalizedDomain
        : `${normalizedHost}.${normalizedDomain}`;

    // Prevent duplicate hostname records
    const exists = await Domain.findOne({
      hostname,
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
    await domainRecord.save();

    return {
      ...domainRecord.toObject(),
      verified,
      reason,
    };
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