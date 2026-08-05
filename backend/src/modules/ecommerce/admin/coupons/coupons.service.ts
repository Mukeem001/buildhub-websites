const getStoreKey = (websiteId?: string) => websiteId || "default";

const getDemoStore = (websiteId?: string) => {
  const key = getStoreKey(websiteId);
  const store = (global as any).__ecommerceAdminCouponsStore || {};
  if (!store[key]) {
    store[key] = { coupons: [{ id: "coupon-1", code: "SAVE10", isActive: true }] };
    (global as any).__ecommerceAdminCouponsStore = store;
  }
  return store[key];
};

export const getCoupons = async (websiteId?: string) => getDemoStore(websiteId).coupons;
export const getCouponById = async (couponId: string, websiteId?: string) => getDemoStore(websiteId).coupons.find((item: any) => item.id === couponId) || null;
export const createCoupon = async (payload: any, websiteId?: string) => { const store = getDemoStore(websiteId); const coupon = { id: payload.id || `coupon-${Date.now()}`, code: payload.code || "NEW", isActive: payload.isActive !== false }; store.coupons.push(coupon); return coupon; };
export const updateCoupon = async (couponId: string, payload: any, websiteId?: string) => { const store = getDemoStore(websiteId); const item = store.coupons.find((entry: any) => entry.id === couponId); if (!item) return null; Object.assign(item, payload); return item; };
export const deleteCoupon = async (couponId: string, websiteId?: string) => ({ success: true, couponId, websiteId });
export const setCouponStatus = async (payload: any, websiteId?: string) => { const store = getDemoStore(websiteId); const item = store.coupons.find((entry: any) => entry.id === payload.couponId); if (!item) return null; item.isActive = payload.isActive !== false; return item; };
