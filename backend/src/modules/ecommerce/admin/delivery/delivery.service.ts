const getStoreKey = (websiteId?: string) => websiteId || "default";

const getDemoStore = (websiteId?: string) => {
  const key = getStoreKey(websiteId);
  const store = (global as any).__ecommerceAdminDeliveryStore || {};
  if (!store[key]) {
    store[key] = { delivery: [{ id: "delivery-1", name: "Fast Courier", status: "active" }] };
    (global as any).__ecommerceAdminDeliveryStore = store;
  }
  return store[key];
};

export const getDeliveryPartners = async (websiteId?: string) => getDemoStore(websiteId).delivery;
export const createDeliveryPartner = async (payload: any, websiteId?: string) => { const store = getDemoStore(websiteId); const item = { id: payload.id || `delivery-${Date.now()}`, ...payload }; store.delivery.push(item); return item; };
export const updateDeliveryPartner = async (deliveryId: string, payload: any, websiteId?: string) => { const store = getDemoStore(websiteId); const item = store.delivery.find((entry: any) => entry.id === deliveryId); if (!item) return null; Object.assign(item, payload); return item; };
export const deleteDeliveryPartner = async (deliveryId: string, websiteId?: string) => ({ success: true, deliveryId, websiteId });
