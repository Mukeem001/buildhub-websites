import { Response } from "express";
import { approveReview, deleteReview, getReviews, rejectReview } from "./reviews.service";
import { EcommerceAdminRequest, handleControllerError, sendContext } from "../controller.utils";

export const listAdminReviewsRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await getReviews(req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};

export const deleteAdminReviewRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await deleteReview(req.body?.id || req.params.id, req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};

export const approveAdminReviewRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await approveReview(req.body || {}, req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};

export const rejectAdminReviewRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try { const data = await rejectReview(req.body || {}, req.websiteContext?.websiteId); return res.status(200).json(sendContext(req, data)); } catch (error: unknown) { return handleControllerError(res, error); }
};
