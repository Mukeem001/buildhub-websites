import { Response } from "express";
import User from "../../../../models/User";
import { generateAccessToken } from "../../../../utils/jwt";
import { WebsiteScopedRequest } from "../../websiteScope";

const buildAuthResponse = (user: any, req?: WebsiteScopedRequest) => ({
  user: {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
  },
  token: generateAccessToken({
    userId: String(user._id),
    email: user.email,
    role: user.role,
  }),
  tokenType: "Bearer",
  website: req?.websiteContext
    ? {
        websiteId: req.websiteContext.websiteId,
        websiteSlug: req.websiteContext.websiteSlug,
        templateSlug: req.websiteContext.templateSlug || null,
      }
    : null,
});

export const ecommerceAdminLogin = async (req: WebsiteScopedRequest, res: Response) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "email and password are required",
      });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const requestedPassword = String(password);

    let user = await User.findOne({
      email: normalizedEmail,
      websiteId: req.websiteContext?.websiteId,
    }).select("+password");

    if (!user) {
      const existingAdmin = await User.findOne({
        role: "admin",
        websiteId: req.websiteContext?.websiteId,
      }).select("+password");
      if (!existingAdmin) {
        user = await User.create({
          fullName: "System Admin",
          email: normalizedEmail,
          password: requestedPassword,
          role: "admin",
          isEmailVerified: true,
          isActive: true,
          websiteId: req.websiteContext?.websiteId || "",
          websiteSlug: req.websiteContext?.websiteSlug || "",
          templateSlug: req.websiteContext?.templateSlug || "ecommerce",
        });
      } else {
        user = existingAdmin;
      }
    }

    if (!user || user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "Invalid admin credentials",
      });
    }

    const isValid = await user.comparePassword(requestedPassword);
    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin credentials",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Ecommerce admin login successful",
      data: buildAuthResponse(user, req),
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const ecommerceAdminDemoAuth = async (req: WebsiteScopedRequest, res: Response) => {
  return res.status(200).json({
    success: true,
    message: "Ecommerce admin auth demo payload",
    data: {
      adminLogin: {
        method: "POST",
        path: "/api/modules/ecommerce/auth/admin/:websiteId/:websiteSlug/login",
        body: {
          email: "admin@example.com",
          password: "admin12345",
        },
      },
      authHeader: "Authorization: Bearer <token>",
      website: req?.websiteContext
        ? {
            websiteId: req.websiteContext.websiteId,
            websiteSlug: req.websiteContext.websiteSlug,
          }
        : null,
    },
  });
};
