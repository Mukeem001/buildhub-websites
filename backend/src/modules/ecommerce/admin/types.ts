import type { Response } from "express";
import type { AuthRequest } from "../../../middleware/auth";
import type { WebsiteScopedRequest } from "../../shared/websiteScope";

export type EcommerceAdminRequest = WebsiteScopedRequest & AuthRequest;
export type EcommerceAdminControllerHandler = (req: EcommerceAdminRequest, res: Response) => Promise<Response>;
