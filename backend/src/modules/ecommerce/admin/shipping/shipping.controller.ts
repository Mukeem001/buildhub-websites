import { Response } from "express";
import { createShipping, createZone, deleteShipping, getShipping, getZones } from "./shipping.service";
import { EcommerceAdminRequest, handleControllerError, sendContext } from "../controller.utils";

export const listAdminShippingRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await getShipping(req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};

export const createAdminShippingRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await createShipping(req.body || {}, req.websiteContext?.websiteId); return res.status(201).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};

export const deleteAdminShippingRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await deleteShipping(req.body?.id || req.params.id, req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};

export const listAdminShippingZonesRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await getZones(req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};

export const createAdminShippingZoneRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await createZone(req.body || {}, req.websiteContext?.websiteId); return res.status(201).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};
