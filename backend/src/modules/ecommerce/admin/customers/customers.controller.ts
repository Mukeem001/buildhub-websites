import { Response } from "express";
import { blockCustomer, deleteCustomer, getCustomerById, getCustomers, getCustomerOrders, getCustomerWallet, unblockCustomer, updateCustomer } from "./customers.service";
import { EcommerceAdminRequest, getParamString, handleControllerError, sendContext } from "../controller.utils";

export const listAdminCustomersRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await getCustomers(req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};

export const getAdminCustomerByIdRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await getCustomerById(getParamString(req.params.id), req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};

export const updateAdminCustomerRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await updateCustomer(getParamString(req.params.id), req.body || {}, req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};

export const deleteAdminCustomerRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await deleteCustomer(getParamString(req.params.id), req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};

export const blockAdminCustomerRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await blockCustomer(getParamString(req.params.id), req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};

export const unblockAdminCustomerRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await unblockCustomer(getParamString(req.params.id), req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};

export const getAdminCustomerOrdersRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await getCustomerOrders(getParamString(req.params.id), req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};

export const getAdminCustomerWalletRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await getCustomerWallet(getParamString(req.params.id), req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};
