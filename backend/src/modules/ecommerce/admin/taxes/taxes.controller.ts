import { Response } from "express";
import { createTax, deleteTax, getTaxes, updateTax } from "./taxes.service";
import { EcommerceAdminRequest, getParamString, handleControllerError, sendContext } from "../controller.utils";

export const listAdminTaxesRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await getTaxes(req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};

export const createAdminTaxRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await createTax(req.body || {}, req.websiteContext?.websiteId); return res.status(201).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};

export const updateAdminTaxRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await updateTax(getParamString(req.params.id), req.body || {}, req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};

export const deleteAdminTaxRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await deleteTax(getParamString(req.params.id), req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};
