const getStoreKey = (websiteId?: string) => websiteId || "default";

const getDemoStore = (websiteId?: string) => {
  const key = getStoreKey(websiteId);
  const store = (global as any).__ecommerceUserStore || {};
  if (!store[key]) {
    store[key] = {
      reviews: [],
      notifications: [
        { id: "notif-1", title: "Order confirmed", message: "Your order has been confirmed", read: false, createdAt: new Date().toISOString() },
      ],
      compare: [],
      recentlyViewed: [],
      supportTickets: [],
      referrals: { invited: 0, reward: 100 },
      giftCards: [{ code: "GIFT100", balance: 100, valid: true }],
      loyalty: { points: 250, tier: "Gold" },
    };
    (global as any).__ecommerceUserStore = store;
  }
  return store[key];
};

export const listReviews = async (productId: string, websiteId?: string) => {
  const store = getDemoStore(websiteId);
  return store.reviews.filter((review: any) => review.productId === productId);
};

export const createReview = async (payload: any, websiteId?: string) => {
  const store = getDemoStore(websiteId);
  const review = { id: `review-${Date.now()}`, createdAt: new Date().toISOString(), ...payload };
  store.reviews.push(review);
  return review;
};

export const updateReview = async (reviewId: string, payload: any, websiteId?: string) => {
  const store = getDemoStore(websiteId);
  const index = store.reviews.findIndex((review: any) => review.id === reviewId);
  if (index === -1) return null;
  store.reviews[index] = { ...store.reviews[index], ...payload };
  return store.reviews[index];
};

export const deleteReview = async (reviewId: string, websiteId?: string) => {
  const store = getDemoStore(websiteId);
  store.reviews = store.reviews.filter((review: any) => review.id !== reviewId);
  return { success: true };
};

export const markReviewHelpful = async (reviewId: string, websiteId?: string) => ({ success: true, reviewId, websiteId });

export const listNotifications = async (websiteId?: string) => {
  const store = getDemoStore(websiteId);
  return store.notifications;
};

export const markNotificationsRead = async (notificationIds: string[], websiteId?: string) => {
  const store = getDemoStore(websiteId);
  store.notifications = store.notifications.map((notification: any) => (notificationIds.includes(notification.id) ? { ...notification, read: true } : notification));
  return store.notifications;
};

export const markAllNotificationsRead = async (websiteId?: string) => {
  const store = getDemoStore(websiteId);
  store.notifications = store.notifications.map((notification: any) => ({ ...notification, read: true }));
  return store.notifications;
};

export const deleteNotification = async (notificationId: string, websiteId?: string) => {
  const store = getDemoStore(websiteId);
  store.notifications = store.notifications.filter((notification: any) => notification.id !== notificationId);
  return store.notifications;
};

export const clearNotifications = async (websiteId?: string) => {
  const store = getDemoStore(websiteId);
  store.notifications = [];
  return { success: true };
};

export const listCompare = async (websiteId?: string) => {
  const store = getDemoStore(websiteId);
  return store.compare;
};

export const addCompareItem = async (productId: string, websiteId?: string) => {
  const store = getDemoStore(websiteId);
  if (!store.compare.includes(productId)) store.compare.push(productId);
  return store.compare;
};

export const removeCompareItem = async (productId: string, websiteId?: string) => {
  const store = getDemoStore(websiteId);
  store.compare = store.compare.filter((item: string) => item !== productId);
  return store.compare;
};

export const clearCompare = async (websiteId?: string) => {
  const store = getDemoStore(websiteId);
  store.compare = [];
  return { success: true };
};

export const listRecentlyViewed = async (websiteId?: string) => {
  const store = getDemoStore(websiteId);
  return store.recentlyViewed;
};

export const addRecentlyViewed = async (productId: string, websiteId?: string) => {
  const store = getDemoStore(websiteId);
  if (!store.recentlyViewed.includes(productId)) store.recentlyViewed.push(productId);
  return store.recentlyViewed;
};

export const clearRecentlyViewed = async (websiteId?: string) => {
  const store = getDemoStore(websiteId);
  store.recentlyViewed = [];
  return { success: true };
};

export const createSupportTicket = async (payload: any, websiteId?: string) => {
  const store = getDemoStore(websiteId);
  const ticket = { id: `ticket-${Date.now()}`, status: "open", createdAt: new Date().toISOString(), ...payload };
  store.supportTickets.push(ticket);
  return ticket;
};

export const listSupportTickets = async (websiteId?: string) => {
  const store = getDemoStore(websiteId);
  return store.supportTickets;
};

export const getSupportTicket = async (ticketId: string, websiteId?: string) => {
  const store = getDemoStore(websiteId);
  return store.supportTickets.find((ticket: any) => ticket.id === ticketId) || null;
};

export const replyToSupportTicket = async (ticketId: string, payload: any, websiteId?: string) => ({ success: true, ticketId, reply: payload?.message || "Thanks for contacting support", websiteId });

export const getReferralInfo = async (websiteId?: string) => {
  const store = getDemoStore(websiteId);
  return store.referrals;
};

export const inviteReferral = async (payload: any, websiteId?: string) => ({ success: true, invite: payload, websiteId });
export const getReferralHistory = async (websiteId?: string) => ({ success: true, history: [], websiteId });

export const getGiftCards = async (websiteId?: string) => {
  const store = getDemoStore(websiteId);
  return store.giftCards;
};

export const redeemGiftCard = async (payload: any, websiteId?: string) => ({ success: true, giftCard: payload, websiteId });

export const getLoyaltyInfo = async (websiteId?: string) => {
  const store = getDemoStore(websiteId);
  return store.loyalty;
};

export const getLoyaltyHistory = async (websiteId?: string) => ({ success: true, history: [], websiteId });
