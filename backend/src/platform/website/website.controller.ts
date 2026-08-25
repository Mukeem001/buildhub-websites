import { Request, Response } from "express";

import * as WebsiteService from "./website.service";

export const createWebsite = async (req: Request, res: Response) => {
  try {
    const { userId, templateSlug, name, subdomain, customDomain, domainType } = req.body;

    console.log(`[CREATE] request received`, {
      userId,
      templateSlug,
      name,
      subdomain,
      customDomain,
      domainType,
    });

    if (!userId || !templateSlug || !name) {
      return res.status(400).json({
        success: false,
        message: "User ID, template slug, and website name are required",
      });
    }

    if (domainType === "custom" && !customDomain) {
      return res.status(400).json({
        success: false,
        message: "Custom domain is required when using a custom domain option",
      });
    }

    const website = await WebsiteService.createWebsite({
      userId,
      templateSlug,
      name,
      subdomain,
      customDomain,
    });

    return res.status(201).json({
      success: true,
      message: "Website created successfully",
      data: website,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserWebsites = async (req: Request, res: Response) => {
  try {
    const userId = Array.isArray(req.params.userId) ? req.params.userId[0] : req.params.userId;
    const websites = await WebsiteService.getUserWebsites(userId);

    return res.json({ success: true, data: websites });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getWebsite = async (req: Request, res: Response) => {
  try {
    const websiteId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const website = await WebsiteService.getWebsiteById(websiteId);

    if (!website) {
      return res.status(404).json({ success: false, message: "Website not found" });
    }

    return res.json({ success: true, data: website });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteWebsite = async (req: Request, res: Response) => {
  try {
    const websiteId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    await WebsiteService.deleteWebsite(websiteId);

    return res.json({ success: true, message: "Website deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateWebsite = async (req: Request, res: Response) => {
  try {
    const websiteId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const { name, status } = req.body;
    const website = await WebsiteService.updateWebsite(websiteId, { name, status });

    if (!website) {
      return res.status(404).json({ success: false, message: "Website not found" });
    }

    return res.json({ success: true, message: "Website updated successfully", data: website });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getWebsiteDashboard = async (req: Request, res: Response) => {
  try {
    const websiteId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const dashboard = await WebsiteService.getWebsiteDashboard(websiteId);

    if (!dashboard) {
      return res.status(404).json({ success: false, message: "Website not found" });
    }

    return res.json({ success: true, data: dashboard });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getWebsiteEditor = async (req: Request, res: Response) => {
  try {
    const websiteId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const editor = await WebsiteService.getWebsiteEditor(websiteId);

    if (!editor) {
      return res.status(404).json({ success: false, message: "Website not found" });
    }

    return res.json({ success: true, data: editor });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const saveWebsiteDraft = async (req: Request, res: Response) => {
  try {
    const websiteId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const result = await WebsiteService.saveWebsiteDraft(websiteId, req.body);

    if (!result) {
      return res.status(404).json({ success: false, message: "Website not found" });
    }

    return res.json({ success: true, message: "Draft saved successfully", data: result });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const updateWebsiteSettings = async (req: Request, res: Response) => {
  try {
    const websiteId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const settings = await WebsiteService.updateWebsiteSettings(websiteId, req.body);

    if (!settings) {
      return res.status(404).json({ success: false, message: "Settings not found" });
    }

    return res.json({ success: true, message: "Website settings updated successfully", data: settings });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
