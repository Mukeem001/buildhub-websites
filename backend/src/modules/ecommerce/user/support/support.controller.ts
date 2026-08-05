import { Response } from "express";
import {
  createSupportTicket,
  listSupportTickets,
  getSupportTicket,
  replyToSupportTicket,
  getReferralInfo,
  inviteReferral,
  getReferralHistory,
  getGiftCards,
  redeemGiftCard,
  getLoyaltyInfo,
  getLoyaltyHistory,
  listNotifications,
  markNotificationsRead,
  markAllNotificationsRead,
  deleteNotification,
  clearNotifications,
  listCompare,
  addCompareItem,
  removeCompareItem,
  clearCompare,
  listRecentlyViewed,
  addRecentlyViewed,
  clearRecentlyViewed,
  listReviews,
  createReview,
  updateReview,
  deleteReview,
  markReviewHelpful,
} from "./support.service";
import { EcommerceUserRequest, getParamString, handleControllerError, sendContext } from "../controller.utils";

export const getNotifications = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const notifications = await listNotifications(req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, notifications));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const markNotificationsReadRoute = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const notifications = await markNotificationsRead(req.body?.ids || [], req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, notifications));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const markAllNotificationsReadRoute = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const notifications = await markAllNotificationsRead(req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, notifications));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const deleteNotificationRoute = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const notifications = await deleteNotification(getParamString(req.params.id), req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, notifications));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const clearNotificationsRoute = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const result = await clearNotifications(req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, result));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const getCompare = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const compare = await listCompare(req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, compare));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const addCompare = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const compare = await addCompareItem(req.body?.productId, req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, compare));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const removeCompare = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const compare = await removeCompareItem(req.params.productId as string, req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, compare));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const clearCompareRoute = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const result = await clearCompare(req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, result));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const getRecentlyViewed = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const viewed = await listRecentlyViewed(req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, viewed));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const addRecentlyViewedRoute = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const viewed = await addRecentlyViewed(req.body?.productId, req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, viewed));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const clearRecentlyViewedRoute = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const result = await clearRecentlyViewed(req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, result));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const createSupportTicketRoute = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const ticket = await createSupportTicket(req.body || {}, req.websiteContext?.websiteId);
    return res.status(201).json(sendContext(req, ticket));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const listSupportTicketsRoute = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const tickets = await listSupportTickets(req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, tickets));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const getSupportTicketRoute = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const ticket = await getSupportTicket(getParamString(req.params.id), req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, ticket));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const replySupportTicketRoute = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const reply = await replyToSupportTicket(getParamString(req.params.id), req.body || {}, req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, reply));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const getReferralInfoRoute = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const referral = await getReferralInfo(req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, referral));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const inviteReferralRoute = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const result = await inviteReferral(req.body || {}, req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, result));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const getReferralHistoryRoute = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const result = await getReferralHistory(req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, result));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const getGiftCardsRoute = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const giftCards = await getGiftCards(req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, giftCards));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const redeemGiftCardRoute = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const result = await redeemGiftCard(req.body || {}, req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, result));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const getLoyaltyInfoRoute = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const loyalty = await getLoyaltyInfo(req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, loyalty));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const getLoyaltyHistoryRoute = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const result = await getLoyaltyHistory(req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, result));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const listReviewsRoute = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const reviews = await listReviews(req.query.productId as string, req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, reviews));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const createReviewRoute = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const review = await createReview(req.body || {}, req.websiteContext?.websiteId);
    return res.status(201).json(sendContext(req, review));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const updateReviewRoute = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const review = await updateReview(getParamString(req.params.id), req.body || {}, req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, review));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const deleteReviewRoute = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const result = await deleteReview(getParamString(req.params.id), req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, result));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const markReviewHelpfulRoute = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const result = await markReviewHelpful(getParamString(req.params.id), req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, result));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};
