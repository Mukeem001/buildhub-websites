const getStoreKey = (websiteId?: string) => websiteId || "default";

const getDemoStore = (websiteId?: string) => {
  const key = getStoreKey(websiteId);
  const store = (global as any).__ecommerceAdminInventoryStore || {};
  if (!store[key]) {
    store[key] = {
      inventory: [{ productId: "prod-1", stock: 12, sku: "SKU-001" }, { productId: "prod-2", stock: 4, sku: "SKU-002" }],
      history: [{ id: "inv-1", action: "restocked", quantity: 5, createdAt: new Date().toISOString() }],
    };
    (global as any).__ecommerceAdminInventoryStore = store;
  }
  return store[key];
};

export const getInventory = async (websiteId?: string) => getDemoStore(websiteId).inventory;
export const updateInventory = async (productId: string, payload: any, websiteId?: string) => {
  const store = getDemoStore(websiteId);
  const item = store.inventory.find((entry: any) => entry.productId === productId);
  if (!item) return null;
  item.stock = Number(payload.stock ?? item.stock);
  return item;
};
export const addInventory = async (payload: any, websiteId?: string) => {
  const store = getDemoStore(websiteId);
  store.inventory.push({ productId: payload.productId, stock: Number(payload.quantity || 0), sku: payload.sku || "SKU-NEW" });
  return store.inventory;
};
export const removeInventory = async (payload: any, websiteId?: string) => {
  const store = getDemoStore(websiteId);
  store.inventory = store.inventory.filter((entry: any) => entry.productId !== payload.productId);
  return store.inventory;
};
export const getLowStock = async (websiteId?: string) => getDemoStore(websiteId).inventory.filter((entry: any) => entry.stock < 5);
export const getOutOfStock = async (websiteId?: string) => getDemoStore(websiteId).inventory.filter((entry: any) => entry.stock === 0);
export const getInventoryHistory = async (websiteId?: string) => getDemoStore(websiteId).history;
