import { Response } from "express";
import { exportPayments, getPaymentById, getPayments, refundPayment } from "./payments.service";
import { EcommerceAdminRequest, getParamString, handleControllerError, sendContext } from "../controller.utils";

export const listAdminPaymentsRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await getPayments(req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};

export const getAdminPaymentByIdRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await getPaymentById(getParamString(req.params.id), req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};

export const refundAdminPaymentRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await refundPayment(getParamString(req.params.id), req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};

export const exportAdminPaymentsRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await exportPayments(req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};
