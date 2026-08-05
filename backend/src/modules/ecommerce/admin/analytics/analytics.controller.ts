import { Response } from "express";
import { getAnalyticsCustomers, getAnalyticsOrders, getAnalyticsProducts, getAnalyticsRevenue, getAnalyticsSales, getAnalyticsTraffic } from "./analytics.service";
import { EcommerceAdminRequest, handleControllerError, sendContext } from "../controller.utils";

export const getAdminAnalyticsSalesRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await getAnalyticsSales(req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};

export const getAdminAnalyticsOrdersRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await getAnalyticsOrders(req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};

export const getAdminAnalyticsCustomersRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await getAnalyticsCustomers(req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};

export const getAdminAnalyticsProductsRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await getAnalyticsProducts(req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};

export const getAdminAnalyticsRevenueRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await getAnalyticsRevenue(req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};

export const getAdminAnalyticsTrafficRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await getAnalyticsTraffic(req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};
