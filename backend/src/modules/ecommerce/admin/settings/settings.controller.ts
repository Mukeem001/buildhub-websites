import { Response } from "express";
import { getSettings, updateSettings, updateLogo, updateFavicon, updateSeo, updateContact, updateSocial, updateCurrency, updateLanguage, updateTimezone } from "./settings.service";
import { EcommerceAdminRequest, handleControllerError, sendContext } from "../controller.utils";

export const getAdminSettingsRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await getSettings(req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};

export const updateAdminSettingsRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await updateSettings(req.body || {}, req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};

export const updateAdminLogoRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await updateLogo(req.body || {}, req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};

export const updateAdminFaviconRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await updateFavicon(req.body || {}, req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};

export const updateAdminSeoRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await updateSeo(req.body || {}, req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};

export const updateAdminContactRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await updateContact(req.body || {}, req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};

export const updateAdminSocialRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await updateSocial(req.body || {}, req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};

export const updateAdminCurrencyRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await updateCurrency(req.body || {}, req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};

export const updateAdminLanguageRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await updateLanguage(req.body || {}, req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};

export const updateAdminTimezoneRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await updateTimezone(req.body || {}, req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};
