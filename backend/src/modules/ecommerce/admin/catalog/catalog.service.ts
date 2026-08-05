const getStoreKey = (websiteId?: string) => websiteId || "default";

const getDemoStore = (websiteId?: string) => {
  const key = getStoreKey(websiteId);
  const store = (global as any).__ecommerceAdminCatalogStore || {};
  if (!store[key]) {
    store[key] = {
      products: [
        { id: "prod-1", name: "Classic Hoodie", price: 49.99, description: "Premium hoodie", isActive: true, stock: 12, featured: true, trending: true, images: [{ id: "img-1", url: "/img/hoodie.jpg", isDefault: true }] },
        { id: "prod-2", name: "Minimal Backpack", price: 39.5, description: "Daily backpack", isActive: true, stock: 4, featured: false, trending: true, images: [{ id: "img-2", url: "/img/backpack.jpg", isDefault: true }] },
      ],
      categories: [{ id: "cat-1", name: "Fashion", isActive: true }],
      brands: [{ id: "brand-1", name: "Northstar", isActive: true }],
    };
    (global as any).__ecommerceAdminCatalogStore = store;
  }
  return store[key];
};

export const listProducts = async (websiteId?: string) => getDemoStore(websiteId).products;
export const getProductById = async (productId: string, websiteId?: string) => getDemoStore(websiteId).products.find((item: any) => item.id === productId) || null;
export const createProduct = async (payload: any, websiteId?: string) => {
  const store = getDemoStore(websiteId);
  const product = { id: payload.id || `prod-${Date.now()}`, name: payload.name || "New Product", price: Number(payload.price || 0), description: payload.description || "", isActive: payload.isActive !== false, stock: Number(payload.stock || 0), featured: Boolean(payload.featured), trending: Boolean(payload.trending), images: payload.images || [] };
  store.products.push(product);
  return product;
};
export const updateProduct = async (productId: string, payload: any, websiteId?: string) => {
  const store = getDemoStore(websiteId);
  const index = store.products.findIndex((item: any) => item.id === productId);
  if (index === -1) return null;
  store.products[index] = { ...store.products[index], ...payload };
  return store.products[index];
};
export const deleteProduct = async (productId: string, websiteId?: string) => {
  const store = getDemoStore(websiteId);
  store.products = store.products.filter((item: any) => item.id !== productId);
  return { success: true, productId };
};
export const setProductStatus = async (payload: any, websiteId?: string) => {
  const store = getDemoStore(websiteId);
  const product = store.products.find((item: any) => item.id === payload.productId);
  if (!product) return null;
  product.isActive = payload.isActive !== false;
  return product;
};
export const setProductStock = async (payload: any, websiteId?: string) => {
  const store = getDemoStore(websiteId);
  const product = store.products.find((item: any) => item.id === payload.productId);
  if (!product) return null;
  product.stock = Number(payload.stock ?? product.stock);
  return product;
};
export const setProductFeatured = async (payload: any, websiteId?: string) => {
  const store = getDemoStore(websiteId);
  const product = store.products.find((item: any) => item.id === payload.productId);
  if (!product) return null;
  product.featured = payload.featured !== false;
  return product;
};
export const setProductTrending = async (payload: any, websiteId?: string) => {
  const store = getDemoStore(websiteId);
  const product = store.products.find((item: any) => item.id === payload.productId);
  if (!product) return null;
  product.trending = payload.trending !== false;
  return product;
};
export const importProducts = async (payload: any, websiteId?: string) => ({ success: true, imported: payload.products || [], websiteId });
export const exportProducts = async (websiteId?: string) => ({ success: true, products: getDemoStore(websiteId).products, websiteId });
export const duplicateProduct = async (productId: string, websiteId?: string) => {
  const store = getDemoStore(websiteId);
  const product = store.products.find((item: any) => item.id === productId);
  if (!product) return null;
  const duplicate = { ...product, id: `prod-${Date.now()}`, name: `${product.name} Copy` };
  store.products.push(duplicate);
  return duplicate;
};
export const addProductImage = async (productId: string, payload: any, websiteId?: string) => {
  const store = getDemoStore(websiteId);
  const product = store.products.find((item: any) => item.id === productId);
  if (!product) return null;
  const image = { id: payload.id || `img-${Date.now()}`, url: payload.url || "/img/placeholder.jpg", isDefault: false };
  product.images = [...(product.images || []), image];
  return product.images;
};
export const deleteProductImage = async (productId: string, imageId: string, websiteId?: string) => {
  const store = getDemoStore(websiteId);
  const product = store.products.find((item: any) => item.id === productId);
  if (!product) return null;
  product.images = (product.images || []).filter((item: any) => item.id !== imageId);
  return product.images;
};
export const reorderProductImages = async (productId: string, payload: any, websiteId?: string) => {
  const store = getDemoStore(websiteId);
  const product = store.products.find((item: any) => item.id === productId);
  if (!product) return null;
  const ordered = payload.images || [];
  product.images = ordered;
  return product.images;
};
export const setDefaultProductImage = async (productId: string, imageId: string, websiteId?: string) => {
  const store = getDemoStore(websiteId);
  const product = store.products.find((item: any) => item.id === productId);
  if (!product) return null;
  product.images = (product.images || []).map((image: any) => ({ ...image, isDefault: image.id === imageId }));
  return product.images;
};
export const getCategories = async (websiteId?: string) => getDemoStore(websiteId).categories;
export const getCategoryById = async (categoryId: string, websiteId?: string) => getDemoStore(websiteId).categories.find((item: any) => item.id === categoryId) || null;
export const createCategory = async (payload: any, websiteId?: string) => {
  const store = getDemoStore(websiteId);
  const category = { id: payload.id || `cat-${Date.now()}`, name: payload.name || "New Category", isActive: payload.isActive !== false };
  store.categories.push(category);
  return category;
};
export const updateCategory = async (categoryId: string, payload: any, websiteId?: string) => {
  const store = getDemoStore(websiteId);
  const index = store.categories.findIndex((item: any) => item.id === categoryId);
  if (index === -1) return null;
  store.categories[index] = { ...store.categories[index], ...payload };
  return store.categories[index];
};
export const deleteCategory = async (categoryId: string, websiteId?: string) => {
  const store = getDemoStore(websiteId);
  store.categories = store.categories.filter((item: any) => item.id !== categoryId);
  return { success: true, categoryId };
};
export const updateCategoryStatus = async (payload: any, websiteId?: string) => {
  const store = getDemoStore(websiteId);
  const category = store.categories.find((item: any) => item.id === payload.categoryId);
  if (!category) return null;
  category.isActive = payload.isActive !== false;
  return category;
};
export const getBrands = async (websiteId?: string) => getDemoStore(websiteId).brands;
export const getBrandById = async (brandId: string, websiteId?: string) => getDemoStore(websiteId).brands.find((item: any) => item.id === brandId) || null;
export const createBrand = async (payload: any, websiteId?: string) => {
  const store = getDemoStore(websiteId);
  const brand = { id: payload.id || `brand-${Date.now()}`, name: payload.name || "New Brand", isActive: payload.isActive !== false };
  store.brands.push(brand);
  return brand;
};
export const updateBrand = async (brandId: string, payload: any, websiteId?: string) => {
  const store = getDemoStore(websiteId);
  const index = store.brands.findIndex((item: any) => item.id === brandId);
  if (index === -1) return null;
  store.brands[index] = { ...store.brands[index], ...payload };
  return store.brands[index];
};
export const deleteBrand = async (brandId: string, websiteId?: string) => {
  const store = getDemoStore(websiteId);
  store.brands = store.brands.filter((item: any) => item.id !== brandId);
  return { success: true, brandId };
};
