import { Response } from "express";
import { getActivityLogs, getErrorsLogs, getLoginLogs, getLogs } from "./logs.service";
import { EcommerceAdminRequest, handleControllerError, sendContext } from "../controller.utils";

export const getAdminLogsRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await getLogs(req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};

export const getAdminLoginLogsRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await getLoginLogs(req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};

export const getAdminActivityLogsRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await getActivityLogs(req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};

export const getAdminErrorsLogsRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await getErrorsLogs(req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};
