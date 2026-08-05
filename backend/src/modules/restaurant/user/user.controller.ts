import { Response } from "express";
import { WebsiteScopedRequest } from "../../shared/websiteScope";

export const getMenu = async (req: WebsiteScopedRequest, res: Response) => {
  try {
    const { websiteId, websiteSlug } = req.websiteContext || {};

    return res.status(200).json({
      success: true,
      message: "Restaurant user menu endpoint",
      websiteId,
      websiteSlug,
      data: [],
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
