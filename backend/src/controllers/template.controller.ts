import { Request, Response } from "express";

import Template from "../models/Template";
import { errorResponse, successResponse } from "../utils/response";

export const getTemplates = async (
  _req: Request,
  res: Response
) => {
  try {
    const templates = await Template.find({}).sort({
      createdAt: -1,
    });

    return successResponse(
      res,
      "Templates fetched successfully.",
      templates
    );
  } catch (error: any) {
    return errorResponse(res, error.message, 500);
  }
};

export const getTemplateById = async (
  req: Request,
  res: Response
) => {
  try {
    const template = await Template.findById(req.params.id);

    if (!template) {
      return errorResponse(res, "Template not found.", 404);
    }

    return successResponse(
      res,
      "Template fetched successfully.",
      template
    );
  } catch (error: any) {
    return errorResponse(res, error.message, 500);
  }
};

export const createTemplate = async (
  req: Request,
  res: Response
) => {
  try {
    const payload = { ...req.body };

    if (!payload.name) {
      return errorResponse(res, "Template name is required.", 400);
    }

    const baseSlug = (payload.slug || payload.name)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "template";

    let slug = baseSlug;
    let suffix = 1;

    while (await Template.exists({ slug })) {
      slug = `${baseSlug}-${suffix}`;
      suffix += 1;
    }

    payload.slug = slug;

    const template = await Template.create(payload);

    return successResponse(
      res,
      "Template created successfully.",
      template,
      201
    );
  } catch (error: any) {
    return errorResponse(res, error.message, 400);
  }
};

export const updateTemplate = async (
  req: Request,
  res: Response
) => {
  try {
    const template = await Template.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!template) {
      return errorResponse(res, "Template not found.", 404);
    }

    return successResponse(
      res,
      "Template updated successfully.",
      template
    );
  } catch (error: any) {
    return errorResponse(res, error.message, 400);
  }
};

export const deleteTemplate = async (
  req: Request,
  res: Response
) => {
  try {
    const template = await Template.findByIdAndDelete(req.params.id);

    if (!template) {
      return errorResponse(res, "Template not found.", 404);
    }

    return successResponse(res, "Template deleted successfully.");
  } catch (error: any) {
    return errorResponse(res, error.message, 500);
  }
};
