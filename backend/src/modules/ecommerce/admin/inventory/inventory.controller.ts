import { Response } from "express";
import { getInventory, updateInventory, addInventory, removeInventory, getLowStock, getOutOfStock, getInventoryHistory } from "./inventory.service";
import { EcommerceAdminRequest, getParamString, handleControllerError, sendContext } from "../controller.utils";

export const getInventoryRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try {
    const data = await getInventory(req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, data));
  } catch (error: unknown) {
    return handleControllerError(res, error);
  }
};

export const updateInventoryRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try {
    const data = await updateInventory(getParamString(req.params.productId), req.body || {}, req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, data));
  } catch (error: unknown) {
    return handleControllerError(res, error);
  }
};

export const addInventoryRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try {
    const data = await addInventory(req.body || {}, req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, data));
  } catch (error: unknown) {
    return handleControllerError(res, error);
  }
};

export const removeInventoryRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try {
    const data = await removeInventory(req.body || {}, req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, data));
  } catch (error: unknown) {
    return handleControllerError(res, error);
  }
};

export const getLowStockRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try {
    const data = await getLowStock(req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, data));
  } catch (error: unknown) {
    return handleControllerError(res, error);
  }
};

export const getOutOfStockRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try {
    const data = await getOutOfStock(req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, data));
  } catch (error: unknown) {
    return handleControllerError(res, error);
  }
};

export const getInventoryHistoryRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try {
    const data = await getInventoryHistory(req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, data));
  } catch (error: unknown) {
    return handleControllerError(res, error);
  }
};
