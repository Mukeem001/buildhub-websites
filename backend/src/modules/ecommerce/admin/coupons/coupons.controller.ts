import { Response } from "express";
import { createCoupon, deleteCoupon, getCouponById, getCoupons, setCouponStatus, updateCoupon } from "./coupons.service";
import { EcommerceAdminRequest, getParamString, handleControllerError, sendContext } from "../controller.utils";

export const listAdminCouponsRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await getCoupons(req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};

export const getAdminCouponByIdRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await getCouponById(getParamString(req.params.id), req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};

export const createAdminCouponRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await createCoupon(req.body || {}, req.websiteContext?.websiteId); return res.status(201).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};

export const updateAdminCouponRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await updateCoupon(getParamString(req.params.id), req.body || {}, req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};

export const deleteAdminCouponRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await deleteCoupon(getParamString(req.params.id), req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};

export const setAdminCouponStatusRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await setCouponStatus(req.body || {}, req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};
