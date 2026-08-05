import { Request, Response } from "express";
import validator from "validator";
import User from "../../../models/User";
import { generateAccessToken } from "../../../utils/jwt";
import { WebsiteScopedRequest } from "../websiteScope";

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
      }
    : null,
});

export const ecommerceUserSignup = async (req: WebsiteScopedRequest, res: Response) => {
  try {
    const { fullName, email, password, phone } = req.body || {};

    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "fullName, email, and password are required",
      });
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    if (!validator.isEmail(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    if (String(password).length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const user = await User.create({
      fullName: String(fullName).trim(),
      email: normalizedEmail,
      phone: phone ? String(phone).trim() : undefined,
      password: String(password),
      role: "user",
    });

    return res.status(201).json({
      success: true,
      message: "Ecommerce user signup successful",
      data: {
        ...buildAuthResponse(user),
        website: {
          websiteId: req.params.websiteId || null,
          websiteSlug: req.params.websiteSlug || null,
        },
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const ecommerceUserLogin = async (req: WebsiteScopedRequest, res: Response) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "email and password are required",
      });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isValid = await user.comparePassword(String(password));
    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Ecommerce user login successful",
      data: {
        ...buildAuthResponse(user),
        website: {
          websiteId: req.params.websiteId || null,
          websiteSlug: req.params.websiteSlug || null,
        },
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

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
    const user = await User.findOne({ email: normalizedEmail }).select("+password");

    if (!user || user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "Invalid admin credentials",
      });
    }

    const isValid = await user.comparePassword(String(password));
    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin credentials",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Ecommerce admin login successful",
      data: {
        ...buildAuthResponse(user),
        website: {
          websiteId: req.params.websiteId || null,
          websiteSlug: req.params.websiteSlug || null,
        },
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const ecommerceDemoAuth = async (req: WebsiteScopedRequest, res: Response) => {
  return res.status(200).json({
    success: true,
    message: "Ecommerce auth demo payload",
    data: {
      userSignup: {
        method: "POST",
        path: "/api/modules/ecommerce/auth/:websiteId/:websiteSlug/signup",
        body: {
          fullName: "Demo User",
          email: "demo.user@example.com",
          password: "demo12345",
          phone: "03001234567",
        },
      },
      userLogin: {
        method: "POST",
        path: "/api/modules/ecommerce/auth/:websiteId/:websiteSlug/login",
        body: {
          email: "demo.user@example.com",
          password: "demo12345",
        },
      },
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
