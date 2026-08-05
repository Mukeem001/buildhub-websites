import type { EcommerceProduct } from "../shared/types";

interface EcommerceProductPayload extends Partial<EcommerceProduct> {
  websiteId?: string;
  websiteSlug?: string;
}

const productStore: Record<string, EcommerceProduct[]> = {};

const getStoreKey = (websiteId?: string) => websiteId || "default";

const seedProducts = (websiteId?: string): EcommerceProduct[] => {
  const baseProducts: EcommerceProduct[] = [
    {
      id: "prod-1001",
      name: "Classic Hoodie",
      price: 49.99,
      description: "Premium comfort hoodie for everyday wear.",
      isActive: true,
    },
    {
      id: "prod-1002",
      name: "Minimal Backpack",
      price: 39.5,
      description: "Lightweight backpack designed for daily use.",
      isActive: true,
    },
    {
      id: "prod-1003",
      name: "Wireless Earbuds",
      price: 89.0,
      description: "Noise-cancelling earbuds with long battery life.",
      isActive: true,
    },
  ];

  return baseProducts.map((product) => ({
    ...product,
    websiteId,
    websiteSlug: undefined,
    createdAt: new Date().toISOString(),
  }));
};

export const getAdminProducts = async (websiteId?: string, websiteSlug?: string): Promise<EcommerceProduct[]> => {
  const key = getStoreKey(websiteId);

  if (!productStore[key]) {
    productStore[key] = seedProducts(websiteId);
  }

  return productStore[key].map((product) => ({
    ...product,
    websiteSlug: websiteSlug || product.websiteSlug,
  }));
};

export const createAdminProduct = async (payload: EcommerceProductPayload): Promise<EcommerceProduct> => {
  const key = getStoreKey(payload.websiteId);

  if (!productStore[key]) {
    productStore[key] = seedProducts(payload.websiteId);
  }

  const product: EcommerceProduct = {
    id: payload.id || `prod-${Date.now()}`,
    name: payload.name || "New Product",
    price: Number(payload.price ?? 0),
    description: payload.description || "Product created from ecommerce admin API.",
    isActive: payload.isActive !== false,
    websiteId: payload.websiteId,
    websiteSlug: payload.websiteSlug,
    createdAt: new Date().toISOString(),
  };

  productStore[key].push(product);
  return product;
};
