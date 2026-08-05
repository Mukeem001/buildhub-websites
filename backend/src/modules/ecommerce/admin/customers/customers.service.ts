const getStoreKey = (websiteId?: string) => websiteId || "default";

const getDemoStore = (websiteId?: string) => {
  const key = getStoreKey(websiteId);
  const store = (global as any).__ecommerceAdminCustomersStore || {};
  if (!store[key]) {
    store[key] = {
      customers: [{ id: "cust-1", name: "Aisha Khan", email: "aisha@example.com", blocked: false }],
    };
    (global as any).__ecommerceAdminCustomersStore = store;
  }
  return store[key];
};

export const getCustomers = async (websiteId?: string) => getDemoStore(websiteId).customers;
export const getCustomerById = async (customerId: string, websiteId?: string) => getDemoStore(websiteId).customers.find((item: any) => item.id === customerId) || null;
export const updateCustomer = async (customerId: string, payload: any, websiteId?: string) => { const store = getDemoStore(websiteId); const item = store.customers.find((entry: any) => entry.id === customerId); if (!item) return null; Object.assign(item, payload); return item; };
export const deleteCustomer = async (customerId: string, websiteId?: string) => ({ success: true, customerId, websiteId });
export const blockCustomer = async (customerId: string, websiteId?: string) => { const store = getDemoStore(websiteId); const item = store.customers.find((entry: any) => entry.id === customerId); if (!item) return null; item.blocked = true; return item; };
export const unblockCustomer = async (customerId: string, websiteId?: string) => { const store = getDemoStore(websiteId); const item = store.customers.find((entry: any) => entry.id === customerId); if (!item) return null; item.blocked = false; return item; };
export const getCustomerOrders = async (customerId: string, websiteId?: string) => ({ customerId, orders: [] , websiteId });
export const getCustomerWallet = async (customerId: string, websiteId?: string) => ({ customerId, balance: 0, websiteId });
