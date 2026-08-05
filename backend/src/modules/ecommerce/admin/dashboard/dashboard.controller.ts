import { Response } from "express";
import { getDashboardAnalytics, getDashboardCustomers, getDashboardOrders, getDashboardOverview, getDashboardProducts, getDashboardRevenue, getDashboardStats } from "./dashboard.service";
import { EcommerceAdminRequest, handleControllerError, sendContext } from "../controller.utils";

export const getDashboardOverviewRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try {
    const data = await getDashboardOverview(req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, data));
  } catch (error: unknown) {
    return handleControllerError(res, error);
  }
};

export const getDashboardStatsRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try {
    const data = await getDashboardStats(req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, data));
  } catch (error: unknown) {
    return handleControllerError(res, error);
  }
};

export const getDashboardRevenueRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try {
    const data = await getDashboardRevenue(req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, data));
  } catch (error: unknown) {
    return handleControllerError(res, error);
  }
};

export const getDashboardOrdersRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try {
    const data = await getDashboardOrders(req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, data));
  } catch (error: unknown) {
    return handleControllerError(res, error);
  }
};

export const getDashboardCustomersRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try {
    const data = await getDashboardCustomers(req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, data));
  } catch (error: unknown) {
    return handleControllerError(res, error);
  }
};

export const getDashboardProductsRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try {
    const data = await getDashboardProducts(req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, data));
  } catch (error: unknown) {
    return handleControllerError(res, error);
  }
};

export const getDashboardAnalyticsRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try {
    const data = await getDashboardAnalytics(req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, data));
  } catch (error: unknown) {
    return handleControllerError(res, error);
  }
};
