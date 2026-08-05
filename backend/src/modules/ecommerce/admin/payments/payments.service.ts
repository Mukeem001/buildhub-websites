const getStoreKey = (websiteId?: string) => websiteId || "default";

const getDemoStore = (websiteId?: string) => {
  const key = getStoreKey(websiteId);
  const store = (global as any).__ecommerceAdminPaymentsStore || {};
  if (!store[key]) {
    store[key] = { payments: [{ id: "pay-1", status: "paid", amount: 129.99 }] };
    (global as any).__ecommerceAdminPaymentsStore = store;
  }
  return store[key];
};

export const getPayments = async (websiteId?: string) => getDemoStore(websiteId).payments;
export const getPaymentById = async (paymentId: string, websiteId?: string) => getDemoStore(websiteId).payments.find((item: any) => item.id === paymentId) || null;
export const refundPayment = async (paymentId: string, websiteId?: string) => ({ success: true, paymentId, status: "refunded", websiteId });
export const exportPayments = async (websiteId?: string) => ({ success: true, payments: getDemoStore(websiteId).payments, websiteId });
