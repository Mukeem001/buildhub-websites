import { Request, Response } from "express";
import { publishWebsite as publishWebsiteService } from "../../publish/publish.service";

export const publishWebsite = async (req: Request, res: Response) => {
  try {
    const websiteId = Array.isArray(req.params.websiteId)
      ? req.params.websiteId[0]
      : req.params.websiteId;

    if (!websiteId) {
      return res.status(400).json({
        success: false,
        message: "Website ID is required for publishing.",
      });
    }

    const result = await publishWebsiteService(websiteId);

    return res.json({
      success: true,
      message: "Website published successfully.",
      data: result.website,
    });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
