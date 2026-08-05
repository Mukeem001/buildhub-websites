import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Website from "../../models/Website";

export interface WebsiteScopeContext {
  websiteId: string;
  websiteSlug: string;
  templateSlug?: string;
  website: any;
}

export interface WebsiteScopedRequest extends Request {
  websiteContext?: WebsiteScopeContext;
}

export const requireWebsiteScope = async (
  req: WebsiteScopedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const websiteId =
      (req.params.websiteId as string | undefined) ||
      (req.query.websiteId as string | undefined) ||
      (req.body?.websiteId as string | undefined);

    const websiteSlug =
      (req.params.websiteSlug as string | undefined) ||
      (req.query.websiteSlug as string | undefined) ||
      (req.body?.websiteSlug as string | undefined);

    if (!websiteId && !websiteSlug) {
      return res.status(400).json({
        success: false,
        message: "websiteId or websiteSlug is required",
      });
    }

    const query: Record<string, string> = {};

    if (websiteId && mongoose.isValidObjectId(websiteId)) {
      query._id = websiteId;
    }

    if (websiteSlug) {
      query.slug = websiteSlug;
    }

    let website = null as any;

    if (Object.keys(query).length > 0) {
      website = await Website.findOne(query).select("_id slug name templateSlug isPublished");
    }

    if (!website) {
      const fallbackSlug = websiteSlug || websiteId || "demo";
      const fallbackId = websiteId || websiteSlug || "demo";

      if (websiteId && websiteSlug && (websiteId.toLowerCase() === "demo" || websiteSlug.toLowerCase() === "demo")) {
        req.websiteContext = {
          websiteId: fallbackId,
          websiteSlug: fallbackSlug,
          templateSlug: (req.body?.templateSlug as string | undefined) || (req.query?.templateSlug as string | undefined) || "ecommerce",
          website: null,
        };

        return next();
      }

      return res.status(404).json({
        success: false,
        message: "Website not found",
      });
    }

    req.websiteContext = {
      websiteId: website._id.toString(),
      websiteSlug: website.slug,
      templateSlug: website.templateSlug,
      website,
    };

    return next();
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
