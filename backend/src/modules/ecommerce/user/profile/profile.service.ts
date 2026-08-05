import { getAdminProducts } from "../../admin/admin.service";
export * from "./address.service";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const getCustomerProfile = async (user: any) => ({
  id: user?._id?.toString() || "demo-user",
  name: user?.name || "Demo User",
  email: user?.email || "demo@example.com",
  phone: user?.mobile || "+91 9999999999",
  avatar: user?.avatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  role: user?.role || "customer",
  createdAt: user?.createdAt || new Date().toISOString(),
});

export const updateCustomerProfile = async (user: any, payload: any) => ({
  ...((await getCustomerProfile(user)) || {}),
  ...payload,
});

export const updateCustomerAvatar = async (user: any, payload: any) => ({
  ...(await getCustomerProfile(user)),
  avatar: payload?.avatar || payload?.image || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
});

export const updateCustomerEmail = async (user: any, payload: any) => ({
  ...(await getCustomerProfile(user)),
  email: payload?.email || "demo@example.com",
});

export const updateCustomerMobile = async (user: any, payload: any) => ({
  ...(await getCustomerProfile(user)),
  phone: payload?.mobile || "+91 9999999999",
});

export const updateCustomerPassword = async (_user: any, _payload: any) => ({
  success: true,
  message: "Password updated successfully",
});

export const getCustomerActivity = async () => [
  { id: "act-1", type: "login", description: "Signed in successfully", createdAt: new Date().toISOString() },
  { id: "act-2", type: "order", description: "Placed an order", createdAt: new Date().toISOString() },
];

export const getCustomerPreferences = async () => ({
  theme: "light",
  language: "en",
  currency: "USD",
  notifications: true,
  newsletter: true,
});

export const updateCustomerPreferences = async (payload: any) => ({
  ...(await getCustomerPreferences()),
  ...payload,
});

export const getProductsWithSlug = async (websiteId?: string, websiteSlug?: string) => {
  const products = await getAdminProducts(websiteId, websiteSlug);
  return products
    .filter((product: any) => product.isActive !== false)
    .map((product: any) => ({ ...product, slug: slugify(product.name) }));
};
