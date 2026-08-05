import { Response } from "express";
import { createNotification, deleteNotification, getNotifications } from "./notifications.service";
import { EcommerceAdminRequest, getParamString, handleControllerError, sendContext } from "../controller.utils";

export const listAdminNotificationsRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await getNotifications(req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};

export const createAdminNotificationRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await createNotification(req.body || {}, req.websiteContext?.websiteId); return res.status(201).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};

export const deleteAdminNotificationRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await deleteNotification(getParamString(req.params.id), req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};
