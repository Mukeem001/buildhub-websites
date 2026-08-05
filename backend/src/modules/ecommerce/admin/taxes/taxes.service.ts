const getStoreKey = (websiteId?: string) => websiteId || "default";

const getDemoStore = (websiteId?: string) => {
  const key = getStoreKey(websiteId);
  const store = (global as any).__ecommerceAdminTaxesStore || {};
  if (!store[key]) {
    store[key] = { taxes: [{ id: "tax-1", name: "GST", rate: 18 }] };
    (global as any).__ecommerceAdminTaxesStore = store;
  }
  return store[key];
};

export const getTaxes = async (websiteId?: string) => getDemoStore(websiteId).taxes;
export const createTax = async (payload: any, websiteId?: string) => { const store = getDemoStore(websiteId); const item = { id: payload.id || `tax-${Date.now()}`, ...payload }; store.taxes.push(item); return item; };
export const updateTax = async (taxId: string, payload: any, websiteId?: string) => { const store = getDemoStore(websiteId); const item = store.taxes.find((entry: any) => entry.id === taxId); if (!item) return null; Object.assign(item, payload); return item; };
export const deleteTax = async (taxId: string, websiteId?: string) => ({ success: true, taxId, websiteId });
