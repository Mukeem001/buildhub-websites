import { Response } from "express";
import {
  getCustomerActivity,
  getCustomerPreferences,
  getCustomerProfile,
  updateCustomerAvatar,
  updateCustomerEmail,
  updateCustomerMobile,
  updateCustomerPassword,
  updateCustomerPreferences,
  updateCustomerProfile,
  listAddresses,
  getAddressById,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "./profile.service";
import { EcommerceUserRequest, getParamString, handleControllerError, sendContext } from "../controller.utils";

export const getProfile = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const profile = await getCustomerProfile(req.user);
    return res.status(200).json(sendContext(req, profile));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const updateProfile = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const profile = await updateCustomerProfile(req.user, req.body || {});
    return res.status(200).json(sendContext(req, profile));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const updateAvatar = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const profile = await updateCustomerAvatar(req.user, req.body || {});
    return res.status(200).json(sendContext(req, profile));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const updateEmail = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const profile = await updateCustomerEmail(req.user, req.body || {});
    return res.status(200).json(sendContext(req, profile));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const updateMobile = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const profile = await updateCustomerMobile(req.user, req.body || {});
    return res.status(200).json(sendContext(req, profile));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const updatePassword = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const result = await updateCustomerPassword(req.user, req.body || {});
    return res.status(200).json(sendContext(req, result));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const getActivity = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const activity = await getCustomerActivity();
    return res.status(200).json(sendContext(req, activity));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const getPreferences = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const prefs = await getCustomerPreferences();
    return res.status(200).json(sendContext(req, prefs));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const updatePreferences = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const prefs = await updateCustomerPreferences(req.body || {});
    return res.status(200).json(sendContext(req, prefs));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const listUserAddresses = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const addresses = await listAddresses(req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, addresses));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const getUserAddressById = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const address = await getAddressById(getParamString(req.params.id), req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, address));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const createUserAddress = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const address = await createAddress(req.body || {}, req.websiteContext?.websiteId);
    return res.status(201).json(sendContext(req, address));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const updateUserAddress = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const address = await updateAddress(getParamString(req.params.id), req.body || {}, req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, address));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const deleteUserAddress = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const result = await deleteAddress(getParamString(req.params.id), req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, result));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const makeDefaultAddress = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const address = await setDefaultAddress(getParamString(req.params.id), req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, address));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};
