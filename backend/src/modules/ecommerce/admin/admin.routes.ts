import { NextFunction, Response, Router } from "express";
import authMiddleware, { AuthRequest } from "../../../middleware/auth";
import { requireWebsiteScope } from "../../shared/websiteScope";
import { getAdminProducts, createAdminProduct, getAdminUsers } from "./admin.controller";
import { getDashboardAnalyticsRoute, getDashboardCustomersRoute, getDashboardOrdersRoute, getDashboardOverviewRoute, getDashboardProductsRoute, getDashboardRevenueRoute, getDashboardStatsRoute } from "./dashboard/dashboard.controller";
import { createAdminBrandRoute, createAdminCategoryRoute, createAdminProductRoute, deleteAdminBrandRoute, deleteAdminCategoryRoute, deleteAdminProductRoute, duplicateProductRoute, exportProductsRoute, getAdminBrandByIdRoute, getAdminCategoryByIdRoute, getAdminProductByIdRoute, importProductsRoute, listAdminBrandsRoute, listAdminCategoriesRoute, listAdminProductsRoute, reorderProductImagesRoute, setDefaultProductImageRoute, setProductFeaturedRoute, setProductStatusRoute, setProductStockRoute, setProductTrendingRoute, updateAdminBrandRoute, updateAdminCategoryRoute, updateCategoryStatusRoute, addProductImageRoute, deleteProductImageRoute, updateAdminProductRoute } from "./catalog/catalog.controller";
import { addInventoryRoute, getInventoryHistoryRoute, getInventoryRoute, getLowStockRoute, getOutOfStockRoute, removeInventoryRoute, updateInventoryRoute } from "./inventory/inventory.controller";
import { assignDeliveryRoute, cancelAdminOrderRoute, createAdminOrderRoute, deleteAdminOrderRoute, exportAdminOrdersRoute, getAdminOrderByIdRoute, listAdminOrdersRoute, refundAdminOrderRoute, returnAdminOrderRoute, setAdminOrderPaymentStatusRoute, setAdminOrderShippingStatusRoute, setAdminOrderStatusRoute } from "./orders/orders.controller";
import { blockAdminCustomerRoute, deleteAdminCustomerRoute, getAdminCustomerByIdRoute, getAdminCustomerOrdersRoute, getAdminCustomerWalletRoute, listAdminCustomersRoute, unblockAdminCustomerRoute, updateAdminCustomerRoute } from "./customers/customers.controller";
import { createAdminCouponRoute, deleteAdminCouponRoute, getAdminCouponByIdRoute, listAdminCouponsRoute, setAdminCouponStatusRoute, updateAdminCouponRoute } from "./coupons/coupons.controller";
import { approveAdminReviewRoute, deleteAdminReviewRoute, listAdminReviewsRoute, rejectAdminReviewRoute } from "./reviews/reviews.controller";
import { createAdminShippingRoute, createAdminShippingZoneRoute, deleteAdminShippingRoute, listAdminShippingRoute, listAdminShippingZonesRoute } from "./shipping/shipping.controller";
import { createAdminTaxRoute, deleteAdminTaxRoute, listAdminTaxesRoute, updateAdminTaxRoute } from "./taxes/taxes.controller";
import { exportAdminPaymentsRoute, getAdminPaymentByIdRoute, listAdminPaymentsRoute, refundAdminPaymentRoute } from "./payments/payments.controller";
import { getAdminAnalyticsCustomersRoute, getAdminAnalyticsOrdersRoute, getAdminAnalyticsProductsRoute, getAdminAnalyticsRevenueRoute, getAdminAnalyticsSalesRoute, getAdminAnalyticsTrafficRoute } from "./analytics/analytics.controller";
import { createAdminNotificationRoute, deleteAdminNotificationRoute, listAdminNotificationsRoute } from "./notifications/notifications.controller";
import { getAdminSettingsRoute, updateAdminCurrencyRoute, updateAdminFaviconRoute, updateAdminLanguageRoute, updateAdminLogoRoute, updateAdminSeoRoute, updateAdminSettingsRoute, updateAdminSocialRoute, updateAdminContactRoute, updateAdminTimezoneRoute } from "./settings/settings.controller";
import { createAdminDeliveryRoute, deleteAdminDeliveryRoute, listAdminDeliveryRoute, updateAdminDeliveryRoute } from "./delivery/delivery.controller";
import { getAdminActivityLogsRoute, getAdminErrorsLogsRoute, getAdminLoginLogsRoute, getAdminLogsRoute } from "./logs/logs.controller";

const router = Router();

const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access required",
    });
  }

  return next();
};

router.get("/users", authMiddleware, requireAdmin, requireWebsiteScope, getAdminUsers);
router.get("/:websiteId/:websiteSlug/users", authMiddleware, requireAdmin, requireWebsiteScope, getAdminUsers);

router.get("/:websiteId/:websiteSlug/dashboard", authMiddleware, requireAdmin, requireWebsiteScope, getDashboardOverviewRoute);
router.get("/:websiteId/:websiteSlug/dashboard/stats", authMiddleware, requireAdmin, requireWebsiteScope, getDashboardStatsRoute);
router.get("/:websiteId/:websiteSlug/dashboard/revenue", authMiddleware, requireAdmin, requireWebsiteScope, getDashboardRevenueRoute);
router.get("/:websiteId/:websiteSlug/dashboard/orders", authMiddleware, requireAdmin, requireWebsiteScope, getDashboardOrdersRoute);
router.get("/:websiteId/:websiteSlug/dashboard/customers", authMiddleware, requireAdmin, requireWebsiteScope, getDashboardCustomersRoute);
router.get("/:websiteId/:websiteSlug/dashboard/products", authMiddleware, requireAdmin, requireWebsiteScope, getDashboardProductsRoute);
router.get("/:websiteId/:websiteSlug/dashboard/analytics", authMiddleware, requireAdmin, requireWebsiteScope, getDashboardAnalyticsRoute);

router.get("/:websiteId/:websiteSlug/products", authMiddleware, requireAdmin, requireWebsiteScope, listAdminProductsRoute);
router.get("/:websiteId/:websiteSlug/products/:id", authMiddleware, requireAdmin, requireWebsiteScope, getAdminProductByIdRoute);
router.post("/:websiteId/:websiteSlug/products", authMiddleware, requireAdmin, requireWebsiteScope, createAdminProductRoute);
router.put("/:websiteId/:websiteSlug/products/:id", authMiddleware, requireAdmin, requireWebsiteScope, updateAdminProductRoute);
router.delete("/:websiteId/:websiteSlug/products/:id", authMiddleware, requireAdmin, requireWebsiteScope, deleteAdminProductRoute);
router.patch("/:websiteId/:websiteSlug/products/status", authMiddleware, requireAdmin, requireWebsiteScope, setProductStatusRoute);
router.patch("/:websiteId/:websiteSlug/products/stock", authMiddleware, requireAdmin, requireWebsiteScope, setProductStockRoute);
router.patch("/:websiteId/:websiteSlug/products/featured", authMiddleware, requireAdmin, requireWebsiteScope, setProductFeaturedRoute);
router.patch("/:websiteId/:websiteSlug/products/trending", authMiddleware, requireAdmin, requireWebsiteScope, setProductTrendingRoute);
router.post("/:websiteId/:websiteSlug/products/import", authMiddleware, requireAdmin, requireWebsiteScope, importProductsRoute);
router.get("/:websiteId/:websiteSlug/products/export", authMiddleware, requireAdmin, requireWebsiteScope, exportProductsRoute);
router.post("/:websiteId/:websiteSlug/products/:id/duplicate", authMiddleware, requireAdmin, requireWebsiteScope, duplicateProductRoute);
router.post("/:websiteId/:websiteSlug/products/:id/images", authMiddleware, requireAdmin, requireWebsiteScope, addProductImageRoute);
router.delete("/:websiteId/:websiteSlug/products/:id/images/:imageId", authMiddleware, requireAdmin, requireWebsiteScope, deleteProductImageRoute);
router.put("/:websiteId/:websiteSlug/products/:id/images/order", authMiddleware, requireAdmin, requireWebsiteScope, reorderProductImagesRoute);
router.patch("/:websiteId/:websiteSlug/products/:id/images/default", authMiddleware, requireAdmin, requireWebsiteScope, setDefaultProductImageRoute);

router.get("/:websiteId/:websiteSlug/categories", authMiddleware, requireAdmin, requireWebsiteScope, listAdminCategoriesRoute);
router.get("/:websiteId/:websiteSlug/categories/:id", authMiddleware, requireAdmin, requireWebsiteScope, getAdminCategoryByIdRoute);
router.post("/:websiteId/:websiteSlug/categories", authMiddleware, requireAdmin, requireWebsiteScope, createAdminCategoryRoute);
router.put("/:websiteId/:websiteSlug/categories/:id", authMiddleware, requireAdmin, requireWebsiteScope, updateAdminCategoryRoute);
router.delete("/:websiteId/:websiteSlug/categories/:id", authMiddleware, requireAdmin, requireWebsiteScope, deleteAdminCategoryRoute);
router.patch("/:websiteId/:websiteSlug/categories/status", authMiddleware, requireAdmin, requireWebsiteScope, updateCategoryStatusRoute);

router.get("/:websiteId/:websiteSlug/brands", authMiddleware, requireAdmin, requireWebsiteScope, listAdminBrandsRoute);
router.get("/:websiteId/:websiteSlug/brands/:id", authMiddleware, requireAdmin, requireWebsiteScope, getAdminBrandByIdRoute);
router.post("/:websiteId/:websiteSlug/brands", authMiddleware, requireAdmin, requireWebsiteScope, createAdminBrandRoute);
router.put("/:websiteId/:websiteSlug/brands/:id", authMiddleware, requireAdmin, requireWebsiteScope, updateAdminBrandRoute);
router.delete("/:websiteId/:websiteSlug/brands/:id", authMiddleware, requireAdmin, requireWebsiteScope, deleteAdminBrandRoute);

router.get("/:websiteId/:websiteSlug/inventory", authMiddleware, requireAdmin, requireWebsiteScope, getInventoryRoute);
router.put("/:websiteId/:websiteSlug/inventory/:productId", authMiddleware, requireAdmin, requireWebsiteScope, updateInventoryRoute);
router.patch("/:websiteId/:websiteSlug/inventory/add", authMiddleware, requireAdmin, requireWebsiteScope, addInventoryRoute);
router.patch("/:websiteId/:websiteSlug/inventory/remove", authMiddleware, requireAdmin, requireWebsiteScope, removeInventoryRoute);
router.get("/:websiteId/:websiteSlug/inventory/low-stock", authMiddleware, requireAdmin, requireWebsiteScope, getLowStockRoute);
router.get("/:websiteId/:websiteSlug/inventory/out-of-stock", authMiddleware, requireAdmin, requireWebsiteScope, getOutOfStockRoute);
router.get("/:websiteId/:websiteSlug/inventory/history", authMiddleware, requireAdmin, requireWebsiteScope, getInventoryHistoryRoute);

router.get("/:websiteId/:websiteSlug/orders", authMiddleware, requireAdmin, requireWebsiteScope, listAdminOrdersRoute);
router.get("/:websiteId/:websiteSlug/orders/:id", authMiddleware, requireAdmin, requireWebsiteScope, getAdminOrderByIdRoute);
router.patch("/:websiteId/:websiteSlug/orders/status", authMiddleware, requireAdmin, requireWebsiteScope, setAdminOrderStatusRoute);
router.patch("/:websiteId/:websiteSlug/orders/payment-status", authMiddleware, requireAdmin, requireWebsiteScope, setAdminOrderPaymentStatusRoute);
router.patch("/:websiteId/:websiteSlug/orders/shipping-status", authMiddleware, requireAdmin, requireWebsiteScope, setAdminOrderShippingStatusRoute);
router.patch("/:websiteId/:websiteSlug/orders/assign-delivery", authMiddleware, requireAdmin, requireWebsiteScope, assignDeliveryRoute);
router.post("/:websiteId/:websiteSlug/orders/create", authMiddleware, requireAdmin, requireWebsiteScope, createAdminOrderRoute);
router.delete("/:websiteId/:websiteSlug/orders/:id", authMiddleware, requireAdmin, requireWebsiteScope, deleteAdminOrderRoute);
router.post("/:websiteId/:websiteSlug/orders/:id/refund", authMiddleware, requireAdmin, requireWebsiteScope, refundAdminOrderRoute);
router.post("/:websiteId/:websiteSlug/orders/:id/cancel", authMiddleware, requireAdmin, requireWebsiteScope, cancelAdminOrderRoute);
router.post("/:websiteId/:websiteSlug/orders/:id/return", authMiddleware, requireAdmin, requireWebsiteScope, returnAdminOrderRoute);
router.get("/:websiteId/:websiteSlug/orders/export", authMiddleware, requireAdmin, requireWebsiteScope, exportAdminOrdersRoute);

router.get("/:websiteId/:websiteSlug/customers", authMiddleware, requireAdmin, requireWebsiteScope, listAdminCustomersRoute);
router.get("/:websiteId/:websiteSlug/customers/:id", authMiddleware, requireAdmin, requireWebsiteScope, getAdminCustomerByIdRoute);
router.put("/:websiteId/:websiteSlug/customers/:id", authMiddleware, requireAdmin, requireWebsiteScope, updateAdminCustomerRoute);
router.delete("/:websiteId/:websiteSlug/customers/:id", authMiddleware, requireAdmin, requireWebsiteScope, deleteAdminCustomerRoute);
router.patch("/:websiteId/:websiteSlug/customers/block", authMiddleware, requireAdmin, requireWebsiteScope, blockAdminCustomerRoute);
router.patch("/:websiteId/:websiteSlug/customers/unblock", authMiddleware, requireAdmin, requireWebsiteScope, unblockAdminCustomerRoute);
router.get("/:websiteId/:websiteSlug/customers/orders", authMiddleware, requireAdmin, requireWebsiteScope, getAdminCustomerOrdersRoute);
router.get("/:websiteId/:websiteSlug/customers/wallet", authMiddleware, requireAdmin, requireWebsiteScope, getAdminCustomerWalletRoute);

router.get("/:websiteId/:websiteSlug/coupons", authMiddleware, requireAdmin, requireWebsiteScope, listAdminCouponsRoute);
router.get("/:websiteId/:websiteSlug/coupons/:id", authMiddleware, requireAdmin, requireWebsiteScope, getAdminCouponByIdRoute);
router.post("/:websiteId/:websiteSlug/coupons", authMiddleware, requireAdmin, requireWebsiteScope, createAdminCouponRoute);
router.put("/:websiteId/:websiteSlug/coupons/:id", authMiddleware, requireAdmin, requireWebsiteScope, updateAdminCouponRoute);
router.delete("/:websiteId/:websiteSlug/coupons/:id", authMiddleware, requireAdmin, requireWebsiteScope, deleteAdminCouponRoute);
router.patch("/:websiteId/:websiteSlug/coupons/status", authMiddleware, requireAdmin, requireWebsiteScope, setAdminCouponStatusRoute);

router.get("/:websiteId/:websiteSlug/reviews", authMiddleware, requireAdmin, requireWebsiteScope, listAdminReviewsRoute);
router.delete("/:websiteId/:websiteSlug/reviews/:id", authMiddleware, requireAdmin, requireWebsiteScope, deleteAdminReviewRoute);
router.patch("/:websiteId/:websiteSlug/reviews/approve", authMiddleware, requireAdmin, requireWebsiteScope, approveAdminReviewRoute);
router.patch("/:websiteId/:websiteSlug/reviews/reject", authMiddleware, requireAdmin, requireWebsiteScope, rejectAdminReviewRoute);

router.get("/:websiteId/:websiteSlug/shipping", authMiddleware, requireAdmin, requireWebsiteScope, listAdminShippingRoute);
router.post("/:websiteId/:websiteSlug/shipping", authMiddleware, requireAdmin, requireWebsiteScope, createAdminShippingRoute);
router.delete("/:websiteId/:websiteSlug/shipping/:id", authMiddleware, requireAdmin, requireWebsiteScope, deleteAdminShippingRoute);
router.get("/:websiteId/:websiteSlug/shipping/zones", authMiddleware, requireAdmin, requireWebsiteScope, listAdminShippingZonesRoute);
router.post("/:websiteId/:websiteSlug/shipping/zones", authMiddleware, requireAdmin, requireWebsiteScope, createAdminShippingZoneRoute);

router.get("/:websiteId/:websiteSlug/taxes", authMiddleware, requireAdmin, requireWebsiteScope, listAdminTaxesRoute);
router.post("/:websiteId/:websiteSlug/taxes", authMiddleware, requireAdmin, requireWebsiteScope, createAdminTaxRoute);
router.put("/:websiteId/:websiteSlug/taxes/:id", authMiddleware, requireAdmin, requireWebsiteScope, updateAdminTaxRoute);
router.delete("/:websiteId/:websiteSlug/taxes/:id", authMiddleware, requireAdmin, requireWebsiteScope, deleteAdminTaxRoute);

router.get("/:websiteId/:websiteSlug/payments", authMiddleware, requireAdmin, requireWebsiteScope, listAdminPaymentsRoute);
router.get("/:websiteId/:websiteSlug/payments/:id", authMiddleware, requireAdmin, requireWebsiteScope, getAdminPaymentByIdRoute);
router.post("/:websiteId/:websiteSlug/payments/refund", authMiddleware, requireAdmin, requireWebsiteScope, refundAdminPaymentRoute);
router.get("/:websiteId/:websiteSlug/payments/export", authMiddleware, requireAdmin, requireWebsiteScope, exportAdminPaymentsRoute);

router.get("/:websiteId/:websiteSlug/analytics/sales", authMiddleware, requireAdmin, requireWebsiteScope, getAdminAnalyticsSalesRoute);
router.get("/:websiteId/:websiteSlug/analytics/orders", authMiddleware, requireAdmin, requireWebsiteScope, getAdminAnalyticsOrdersRoute);
router.get("/:websiteId/:websiteSlug/analytics/customers", authMiddleware, requireAdmin, requireWebsiteScope, getAdminAnalyticsCustomersRoute);
router.get("/:websiteId/:websiteSlug/analytics/products", authMiddleware, requireAdmin, requireWebsiteScope, getAdminAnalyticsProductsRoute);
router.get("/:websiteId/:websiteSlug/analytics/revenue", authMiddleware, requireAdmin, requireWebsiteScope, getAdminAnalyticsRevenueRoute);
router.get("/:websiteId/:websiteSlug/analytics/traffic", authMiddleware, requireAdmin, requireWebsiteScope, getAdminAnalyticsTrafficRoute);

router.get("/:websiteId/:websiteSlug/notifications", authMiddleware, requireAdmin, requireWebsiteScope, listAdminNotificationsRoute);
router.post("/:websiteId/:websiteSlug/notifications", authMiddleware, requireAdmin, requireWebsiteScope, createAdminNotificationRoute);
router.delete("/:websiteId/:websiteSlug/notifications/:id", authMiddleware, requireAdmin, requireWebsiteScope, deleteAdminNotificationRoute);

router.get("/:websiteId/:websiteSlug/settings", authMiddleware, requireAdmin, requireWebsiteScope, getAdminSettingsRoute);
router.put("/:websiteId/:websiteSlug/settings", authMiddleware, requireAdmin, requireWebsiteScope, updateAdminSettingsRoute);
router.put("/:websiteId/:websiteSlug/settings/logo", authMiddleware, requireAdmin, requireWebsiteScope, updateAdminLogoRoute);
router.put("/:websiteId/:websiteSlug/settings/favicon", authMiddleware, requireAdmin, requireWebsiteScope, updateAdminFaviconRoute);
router.put("/:websiteId/:websiteSlug/settings/seo", authMiddleware, requireAdmin, requireWebsiteScope, updateAdminSeoRoute);
router.put("/:websiteId/:websiteSlug/settings/contact", authMiddleware, requireAdmin, requireWebsiteScope, updateAdminContactRoute);
router.put("/:websiteId/:websiteSlug/settings/social", authMiddleware, requireAdmin, requireWebsiteScope, updateAdminSocialRoute);
router.put("/:websiteId/:websiteSlug/settings/currency", authMiddleware, requireAdmin, requireWebsiteScope, updateAdminCurrencyRoute);
router.put("/:websiteId/:websiteSlug/settings/language", authMiddleware, requireAdmin, requireWebsiteScope, updateAdminLanguageRoute);
router.put("/:websiteId/:websiteSlug/settings/timezone", authMiddleware, requireAdmin, requireWebsiteScope, updateAdminTimezoneRoute);

router.get("/:websiteId/:websiteSlug/delivery", authMiddleware, requireAdmin, requireWebsiteScope, listAdminDeliveryRoute);
router.post("/:websiteId/:websiteSlug/delivery", authMiddleware, requireAdmin, requireWebsiteScope, createAdminDeliveryRoute);
router.put("/:websiteId/:websiteSlug/delivery/:id", authMiddleware, requireAdmin, requireWebsiteScope, updateAdminDeliveryRoute);
router.delete("/:websiteId/:websiteSlug/delivery/:id", authMiddleware, requireAdmin, requireWebsiteScope, deleteAdminDeliveryRoute);

router.get("/:websiteId/:websiteSlug/logs", authMiddleware, requireAdmin, requireWebsiteScope, getAdminLogsRoute);
router.get("/:websiteId/:websiteSlug/logs/login", authMiddleware, requireAdmin, requireWebsiteScope, getAdminLoginLogsRoute);
router.get("/:websiteId/:websiteSlug/logs/activity", authMiddleware, requireAdmin, requireWebsiteScope, getAdminActivityLogsRoute);
router.get("/:websiteId/:websiteSlug/logs/errors", authMiddleware, requireAdmin, requireWebsiteScope, getAdminErrorsLogsRoute);

export default router;
