const getStoreKey = (websiteId?: string) => websiteId || "default";

const getDemoStore = (websiteId?: string) => {
  const key = getStoreKey(websiteId);
  const store = (global as any).__ecommerceAdminOrdersStore || {};
  if (!store[key]) {
    store[key] = {
      orders: [{ id: "ord-1", customer: "Aisha", total: 129.99, status: "pending", paymentStatus: "paid", shippingStatus: "pending" }],
    };
    (global as any).__ecommerceAdminOrdersStore = store;
  }
  return store[key];
};

export const getOrders = async (websiteId?: string) => getDemoStore(websiteId).orders;
export const getOrderById = async (orderId: string, websiteId?: string) => getDemoStore(websiteId).orders.find((item: any) => item.id === orderId) || null;
export const setOrderStatus = async (payload: any, websiteId?: string) => { const store = getDemoStore(websiteId); const item = store.orders.find((entry: any) => entry.id === payload.orderId); if (!item) return null; item.status = payload.status || item.status; return item; };
export const setOrderPaymentStatus = async (payload: any, websiteId?: string) => { const store = getDemoStore(websiteId); const item = store.orders.find((entry: any) => entry.id === payload.orderId); if (!item) return null; item.paymentStatus = payload.paymentStatus || item.paymentStatus; return item; };
export const setOrderShippingStatus = async (payload: any, websiteId?: string) => { const store = getDemoStore(websiteId); const item = store.orders.find((entry: any) => entry.id === payload.orderId); if (!item) return null; item.shippingStatus = payload.shippingStatus || item.shippingStatus; return item; };
export const assignDeliveryPartner = async (payload: any, websiteId?: string) => ({ success: true, assigned: payload, websiteId });
export const createOrder = async (payload: any, websiteId?: string) => ({ success: true, order: payload, websiteId });
export const deleteOrder = async (orderId: string, websiteId?: string) => ({ success: true, orderId, websiteId });
export const refundOrder = async (orderId: string, websiteId?: string) => ({ success: true, orderId, status: "refunded", websiteId });
export const cancelOrder = async (orderId: string, websiteId?: string) => ({ success: true, orderId, status: "cancelled", websiteId });
export const returnOrder = async (orderId: string, websiteId?: string) => ({ success: true, orderId, status: "returned", websiteId });
export const exportOrders = async (websiteId?: string) => ({ success: true, orders: getDemoStore(websiteId).orders, websiteId });
