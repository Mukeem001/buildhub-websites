import { Response } from "express";
import { cancelOrder, createOrder, deleteOrder, exportOrders, getOrderById, getOrders, refundOrder, returnOrder, setOrderPaymentStatus, setOrderShippingStatus, setOrderStatus, assignDeliveryPartner } from "./orders.service";
import { EcommerceAdminRequest, getParamString, handleControllerError, sendContext } from "../controller.utils";

export const listAdminOrdersRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await getOrders(req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};

export const getAdminOrderByIdRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await getOrderById(getParamString(req.params.id), req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};

export const setAdminOrderStatusRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await setOrderStatus(req.body || {}, req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};

export const setAdminOrderPaymentStatusRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await setOrderPaymentStatus(req.body || {}, req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};

export const setAdminOrderShippingStatusRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await setOrderShippingStatus(req.body || {}, req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};

export const assignDeliveryRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await assignDeliveryPartner(req.body || {}, req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};

export const createAdminOrderRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await createOrder(req.body || {}, req.websiteContext?.websiteId); return res.status(201).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};

export const deleteAdminOrderRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await deleteOrder(getParamString(req.params.id), req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};

export const refundAdminOrderRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await refundOrder(getParamString(req.params.id), req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};

export const cancelAdminOrderRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await cancelOrder(getParamString(req.params.id), req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};

export const returnAdminOrderRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await returnOrder(getParamString(req.params.id), req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};

export const exportAdminOrdersRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await exportOrders(req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};
