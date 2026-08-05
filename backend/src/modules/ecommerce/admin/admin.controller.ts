import { Response } from "express";
import User from "../../../models/User";
import { WebsiteScopedRequest } from "../../shared/websiteScope";
import { createAdminProduct as createProductService, getAdminProducts as getProductsService } from "./admin.service";

export const getAdminProducts = async (req: WebsiteScopedRequest, res: Response) => {
  try {
    const { websiteId, websiteSlug } = req.websiteContext || {};
    const products = await getProductsService(websiteId, websiteSlug);

    return res.status(200).json({
      success: true,
      message: "Ecommerce admin products fetched",
      website: {
        websiteId,
        websiteSlug,
        templateSlug: req.websiteContext?.templateSlug || null,
      },
      data: products,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const createAdminProduct = async (req: WebsiteScopedRequest, res: Response) => {
  try {
    const { websiteId, websiteSlug } = req.websiteContext || {};
    const { name, price, description, isActive } = req.body || {};

    if (!name || price === undefined) {
      return res.status(400).json({
        success: false,
        message: "name and price are required",
      });
    }

    const createdProduct = await createProductService({
      name: String(name).trim(),
      price: Number(price),
      description: description ? String(description).trim() : undefined,
      isActive: isActive !== false,
      websiteId,
      websiteSlug,
    });

    return res.status(201).json({
      success: true,
      message: "Ecommerce admin product created",
      website: {
        websiteId,
        websiteSlug,
        templateSlug: req.websiteContext?.templateSlug || null,
      },
      data: createdProduct,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const getAdminUsers = async (req: WebsiteScopedRequest, res: Response) => {
  try {
    const { websiteId, websiteSlug } = req.websiteContext || {};
    const users = await User.find({
      websiteId: websiteId || "",
      templateSlug: "ecommerce",
    }).select("_id fullName email role createdAt websiteId websiteSlug templateSlug").sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Ecommerce admin users fetched",
      website: {
        websiteId,
        websiteSlug,
        templateSlug: req.websiteContext?.templateSlug || null,
      },
      data: users,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
