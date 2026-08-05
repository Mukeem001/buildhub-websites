import { Response } from "express";
import { WebsiteScopedRequest } from "../../shared/websiteScope";

export const ecommerceFullFlowDemo = async (req: WebsiteScopedRequest, res: Response) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Ecommerce full flow demo",
      data: {
        flow: [
          {
            step: 1,
            title: "User signup",
            method: "POST",
            path: "/api/modules/ecommerce/auth/user/:websiteId/:websiteSlug/signup",
            body: {
              fullName: "Demo User",
              email: "demo.user@example.com",
              password: "demo12345",
              phone: "03001234567",
            },
          },
          {
            step: 2,
            title: "User login",
            method: "POST",
            path: "/api/modules/ecommerce/auth/user/:websiteId/:websiteSlug/login",
            body: {
              email: "demo.user@example.com",
              password: "demo12345",
            },
          },
          {
            step: 3,
            title: "Access protected products",
            method: "GET",
            path: "/api/modules/ecommerce/user/:websiteId/:websiteSlug/products",
            headers: {
              Authorization: "Bearer <token>",
            },
          },
          {
            step: 4,
            title: "Admin login",
            method: "POST",
            path: "/api/modules/ecommerce/auth/admin/:websiteId/:websiteSlug/login",
            body: {
              email: "admin@example.com",
              password: "admin12345",
            },
          },
          {
            step: 5,
            title: "Access admin products",
            method: "GET",
            path: "/api/modules/ecommerce/admin/:websiteId/:websiteSlug/products",
            headers: {
              Authorization: "Bearer <token>",
            },
          },
          {
            step: 6,
            title: "Create a product as admin",
            method: "POST",
            path: "/api/modules/ecommerce/admin/:websiteId/:websiteSlug/products",
            headers: {
              Authorization: "Bearer <token>",
            },
            body: {
              name: "New Product",
              price: 29.99,
              description: "Created through admin API",
            },
          },
        ],
        currentWebsite: req?.websiteContext
          ? {
              websiteId: req.websiteContext.websiteId,
              websiteSlug: req.websiteContext.websiteSlug,
            }
          : null,
        note: "Use the token returned from signup/login in the Authorization header for protected routes.",
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
