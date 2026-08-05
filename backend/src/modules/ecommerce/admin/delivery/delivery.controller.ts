import { Response } from "express";
import { createDeliveryPartner, deleteDeliveryPartner, getDeliveryPartners, updateDeliveryPartner } from "./delivery.service";
import { EcommerceAdminRequest, getParamString, handleControllerError, sendContext } from "../controller.utils";

export const listAdminDeliveryRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await getDeliveryPartners(req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};

export const createAdminDeliveryRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await createDeliveryPartner(req.body || {}, req.websiteContext?.websiteId); return res.status(201).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};

export const updateAdminDeliveryRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await updateDeliveryPartner(getParamString(req.params.id), req.body || {}, req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};

export const deleteAdminDeliveryRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await deleteDeliveryPartner(getParamString(req.params.id), req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};
