const getStoreKey = (websiteId?: string) => websiteId || "default";

const getDemoStore = (websiteId?: string) => {
  const key = getStoreKey(websiteId);
  const store = (global as any).__ecommerceAdminShippingStore || {};
  if (!store[key]) {
    store[key] = { shipping: [{ id: "ship-1", name: "Standard", cost: 5 }], zones: [{ id: "zone-1", name: "Domestic" }] };
    (global as any).__ecommerceAdminShippingStore = store;
  }
  return store[key];
};

export const getShipping = async (websiteId?: string) => getDemoStore(websiteId).shipping;
export const createShipping = async (payload: any, websiteId?: string) => { const store = getDemoStore(websiteId); const item = { id: payload.id || `ship-${Date.now()}`, ...payload }; store.shipping.push(item); return item; };
export const deleteShipping = async (shippingId: string, websiteId?: string) => ({ success: true, shippingId, websiteId });
export const getZones = async (websiteId?: string) => getDemoStore(websiteId).zones;
export const createZone = async (payload: any, websiteId?: string) => { const store = getDemoStore(websiteId); const item = { id: payload.id || `zone-${Date.now()}`, ...payload }; store.zones.push(item); return item; };
