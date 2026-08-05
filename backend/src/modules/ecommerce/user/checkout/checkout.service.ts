import { getAdminProducts } from "../../admin/admin.service";

const getStoreKey = (websiteId?: string) => websiteId || "default";

const getDemoStore = (websiteId?: string) => {
  const key = getStoreKey(websiteId);
  const store = (global as any).__ecommerceUserStore || {};
  if (!store[key]) {
    store[key] = {
      checkout: {},
      orders: [],
      payments: [],
    };
    (global as any).__ecommerceUserStore = store;
  }
  return store[key];
};

export const createCheckout = async (payload: any, websiteId?: string) => {
  const store = getDemoStore(websiteId);
  store.checkout = { ...store.checkout, ...payload };
  return { success: true, checkout: store.checkout };
};

export const setShipping = async (payload: any, websiteId?: string) => {
  const store = getDemoStore(websiteId);
  store.checkout = { ...store.checkout, shipping: payload };
  return { success: true, checkout: store.checkout };
};

export const setPayment = async (payload: any, websiteId?: string) => {
  const store = getDemoStore(websiteId);
  store.checkout = { ...store.checkout, payment: payload };
  return { success: true, checkout: store.checkout };
};

export const confirmCheckout = async (payload: any, websiteId?: string) => {
  const store = getDemoStore(websiteId);
  store.checkout = { ...store.checkout, confirmed: true, ...payload };
  return { success: true, checkout: store.checkout };
};

export const getCheckoutSummary = async (websiteId?: string) => {
  const store = getDemoStore(websiteId);
  return { success: true, checkout: store.checkout };
};

export const createOrder = async (payload: any, websiteId?: string) => {
  const store = getDemoStore(websiteId);
  const order = { id: `ord-${Date.now()}`, status: "pending", createdAt: new Date().toISOString(), ...payload };
  store.orders.push(order);
  return { success: true, order };
};

export const listOrders = async (websiteId?: string) => {
  const store = getDemoStore(websiteId);
  return store.orders;
};

export const getOrderById = async (orderId: string, websiteId?: string) => {
  const store = getDemoStore(websiteId);
  return store.orders.find((order: any) => order.id === orderId) || null;
};

export const getOrderInvoice = async (orderId: string, websiteId?: string) => ({
  orderId,
  invoiceUrl: `/invoices/${orderId}.pdf`,
  websiteId,
});

export const cancelOrder = async (orderId: string, websiteId?: string) => ({ success: true, orderId, status: "cancelled", websiteId });
export const returnOrder = async (orderId: string, websiteId?: string) => ({ success: true, orderId, status: "returned", websiteId });
export const refundOrder = async (orderId: string, websiteId?: string) => ({ success: true, orderId, status: "refunded", websiteId });
export const reorderOrder = async (orderId: string, websiteId?: string) => ({ success: true, orderId, status: "reordered", websiteId });
export const trackOrder = async (orderId: string, websiteId?: string) => ({ orderId, status: "in transit", websiteId });

export const createPaymentOrder = async (payload: any, websiteId?: string) => {
  const store = getDemoStore(websiteId);
  const payment = { id: `pay-${Date.now()}`, status: "created", ...payload };
  store.payments.push(payment);
  return { success: true, payment };
};

export const verifyPayment = async (payload: any, websiteId?: string) => ({ success: true, payment: payload, websiteId });
export const getPaymentHistory = async (websiteId?: string) => {
  const store = getDemoStore(websiteId);
  return store.payments;
};
export const getPaymentById = async (paymentId: string, websiteId?: string) => {
  const store = getDemoStore(websiteId);
  return store.payments.find((payment: any) => payment.id === paymentId) || null;
};
export const handlePaymentWebhook = async (payload: any) => ({ success: true, payload });
