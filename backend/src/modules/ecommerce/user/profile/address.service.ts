const getStoreKey = (websiteId?: string) => websiteId || "default";

const getDemoStore = (websiteId?: string) => {
  const key = getStoreKey(websiteId);
  const store = (global as any).__ecommerceUserStore || {};
  if (!store[key]) {
    store[key] = {
      addresses: [
        {
          id: "addr-1",
          label: "Home",
          fullName: "Demo User",
          phone: "+91 9876543210",
          addressLine1: "12, Demo Street",
          addressLine2: "Near Market",
          city: "Mumbai",
          state: "MH",
          postalCode: "400001",
          country: "India",
          isDefault: true,
        },
      ],
    };
    (global as any).__ecommerceUserStore = store;
  }
  return store[key];
};

export const listAddresses = async (websiteId?: string) => {
  const store = getDemoStore(websiteId);
  return store.addresses;
};

export const getAddressById = async (addressId: string, websiteId?: string) => {
  const store = getDemoStore(websiteId);
  return store.addresses.find((address: any) => address.id === addressId) || null;
};

export const createAddress = async (payload: any, websiteId?: string) => {
  const store = getDemoStore(websiteId);
  const address = { id: `addr-${Date.now()}`, ...payload };
  store.addresses.push(address);
  return address;
};

export const updateAddress = async (addressId: string, payload: any, websiteId?: string) => {
  const store = getDemoStore(websiteId);
  const index = store.addresses.findIndex((address: any) => address.id === addressId);
  if (index === -1) return null;
  store.addresses[index] = { ...store.addresses[index], ...payload };
  return store.addresses[index];
};

export const deleteAddress = async (addressId: string, websiteId?: string) => {
  const store = getDemoStore(websiteId);
  store.addresses = store.addresses.filter((address: any) => address.id !== addressId);
  return { success: true };
};

export const setDefaultAddress = async (addressId: string, websiteId?: string) => {
  const store = getDemoStore(websiteId);
  store.addresses = store.addresses.map((address: any) => ({ ...address, isDefault: address.id === addressId }));
  return store.addresses.find((address: any) => address.id === addressId) || null;
};
