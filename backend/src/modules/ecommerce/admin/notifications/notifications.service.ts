const getStoreKey = (websiteId?: string) => websiteId || "default";

const getDemoStore = (websiteId?: string) => {
  const key = getStoreKey(websiteId);
  const store = (global as any).__ecommerceAdminNotificationsStore || {};
  if (!store[key]) {
    store[key] = { notifications: [{ id: "notif-1", message: "Order received", createdAt: new Date().toISOString() }] };
    (global as any).__ecommerceAdminNotificationsStore = store;
  }
  return store[key];
};

export const getNotifications = async (websiteId?: string) => getDemoStore(websiteId).notifications;
export const createNotification = async (payload: any, websiteId?: string) => { const store = getDemoStore(websiteId); const item = { id: payload.id || `notif-${Date.now()}`, ...payload }; store.notifications.push(item); return item; };
export const deleteNotification = async (notificationId: string, websiteId?: string) => ({ success: true, notificationId, websiteId });
