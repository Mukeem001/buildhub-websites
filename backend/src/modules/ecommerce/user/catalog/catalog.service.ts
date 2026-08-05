import { getProductsWithSlug } from "../profile/profile.service";

export const getUserProducts = async (websiteId?: string, websiteSlug?: string) => getProductsWithSlug(websiteId, websiteSlug);

export const getUserProductById = async (id: string, websiteId?: string, websiteSlug?: string) => {
  const products = await getProductsWithSlug(websiteId, websiteSlug);
  return products.find((product: any) => product.id === id) || null;
};

export const getUserProductBySlug = async (slug: string, websiteId?: string, websiteSlug?: string) => {
  const products = await getProductsWithSlug(websiteId, websiteSlug);
  return products.find((product: any) => product.slug === slug) || null;
};

export const getHomePageData = async (websiteId?: string, websiteSlug?: string) => {
  const products = await getProductsWithSlug(websiteId, websiteSlug);
  return {
    banner: [{ id: "banner-1", title: "Summer Sale", image: "/images/banner.jpg", link: "/products" }],
    categories: [
      { id: "cat-1", name: "Fashion", slug: "fashion" },
      { id: "cat-2", name: "Accessories", slug: "accessories" },
      { id: "cat-3", name: "Electronics", slug: "electronics" },
    ],
    featuredProducts: products.slice(0, 3),
    latestProducts: products.slice(0, 2),
    bestSelling: products.slice(1, 4),
    trending: products.slice(2, 5),
    offers: [{ id: "offer-1", title: "Buy 2 Get 1 Free", code: "BUY2GET1" }],
  };
};

export const searchProducts = async (query: string, websiteId?: string, websiteSlug?: string) => {
  const products = await getProductsWithSlug(websiteId, websiteSlug);
  const term = query.toLowerCase();
  return products.filter((product: any) => product.name.toLowerCase().includes(term) || product.description?.toLowerCase().includes(term));
};

export const filterProducts = async (filters: any, websiteId?: string, websiteSlug?: string) => {
  const products = await getProductsWithSlug(websiteId, websiteSlug);
  const minPrice = Number(filters?.minPrice || 0);
  const maxPrice = Number(filters?.maxPrice || Number.MAX_SAFE_INTEGER);
  return products.filter((product: any) => product.price >= minPrice && product.price <= maxPrice);
};

export const getRecommendedProducts = async (websiteId?: string, websiteSlug?: string) => {
  const products = await getProductsWithSlug(websiteId, websiteSlug);
  return products.slice(0, 4);
};

export const getRelatedProducts = async (slug: string, websiteId?: string, websiteSlug?: string) => {
  const products = await getProductsWithSlug(websiteId, websiteSlug);
  return products.filter((product: any) => product.slug !== slug).slice(0, 3);
};

export const getLatestProducts = async (websiteId?: string, websiteSlug?: string) => {
  const products = await getProductsWithSlug(websiteId, websiteSlug);
  return products.slice(0, 3);
};

export const getFeaturedProducts = async (websiteId?: string, websiteSlug?: string) => {
  const products = await getProductsWithSlug(websiteId, websiteSlug);
  return products.slice(0, 3);
};

export const getTrendingProducts = async (websiteId?: string, websiteSlug?: string) => {
  const products = await getProductsWithSlug(websiteId, websiteSlug);
  return products.slice(0, 3);
};

export const getDealsProducts = async (websiteId?: string, websiteSlug?: string) => {
  const products = await getProductsWithSlug(websiteId, websiteSlug);
  return products.filter((product: any) => Number(product.price) < 60);
};

export const getNewArrivalsProducts = async (websiteId?: string, websiteSlug?: string) => {
  const products = await getProductsWithSlug(websiteId, websiteSlug);
  return products.slice(0, 2);
};

export const getBrands = async () => [
  { id: "brand-1", name: "Northstar", slug: "northstar" },
  { id: "brand-2", name: "Aero", slug: "aero" },
];

export const getBrandBySlug = async (slug: string) => {
  const brand = (await getBrands()).find((item: any) => item.slug === slug);
  return brand || null;
};

export const getBrandProducts = async (slug: string, websiteId?: string, websiteSlug?: string) => {
  const products = await getProductsWithSlug(websiteId, websiteSlug);
  return { brand: slug, products: products.slice(0, 3) };
};
