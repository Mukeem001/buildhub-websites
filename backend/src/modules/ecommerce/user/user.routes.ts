import { Router } from "express";
import authMiddleware from "../../../middleware/auth";
import { requireWebsiteScope } from "../../shared/websiteScope";
import {
  getProfile,
  updateProfile,
  updateAvatar,
  updateEmail,
  updateMobile,
  updatePassword,
  getActivity,
  getPreferences,
  updatePreferences,
  listUserAddresses,
  getUserAddressById,
  createUserAddress,
  updateUserAddress,
  deleteUserAddress,
  makeDefaultAddress,
} from "./profile/profile.controller";
import {
  getHome,
  getHomeBanner,
  getHomeCategories,
  getHomeFeaturedProducts,
  getHomeLatestProducts,
  getHomeBestSelling,
  getHomeTrending,
  getHomeOffers,
  getProducts,
  getProductBySlugRoute,
  searchProductsRoute,
  filterProductsRoute,
  getRecommendedProductsRoute,
  getRelatedProductsRoute,
  getLatestProductsRoute,
  getFeaturedProductsRoute,
  getTrendingProductsRoute,
  getDealsProductsRoute,
  getNewArrivalsProductsRoute,
  getBrandsRoute,
  getBrandBySlugRoute,
  getBrandProductsRoute,
} from "./catalog/catalog.controller";
import {
  getWishlist,
  addWishlist,
  deleteWishlistItem,
  clearUserWishlist,
  getCartRoute,
  addCart,
  updateCart,
  deleteCart,
  clearUserCart,
  increaseCart,
  decreaseCart,
  applyCouponRoute,
  removeCouponRoute,
  getAvailableCouponsRoute,
} from "./cart/cart.controller";
import {
  createCheckoutRoute,
  setCheckoutShipping,
  setCheckoutPayment,
  confirmCheckoutRoute,
  getCheckoutSummaryRoute,
  createOrderRoute,
  listOrdersRoute,
  getOrderRoute,
  getOrderInvoiceRoute,
  cancelOrderRoute,
  returnOrderRoute,
  refundOrderRoute,
  reorderOrderRoute,
  trackOrderRoute,
  createPaymentOrderRoute,
  verifyPaymentRoute,
  getPaymentHistoryRoute,
  getPaymentRoute,
  paymentWebhookRoute,
} from "./checkout/checkout.controller";
import {
  getNotifications as getUserNotifications,
  markNotificationsReadRoute,
  markAllNotificationsReadRoute,
  deleteNotificationRoute as deleteUserNotification,
  clearNotificationsRoute as clearUserNotifications,
  getCompare,
  addCompare,
  removeCompare as deleteCompareItem,
  clearCompareRoute as clearUserCompare,
  getRecentlyViewed,
  addRecentlyViewedRoute,
  clearRecentlyViewedRoute as clearUserRecentlyViewed,
  createSupportTicketRoute,
  listSupportTicketsRoute,
  getSupportTicketRoute,
  replySupportTicketRoute,
  getReferralInfoRoute as getReferralRoute,
  inviteReferralRoute,
  getReferralHistoryRoute,
  getGiftCardsRoute,
  redeemGiftCardRoute,
  getLoyaltyInfoRoute as getLoyaltyRoute,
  getLoyaltyHistoryRoute,
  listReviewsRoute as listProductReviews,
  createReviewRoute as createProductReview,
  updateReviewRoute as updateProductReview,
  deleteReviewRoute as deleteProductReview,
  markReviewHelpfulRoute as helpfulReview,
} from "./support/support.controller";

const router = Router();

router.get("/:websiteId/:websiteSlug/profile", authMiddleware, requireWebsiteScope, getProfile);
router.put("/:websiteId/:websiteSlug/profile", authMiddleware, requireWebsiteScope, updateProfile);
router.put("/:websiteId/:websiteSlug/avatar", authMiddleware, requireWebsiteScope, updateAvatar);
router.put("/:websiteId/:websiteSlug/email", authMiddleware, requireWebsiteScope, updateEmail);
router.put("/:websiteId/:websiteSlug/mobile", authMiddleware, requireWebsiteScope, updateMobile);
router.put("/:websiteId/:websiteSlug/password", authMiddleware, requireWebsiteScope, updatePassword);
router.get("/:websiteId/:websiteSlug/activity", authMiddleware, requireWebsiteScope, getActivity);
router.get("/:websiteId/:websiteSlug/preferences", authMiddleware, requireWebsiteScope, getPreferences);
router.put("/:websiteId/:websiteSlug/preferences", authMiddleware, requireWebsiteScope, updatePreferences);

router.get("/:websiteId/:websiteSlug/address", authMiddleware, requireWebsiteScope, listUserAddresses);
router.get("/:websiteId/:websiteSlug/address/:id", authMiddleware, requireWebsiteScope, getUserAddressById);
router.post("/:websiteId/:websiteSlug/address", authMiddleware, requireWebsiteScope, createUserAddress);
router.put("/:websiteId/:websiteSlug/address/:id", authMiddleware, requireWebsiteScope, updateUserAddress);
router.delete("/:websiteId/:websiteSlug/address/:id", authMiddleware, requireWebsiteScope, deleteUserAddress);
router.patch("/:websiteId/:websiteSlug/address/default", authMiddleware, requireWebsiteScope, makeDefaultAddress);

router.get("/:websiteId/:websiteSlug/home", requireWebsiteScope, getHome);
router.get("/:websiteId/:websiteSlug/home/banner", requireWebsiteScope, getHomeBanner);
router.get("/:websiteId/:websiteSlug/home/categories", requireWebsiteScope, getHomeCategories);
router.get("/:websiteId/:websiteSlug/home/featured-products", requireWebsiteScope, getHomeFeaturedProducts);
router.get("/:websiteId/:websiteSlug/home/latest-products", requireWebsiteScope, getHomeLatestProducts);
router.get("/:websiteId/:websiteSlug/home/best-selling", requireWebsiteScope, getHomeBestSelling);
router.get("/:websiteId/:websiteSlug/home/trending", requireWebsiteScope, getHomeTrending);
router.get("/:websiteId/:websiteSlug/home/offers", requireWebsiteScope, getHomeOffers);

router.get("/:websiteId/:websiteSlug/products", requireWebsiteScope, getProducts);
router.get("/:websiteId/:websiteSlug/products/search", requireWebsiteScope, searchProductsRoute);
router.get("/:websiteId/:websiteSlug/products/filter", requireWebsiteScope, filterProductsRoute);
router.get("/:websiteId/:websiteSlug/products/recommended", requireWebsiteScope, getRecommendedProductsRoute);
router.get("/:websiteId/:websiteSlug/products/related/:slug", requireWebsiteScope, getRelatedProductsRoute);
router.get("/:websiteId/:websiteSlug/products/latest", requireWebsiteScope, getLatestProductsRoute);
router.get("/:websiteId/:websiteSlug/products/featured", requireWebsiteScope, getFeaturedProductsRoute);
router.get("/:websiteId/:websiteSlug/products/trending", requireWebsiteScope, getTrendingProductsRoute);
router.get("/:websiteId/:websiteSlug/products/deals", requireWebsiteScope, getDealsProductsRoute);
router.get("/:websiteId/:websiteSlug/products/new-arrivals", requireWebsiteScope, getNewArrivalsProductsRoute);
router.get("/:websiteId/:websiteSlug/products/:slug", requireWebsiteScope, getProductBySlugRoute);

router.get("/:websiteId/:websiteSlug/brands", requireWebsiteScope, getBrandsRoute);
router.get("/:websiteId/:websiteSlug/brands/:slug", requireWebsiteScope, getBrandBySlugRoute);
router.get("/:websiteId/:websiteSlug/brands/:slug/products", requireWebsiteScope, getBrandProductsRoute);

router.get("/:websiteId/:websiteSlug/wishlist", authMiddleware, requireWebsiteScope, getWishlist);
router.post("/:websiteId/:websiteSlug/wishlist", authMiddleware, requireWebsiteScope, addWishlist);
router.delete("/:websiteId/:websiteSlug/wishlist/:productId", authMiddleware, requireWebsiteScope, deleteWishlistItem);
router.delete("/:websiteId/:websiteSlug/wishlist", authMiddleware, requireWebsiteScope, clearUserWishlist);

router.get("/:websiteId/:websiteSlug/cart", authMiddleware, requireWebsiteScope, getCartRoute);
router.post("/:websiteId/:websiteSlug/cart", authMiddleware, requireWebsiteScope, addCart);
router.put("/:websiteId/:websiteSlug/cart/:itemId", authMiddleware, requireWebsiteScope, updateCart);
router.delete("/:websiteId/:websiteSlug/cart/:itemId", authMiddleware, requireWebsiteScope, deleteCart);
router.delete("/:websiteId/:websiteSlug/cart", authMiddleware, requireWebsiteScope, clearUserCart);
router.patch("/:websiteId/:websiteSlug/cart/increase/:itemId", authMiddleware, requireWebsiteScope, increaseCart);
router.patch("/:websiteId/:websiteSlug/cart/decrease/:itemId", authMiddleware, requireWebsiteScope, decreaseCart);

router.post("/:websiteId/:websiteSlug/coupon/apply", authMiddleware, requireWebsiteScope, applyCouponRoute);
router.delete("/:websiteId/:websiteSlug/coupon/remove", authMiddleware, requireWebsiteScope, removeCouponRoute);
router.get("/:websiteId/:websiteSlug/coupon/available", authMiddleware, requireWebsiteScope, getAvailableCouponsRoute);

router.post("/:websiteId/:websiteSlug/checkout", authMiddleware, requireWebsiteScope, createCheckoutRoute);
router.post("/:websiteId/:websiteSlug/checkout/shipping", authMiddleware, requireWebsiteScope, setCheckoutShipping);
router.post("/:websiteId/:websiteSlug/checkout/payment", authMiddleware, requireWebsiteScope, setCheckoutPayment);
router.post("/:websiteId/:websiteSlug/checkout/confirm", authMiddleware, requireWebsiteScope, confirmCheckoutRoute);
router.get("/:websiteId/:websiteSlug/checkout/summary", authMiddleware, requireWebsiteScope, getCheckoutSummaryRoute);

router.post("/:websiteId/:websiteSlug/orders", authMiddleware, requireWebsiteScope, createOrderRoute);
router.get("/:websiteId/:websiteSlug/orders", authMiddleware, requireWebsiteScope, listOrdersRoute);
router.get("/:websiteId/:websiteSlug/orders/:id", authMiddleware, requireWebsiteScope, getOrderRoute);
router.get("/:websiteId/:websiteSlug/orders/:id/invoice", authMiddleware, requireWebsiteScope, getOrderInvoiceRoute);
router.post("/:websiteId/:websiteSlug/orders/:id/cancel", authMiddleware, requireWebsiteScope, cancelOrderRoute);
router.post("/:websiteId/:websiteSlug/orders/:id/return", authMiddleware, requireWebsiteScope, returnOrderRoute);
router.post("/:websiteId/:websiteSlug/orders/:id/refund", authMiddleware, requireWebsiteScope, refundOrderRoute);
router.post("/:websiteId/:websiteSlug/orders/:id/reorder", authMiddleware, requireWebsiteScope, reorderOrderRoute);
router.get("/:websiteId/:websiteSlug/orders/:id/track", authMiddleware, requireWebsiteScope, trackOrderRoute);

router.post("/:websiteId/:websiteSlug/payment/create-order", authMiddleware, requireWebsiteScope, createPaymentOrderRoute);
router.post("/:websiteId/:websiteSlug/payment/verify", authMiddleware, requireWebsiteScope, verifyPaymentRoute);
router.get("/:websiteId/:websiteSlug/payment/history", authMiddleware, requireWebsiteScope, getPaymentHistoryRoute);
router.get("/:websiteId/:websiteSlug/payment/:id", authMiddleware, requireWebsiteScope, getPaymentRoute);
router.post("/:websiteId/:websiteSlug/payment/webhook", authMiddleware, requireWebsiteScope, paymentWebhookRoute);

router.get("/:websiteId/:websiteSlug/reviews/:productId", requireWebsiteScope, listProductReviews);
router.post("/:websiteId/:websiteSlug/reviews", authMiddleware, requireWebsiteScope, createProductReview);
router.put("/:websiteId/:websiteSlug/reviews/:id", authMiddleware, requireWebsiteScope, updateProductReview);
router.delete("/:websiteId/:websiteSlug/reviews/:id", authMiddleware, requireWebsiteScope, deleteProductReview);
router.post("/:websiteId/:websiteSlug/reviews/:id/helpful", authMiddleware, requireWebsiteScope, helpfulReview);

router.get("/:websiteId/:websiteSlug/notifications", authMiddleware, requireWebsiteScope, getUserNotifications);
router.put("/:websiteId/:websiteSlug/notifications/read", authMiddleware, requireWebsiteScope, markNotificationsReadRoute);
router.put("/:websiteId/:websiteSlug/notifications/read-all", authMiddleware, requireWebsiteScope, markAllNotificationsReadRoute);
router.delete("/:websiteId/:websiteSlug/notifications/:id", authMiddleware, requireWebsiteScope, deleteUserNotification);
router.delete("/:websiteId/:websiteSlug/notifications", authMiddleware, requireWebsiteScope, clearUserNotifications);

router.get("/:websiteId/:websiteSlug/compare", authMiddleware, requireWebsiteScope, getCompare);
router.post("/:websiteId/:websiteSlug/compare", authMiddleware, requireWebsiteScope, addCompare);
router.delete("/:websiteId/:websiteSlug/compare/:productId", authMiddleware, requireWebsiteScope, deleteCompareItem);
router.delete("/:websiteId/:websiteSlug/compare", authMiddleware, requireWebsiteScope, clearUserCompare);

router.get("/:websiteId/:websiteSlug/recently-viewed", authMiddleware, requireWebsiteScope, getRecentlyViewed);
router.post("/:websiteId/:websiteSlug/recently-viewed", authMiddleware, requireWebsiteScope, addRecentlyViewedRoute);
router.delete("/:websiteId/:websiteSlug/recently-viewed", authMiddleware, requireWebsiteScope, clearUserRecentlyViewed);

router.post("/:websiteId/:websiteSlug/support/ticket", authMiddleware, requireWebsiteScope, createSupportTicketRoute);
router.get("/:websiteId/:websiteSlug/support/tickets", authMiddleware, requireWebsiteScope, listSupportTicketsRoute);
router.get("/:websiteId/:websiteSlug/support/ticket/:id", authMiddleware, requireWebsiteScope, getSupportTicketRoute);
router.post("/:websiteId/:websiteSlug/support/ticket/:id/reply", authMiddleware, requireWebsiteScope, replySupportTicketRoute);

router.get("/:websiteId/:websiteSlug/referral", authMiddleware, requireWebsiteScope, getReferralRoute);
router.post("/:websiteId/:websiteSlug/referral/invite", authMiddleware, requireWebsiteScope, inviteReferralRoute);
router.get("/:websiteId/:websiteSlug/referral/history", authMiddleware, requireWebsiteScope, getReferralHistoryRoute);

router.get("/:websiteId/:websiteSlug/gift-cards", authMiddleware, requireWebsiteScope, getGiftCardsRoute);
router.post("/:websiteId/:websiteSlug/gift-cards/redeem", authMiddleware, requireWebsiteScope, redeemGiftCardRoute);

router.get("/:websiteId/:websiteSlug/loyalty", authMiddleware, requireWebsiteScope, getLoyaltyRoute);
router.get("/:websiteId/:websiteSlug/loyalty/history", authMiddleware, requireWebsiteScope, getLoyaltyHistoryRoute);

export default router;
