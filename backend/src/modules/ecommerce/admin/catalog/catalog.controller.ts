import { Response } from "express";
import { createBrand, createCategory, deleteBrand, deleteCategory, getBrandById, getBrands, getCategoryById, getCategories, listProducts, getProductById, createProduct, updateProduct, deleteProduct, setProductStatus, setProductStock, setProductFeatured, setProductTrending, importProducts, exportProducts, duplicateProduct, addProductImage, deleteProductImage, reorderProductImages, setDefaultProductImage, updateCategoryStatus } from "./catalog.service";
import { EcommerceAdminRequest, getParamString, handleControllerError, sendContext } from "../controller.utils";

export const listAdminProductsRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try {
    const data = await listProducts(req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, data));
  } catch (error: unknown) {
    return handleControllerError(res, error);
  }
};

export const getAdminProductByIdRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try {
    const data = await getProductById(getParamString(req.params.id), req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, data));
  } catch (error: unknown) {
    return handleControllerError(res, error);
  }
};

export const createAdminProductRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try {
    const data = await createProduct(req.body || {}, req.websiteContext?.websiteId);
    return res.status(201).json(sendContext(req, data));
  } catch (error: unknown) {
    return handleControllerError(res, error);
  }
};

export const updateAdminProductRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try {
    const data = await updateProduct(getParamString(req.params.id), req.body || {}, req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, data));
  } catch (error: unknown) {
    return handleControllerError(res, error);
  }
};

export const deleteAdminProductRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try {
    const data = await deleteProduct(getParamString(req.params.id), req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, data));
  } catch (error: unknown) {
    return handleControllerError(res, error);
  }
};

export const setProductStatusRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try {
    const data = await setProductStatus(req.body || {}, req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, data));
  } catch (error: unknown) {
    return handleControllerError(res, error);
  }
};

export const setProductStockRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try {
    const data = await setProductStock(req.body || {}, req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, data));
  } catch (error: unknown) {
    return handleControllerError(res, error);
  }
};

export const setProductFeaturedRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try {
    const data = await setProductFeatured(req.body || {}, req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, data));
  } catch (error: unknown) {
    return handleControllerError(res, error);
  }
};

export const setProductTrendingRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try {
    const data = await setProductTrending(req.body || {}, req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, data));
  } catch (error: unknown) {
    return handleControllerError(res, error);
  }
};

export const importProductsRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try {
    const data = await importProducts(req.body || {}, req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, data));
  } catch (error: unknown) {
    return handleControllerError(res, error);
  }
};

export const exportProductsRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try {
    const data = await exportProducts(req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, data));
  } catch (error: unknown) {
    return handleControllerError(res, error);
  }
};

export const duplicateProductRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try {
    const data = await duplicateProduct(getParamString(req.params.id), req.websiteContext?.websiteId);
    return res.status(201).json(sendContext(req, data));
  } catch (error: unknown) {
    return handleControllerError(res, error);
  }
};

export const addProductImageRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try {
    const data = await addProductImage(getParamString(req.params.id), req.body || {}, req.websiteContext?.websiteId);
    return res.status(201).json(sendContext(req, data));
  } catch (error: unknown) {
    return handleControllerError(res, error);
  }
};

export const deleteProductImageRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try {
    const data = await deleteProductImage(getParamString(req.params.id), getParamString(req.params.imageId), req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, data));
  } catch (error: unknown) {
    return handleControllerError(res, error);
  }
};

export const reorderProductImagesRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try {
    const data = await reorderProductImages(getParamString(req.params.id), req.body || {}, req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, data));
  } catch (error: unknown) {
    return handleControllerError(res, error);
  }
};

export const setDefaultProductImageRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try {
    const data = await setDefaultProductImage(getParamString(req.params.id), getParamString(req.params.imageId), req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, data));
  } catch (error: unknown) {
    return handleControllerError(res, error);
  }
};

export const listAdminCategoriesRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try {
    const data = await getCategories(req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, data));
  } catch (error: unknown) {
    return handleControllerError(res, error);
  }
};

export const getAdminCategoryByIdRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try {
    const data = await getCategoryById(getParamString(req.params.id), req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, data));
  } catch (error: unknown) {
    return handleControllerError(res, error);
  }
};

export const createAdminCategoryRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try {
    const data = await createCategory(req.body || {}, req.websiteContext?.websiteId);
    return res.status(201).json(sendContext(req, data));
  } catch (error: unknown) {
    return handleControllerError(res, error);
  }
};

export const updateAdminCategoryRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try {
    const data = await createCategory(req.body || {}, req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, data));
  } catch (error: unknown) {
    return handleControllerError(res, error);
  }
};

export const deleteAdminCategoryRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try {
    const data = await deleteCategory(getParamString(req.params.id), req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, data));
  } catch (error: unknown) {
    return handleControllerError(res, error);
  }
};

export const updateCategoryStatusRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try {
    const data = await updateCategoryStatus(req.body || {}, req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, data));
  } catch (error: unknown) {
    return handleControllerError(res, error);
  }
};

export const listAdminBrandsRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try {
    const data = await getBrands(req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, data));
  } catch (error: unknown) {
    return handleControllerError(res, error);
  }
};

export const getAdminBrandByIdRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try {
    const data = await getBrandById(getParamString(req.params.id), req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, data));
  } catch (error: unknown) {
    return handleControllerError(res, error);
  }
};

export const createAdminBrandRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try {
    const data = await createBrand(req.body || {}, req.websiteContext?.websiteId);
    return res.status(201).json(sendContext(req, data));
  } catch (error: unknown) {
    return handleControllerError(res, error);
  }
};

export const updateAdminBrandRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try {
    const data = await createBrand(req.body || {}, req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, data));
  } catch (error: unknown) {
    return handleControllerError(res, error);
  }
};

export const deleteAdminBrandRoute = async (req: EcommerceAdminRequest, res: Response) => {
  try {
    const data = await deleteBrand(getParamString(req.params.id), req.websiteContext?.websiteId);
    return res.status(200).json(sendContext(req, data));
  } catch (error: unknown) {
    return handleControllerError(res, error);
  }
};
