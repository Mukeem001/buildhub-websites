import { Response } from "express";
import type { EcommerceUserRequest } from "./types";

export type { EcommerceUserRequest, EcommerceControllerHandler } from "./types";

export const getParamString = (value: string | string[] | undefined) => {
  if (Array.isArray(value)) return value[0] || "";
  return value || "";
};

export const sendContext = (req: EcommerceUserRequest, data: any) => ({
  success: true,
  website: {
    websiteId: req.websiteContext?.websiteId || null,
    websiteSlug: req.websiteContext?.websiteSlug || null,
    templateSlug: req.websiteContext?.templateSlug || null,
  },
  data,
});

export const sendError = (res: Response, message: string, statusCode = 500) =>
  res.status(statusCode).json({
    success: false,
    message,
  });

export const handleControllerError = (res: Response, error: unknown, fallbackMessage = "Internal Server Error") => {
  const message = error instanceof Error ? error.message : fallbackMessage;
  return sendError(res, message);
};
