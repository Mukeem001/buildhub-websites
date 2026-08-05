import { Response } from "express";
import {
  listWishlist,
  addWishlistItem,
  removeWishlistItem,
  clearWishlist,
  getCart,
  addCartItem,
  updateCartItem,
  deleteCartItem,
  clearCart,
  increaseCartItem,
  decreaseCartItem,
  applyCoupon,
  removeCoupon,
  getAvailableCoupons,
} from "./cart.service";
import { EcommerceUserRequest, handleControllerError, sendContext } from "../controller.utils";

export const getWishlist = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const wishlist = await listWishlist(req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, wishlist));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const addWishlist = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const wishlist = await addWishlistItem(req.body?.productId, req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, wishlist));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const deleteWishlistItem = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const wishlist = await removeWishlistItem(req.params.productId as string, req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, wishlist));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const clearUserWishlist = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const result = await clearWishlist(req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, result));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const getCartRoute = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const cart = await getCart(req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, cart));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const addCart = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const cart = await addCartItem(req.body || {}, req.websiteContext?.websiteId);
    return res.status(201).json(sendContext(req, cart));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const updateCart = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const cart = await updateCartItem(req.params.itemId as string, req.body || {}, req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, cart));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const deleteCart = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const cart = await deleteCartItem(req.params.itemId as string, req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, cart));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const clearUserCart = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const result = await clearCart(req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, result));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const increaseCart = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const cart = await increaseCartItem(req.params.itemId as string, req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, cart));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const decreaseCart = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const cart = await decreaseCartItem(req.params.itemId as string, req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, cart));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const applyCouponRoute = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const result = await applyCoupon(req.body || {}, req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, result));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const removeCouponRoute = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const result = await removeCoupon(req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, result));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const getAvailableCouponsRoute = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const coupons = await getAvailableCoupons(req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, coupons));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};
