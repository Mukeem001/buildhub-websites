const getStoreKey = (websiteId?: string) => websiteId || "default";

const getDemoStore = (websiteId?: string) => {
  const key = getStoreKey(websiteId);
  const store = (global as any).__ecommerceAdminSettingsStore || {};
  if (!store[key]) {
    store[key] = { settings: { siteName: "Demo Store", currency: "USD", language: "en", timezone: "UTC" } };
    (global as any).__ecommerceAdminSettingsStore = store;
  }
  return store[key];
};

export const getSettings = async (websiteId?: string) => getDemoStore(websiteId).settings;
export const updateSettings = async (payload: any, websiteId?: string) => { const store = getDemoStore(websiteId); store.settings = { ...store.settings, ...payload }; return store.settings; };
export const updateLogo = async (payload: any, websiteId?: string) => ({ success: true, logo: payload, websiteId });
export const updateFavicon = async (payload: any, websiteId?: string) => ({ success: true, favicon: payload, websiteId });
export const updateSeo = async (payload: any, websiteId?: string) => ({ success: true, seo: payload, websiteId });
export const updateContact = async (payload: any, websiteId?: string) => ({ success: true, contact: payload, websiteId });
export const updateSocial = async (payload: any, websiteId?: string) => ({ success: true, social: payload, websiteId });
export const updateCurrency = async (payload: any, websiteId?: string) => ({ success: true, currency: payload, websiteId });
export const updateLanguage = async (payload: any, websiteId?: string) => ({ success: true, language: payload, websiteId });
export const updateTimezone = async (payload: any, websiteId?: string) => ({ success: true, timezone: payload, websiteId });
