import { Request, Response, NextFunction } from "express";

import User from "../models/User";
import { verifyAccessToken } from "../utils/jwt";

interface WebsiteScopedRequest extends Request {
  websiteContext?: {
    websiteId?: string;
    websiteSlug?: string;
  };
}

export interface AuthRequest extends Request {
  user?: any;
}

const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const header =
      req.headers.authorization;

    if (
      !header ||
      !header.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const token = header.split(" ")[1];

    const payload =
      verifyAccessToken(token);

    const user = await User.findById(
      payload.userId
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Your account has been suspended. Please contact support.",
      });
    }

    const scopedReq = req as WebsiteScopedRequest;
    const requestedWebsiteId = (scopedReq.params?.websiteId as string | undefined) || (scopedReq.query?.websiteId as string | undefined) || (scopedReq.body?.websiteId as string | undefined);
    const requestedWebsiteSlug = (scopedReq.params?.websiteSlug as string | undefined) || (scopedReq.query?.websiteSlug as string | undefined) || (scopedReq.body?.websiteSlug as string | undefined);

    if (requestedWebsiteId || requestedWebsiteSlug) {
      const userWebsiteId = user.websiteId || "";
      const userWebsiteSlug = user.websiteSlug || "";

      const websiteMatches =
        (!requestedWebsiteId || userWebsiteId === requestedWebsiteId || userWebsiteId === "") &&
        (!requestedWebsiteSlug || userWebsiteSlug === requestedWebsiteSlug || userWebsiteSlug === "");

      if (!websiteMatches) {
        return res.status(403).json({
          success: false,
          message: "This token is not authorized for the requested website",
        });
      }
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

export default authMiddleware;