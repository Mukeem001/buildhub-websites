const getStoreKey = (websiteId?: string) => websiteId || "default";

const getDemoStore = (websiteId?: string) => {
  const key = getStoreKey(websiteId);
  const store = (global as any).__ecommerceUserStore || {};
  if (!store[key]) {
    store[key] = {
      wishlist: [] as string[],
      cart: [] as any[],
      coupons: [
        { code: "SAVE10", type: "percent", value: 10, description: "10% off on orders above $50" },
        { code: "FREESHIP", type: "shipping", value: 0, description: "Free shipping" },
      ],
      checkout: {},
    };
    (global as any).__ecommerceUserStore = store;
  }
  return store[key];
};

export const listWishlist = async (websiteId?: string) => {
  const store = getDemoStore(websiteId);
  return store.wishlist;
};

export const addWishlistItem = async (productId: string, websiteId?: string) => {
  const store = getDemoStore(websiteId);
  if (!store.wishlist.includes(productId)) store.wishlist.push(productId);
  return store.wishlist;
};

export const removeWishlistItem = async (productId: string, websiteId?: string) => {
  const store = getDemoStore(websiteId);
  store.wishlist = store.wishlist.filter((item: string) => item !== productId);
  return store.wishlist;
};

export const clearWishlist = async (websiteId?: string) => {
  const store = getDemoStore(websiteId);
  store.wishlist = [];
  return { success: true };
};

export const getCart = async (websiteId?: string) => {
  const store = getDemoStore(websiteId);
  return store.cart;
};

export const addCartItem = async (payload: any, websiteId?: string) => {
  const store = getDemoStore(websiteId);
  const item = { id: `item-${Date.now()}`, quantity: 1, ...payload };
  store.cart.push(item);
  return store.cart;
};

export const updateCartItem = async (itemId: string, payload: any, websiteId?: string) => {
  const store = getDemoStore(websiteId);
  const index = store.cart.findIndex((item: any) => item.id === itemId);
  if (index === -1) return store.cart;
  store.cart[index] = { ...store.cart[index], ...payload };
  return store.cart;
};

export const deleteCartItem = async (itemId: string, websiteId?: string) => {
  const store = getDemoStore(websiteId);
  store.cart = store.cart.filter((item: any) => item.id !== itemId);
  return store.cart;
};

export const clearCart = async (websiteId?: string) => {
  const store = getDemoStore(websiteId);
  store.cart = [];
  return { success: true };
};

export const increaseCartItem = async (itemId: string, websiteId?: string) => {
  const store = getDemoStore(websiteId);
  const index = store.cart.findIndex((item: any) => item.id === itemId);
  if (index === -1) return store.cart;
  store.cart[index].quantity += 1;
  return store.cart;
};

export const decreaseCartItem = async (itemId: string, websiteId?: string) => {
  const store = getDemoStore(websiteId);
  const index = store.cart.findIndex((item: any) => item.id === itemId);
  if (index === -1) return store.cart;
  store.cart[index].quantity = Math.max(1, store.cart[index].quantity - 1);
  return store.cart;
};

export const applyCoupon = async (payload: any, websiteId?: string) => {
  const store = getDemoStore(websiteId);
  store.checkout = { ...store.checkout, coupon: payload?.code || "SAVE10" };
  return { success: true, coupon: store.checkout.coupon };
};

export const removeCoupon = async (websiteId?: string) => {
  const store = getDemoStore(websiteId);
  store.checkout = { ...store.checkout, coupon: undefined };
  return { success: true };
};

export const getAvailableCoupons = async (websiteId?: string) => {
  const store = getDemoStore(websiteId);
  return store.coupons;
};
