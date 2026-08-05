import { Response } from "express";
import {
  createCheckout,
  setShipping,
  setPayment,
  confirmCheckout,
  getCheckoutSummary,
  createOrder,
  listOrders,
  getOrderById,
  getOrderInvoice,
  cancelOrder,
  returnOrder,
  refundOrder,
  reorderOrder,
  trackOrder,
  createPaymentOrder,
  verifyPayment,
  getPaymentHistory,
  getPaymentById,
  handlePaymentWebhook,
} from "./checkout.service";
import { EcommerceUserRequest, getParamString, handleControllerError, sendContext } from "../controller.utils";

export const createCheckoutRoute = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const result = await createCheckout(req.body || {}, req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, result));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const setCheckoutShipping = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const result = await setShipping(req.body || {}, req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, result));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const setCheckoutPayment = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const result = await setPayment(req.body || {}, req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, result));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const confirmCheckoutRoute = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const result = await confirmCheckout(req.body || {}, req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, result));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const getCheckoutSummaryRoute = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const summary = await getCheckoutSummary(req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, summary));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const createOrderRoute = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const order = await createOrder(req.body || {}, req.websiteContext?.websiteId);
    return res.status(201).json(sendContext(req, order));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const listOrdersRoute = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const orders = await listOrders(req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, orders));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const getOrderRoute = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const order = await getOrderById(getParamString(req.params.id), req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, order));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const getOrderInvoiceRoute = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const invoice = await getOrderInvoice(getParamString(req.params.id), req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, invoice));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const cancelOrderRoute = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const result = await cancelOrder(getParamString(req.params.id), req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, result));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const returnOrderRoute = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const result = await returnOrder(getParamString(req.params.id), req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, result));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const refundOrderRoute = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const result = await refundOrder(getParamString(req.params.id), req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, result));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const reorderOrderRoute = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const result = await reorderOrder(getParamString(req.params.id), req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, result));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const trackOrderRoute = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const result = await trackOrder(getParamString(req.params.id), req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, result));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const createPaymentOrderRoute = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const result = await createPaymentOrder(req.body || {}, req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, result));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const verifyPaymentRoute = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const result = await verifyPayment(req.body || {}, req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, result));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const getPaymentHistoryRoute = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const payments = await getPaymentHistory(req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, payments));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const getPaymentRoute = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const payment = await getPaymentById(getParamString(req.params.id), req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, payment));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const paymentWebhookRoute = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const result = await handlePaymentWebhook(req.body || {});
    return res.status(200).json(sendContext(req, result));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};
