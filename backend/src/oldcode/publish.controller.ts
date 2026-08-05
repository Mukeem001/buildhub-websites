import { Response } from "express";

import { AuthRequest } from "../middleware/auth";
import { publishWebsite } from "./publish.service";
import { errorResponse, successResponse } from "../utils/response";

export const publishWebsiteController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { title, templateId, domain, slug } = req.body;

    if (!title || !templateId) {
      return errorResponse(
        res,
        "Title and templateId are required.",
        400
      );
    }

    const website = await publishWebsite({
      owner: req.user?._id,
      title,
      templateId,
      domain,
      slug,
    });

    return successResponse(
      res,
      "Website published successfully.",
      website,
      201
    );
  } catch (error: any) {
    return errorResponse(res, error.message, 400);
  }
};

export const getPublishStatus = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { id } = req.params;

    return successResponse(
      res,
      "Publish status fetched successfully.",
      { websiteId: id, status: "published" }
    );
  } catch (error: any) {
    return errorResponse(res, error.message, 500);
  }
};
