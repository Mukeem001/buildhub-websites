import type { Response } from "express";
import type { AuthRequest } from "../../../middleware/auth";
import type { WebsiteScopedRequest } from "../../shared/websiteScope";

export type EcommerceWebsiteContext = {
  websiteId?: string | null;
  websiteSlug?: string | null;
  templateSlug?: string | null;
};

export type EcommerceUserRequest = WebsiteScopedRequest & AuthRequest;

export type EcommerceControllerHandler = (req: EcommerceUserRequest, res: Response) => Promise<Response>;
