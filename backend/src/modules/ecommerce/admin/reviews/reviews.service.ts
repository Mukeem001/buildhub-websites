const getStoreKey = (websiteId?: string) => websiteId || "default";

const getDemoStore = (websiteId?: string) => {
  const key = getStoreKey(websiteId);
  const store = (global as any).__ecommerceAdminReviewsStore || {};
  if (!store[key]) {
    store[key] = { reviews: [{ id: "review-1", productId: "prod-1", status: "pending" }] };
    (global as any).__ecommerceAdminReviewsStore = store;
  }
  return store[key];
};

export const getReviews = async (websiteId?: string) => getDemoStore(websiteId).reviews;
export const deleteReview = async (reviewId: string, websiteId?: string) => ({ success: true, reviewId, websiteId });
export const approveReview = async (payload: any, websiteId?: string) => { const store = getDemoStore(websiteId); const review = store.reviews.find((entry: any) => entry.id === payload.reviewId); if (!review) return null; review.status = "approved"; return review; };
export const rejectReview = async (payload: any, websiteId?: string) => { const store = getDemoStore(websiteId); const review = store.reviews.find((entry: any) => entry.id === payload.reviewId); if (!review) return null; review.status = "rejected"; return review; };
