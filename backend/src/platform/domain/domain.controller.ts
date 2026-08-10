import { Request, Response } from "express";
import domainService from "./domain.service";

export const connectDomain = async (req: Request, res: Response) => {
  try {
    const websiteId = Array.isArray(req.body.websiteId) ? req.body.websiteId[0] : req.body.websiteId;
    const domain = Array.isArray(req.body.domain) ? req.body.domain[0] : req.body.domain;
    const cnameHost = Array.isArray(req.body.cnameHost) ? req.body.cnameHost[0] : req.body.cnameHost;
    const cnameTarget = Array.isArray(req.body.cnameTarget) ? req.body.cnameTarget[0] : req.body.cnameTarget;

    if (!websiteId || !domain) {
      return res.status(400).json({ success: false, message: "websiteId and domain are required." });
    }

    const data = await domainService.connectDomain(websiteId, domain, cnameHost, cnameTarget);

    return res.status(201).json({ success: true, message: "Domain connected successfully.", data });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const listDomains = async (req: Request, res: Response) => {
  try {
    const data = await domainService.getAllDomains();
    return res.json({ success: true, data });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getDomain = async (req: Request, res: Response) => {
  try {
    const websiteId = Array.isArray(req.params.websiteId) ? req.params.websiteId[0] : req.params.websiteId;
    const data = await domainService.getDomain(websiteId);

    return res.json({ success: true, data });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const issueSsl = async (req: Request, res: Response) => {
  try {
    const websiteId = Array.isArray(req.params.websiteId) ? req.params.websiteId[0] : req.params.websiteId;
    const data = await domainService.issueSsl(websiteId);
    return res.json({ success: true, message: "SSL issuance triggered.", data });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const verifyDomain = async (req: Request, res: Response) => {
  try {
    const websiteId = Array.isArray(req.params.websiteId) ? req.params.websiteId[0] : req.params.websiteId;
    const data = await domainService.verifyDomain(websiteId);

    return res.json({ success: true, data });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const removeDomain = async (req: Request, res: Response) => {
  try {
    const websiteId = Array.isArray(req.params.websiteId) ? req.params.websiteId[0] : req.params.websiteId;
    const deleted = await domainService.removeDomain(websiteId);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "No connected domain found for this website." });
    }

    return res.json({ success: true, message: "Domain removed successfully.", data: deleted });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
