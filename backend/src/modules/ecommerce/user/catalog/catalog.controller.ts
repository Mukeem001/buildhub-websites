import { Response } from "express";
import {
  getHomePageData,
  getUserProducts,
  getUserProductBySlug,
  searchProducts,
  filterProducts,
  getRecommendedProducts,
  getRelatedProducts,
  getLatestProducts,
  getFeaturedProducts,
  getTrendingProducts,
  getDealsProducts,
  getNewArrivalsProducts,
  getBrands,
  getBrandBySlug,
  getBrandProducts,
} from "./catalog.service";
import { EcommerceUserRequest, getParamString, handleControllerError, sendContext } from "../controller.utils";

export const getHome = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const home = await getHomePageData(req.websiteContext?.websiteId, req.websiteContext?.websiteSlug);
    return res.status(200).json(sendContext(req, home));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const getHomeBanner = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const home = await getHomePageData(req.websiteContext?.websiteId, req.websiteContext?.websiteSlug);
    return res.status(200).json(sendContext(req, home.banner));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const getHomeCategories = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const home = await getHomePageData(req.websiteContext?.websiteId, req.websiteContext?.websiteSlug);
    return res.status(200).json(sendContext(req, home.categories));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const getHomeFeaturedProducts = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const home = await getHomePageData(req.websiteContext?.websiteId, req.websiteContext?.websiteSlug);
    return res.status(200).json(sendContext(req, home.featuredProducts));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const getHomeLatestProducts = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const home = await getHomePageData(req.websiteContext?.websiteId, req.websiteContext?.websiteSlug);
    return res.status(200).json(sendContext(req, home.latestProducts));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const getHomeBestSelling = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const home = await getHomePageData(req.websiteContext?.websiteId, req.websiteContext?.websiteSlug);
    return res.status(200).json(sendContext(req, home.bestSelling));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const getHomeTrending = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const home = await getHomePageData(req.websiteContext?.websiteId, req.websiteContext?.websiteSlug);
    return res.status(200).json(sendContext(req, home.trending));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const getHomeOffers = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const home = await getHomePageData(req.websiteContext?.websiteId, req.websiteContext?.websiteSlug);
    return res.status(200).json(sendContext(req, home.offers));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const getProducts = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const products = await getUserProducts(req.websiteContext?.websiteId, req.websiteContext?.websiteSlug);
    return res.status(200).json(sendContext(req, products));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const getProductBySlugRoute = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const product = await getUserProductBySlug(getParamString(req.params.slug), req.websiteContext?.websiteId, req.websiteContext?.websiteSlug);
    return res.status(200).json(sendContext(req, product));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const searchProductsRoute = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const products = await searchProducts(req.query.q as string, req.websiteContext?.websiteId, req.websiteContext?.websiteSlug);
    return res.status(200).json(sendContext(req, products));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const filterProductsRoute = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const products = await filterProducts(req.query, req.websiteContext?.websiteId, req.websiteContext?.websiteSlug);
    return res.status(200).json(sendContext(req, products));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const getRecommendedProductsRoute = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const products = await getRecommendedProducts(req.websiteContext?.websiteId, req.websiteContext?.websiteSlug);
    return res.status(200).json(sendContext(req, products));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const getRelatedProductsRoute = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const products = await getRelatedProducts(getParamString(req.params.slug), req.websiteContext?.websiteId, req.websiteContext?.websiteSlug);
    return res.status(200).json(sendContext(req, products));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const getLatestProductsRoute = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const products = await getLatestProducts(req.websiteContext?.websiteId, req.websiteContext?.websiteSlug);
    return res.status(200).json(sendContext(req, products));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const getFeaturedProductsRoute = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const products = await getFeaturedProducts(req.websiteContext?.websiteId, req.websiteContext?.websiteSlug);
    return res.status(200).json(sendContext(req, products));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const getTrendingProductsRoute = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const products = await getTrendingProducts(req.websiteContext?.websiteId, req.websiteContext?.websiteSlug);
    return res.status(200).json(sendContext(req, products));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const getDealsProductsRoute = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const products = await getDealsProducts(req.websiteContext?.websiteId, req.websiteContext?.websiteSlug);
    return res.status(200).json(sendContext(req, products));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const getNewArrivalsProductsRoute = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const products = await getNewArrivalsProducts(req.websiteContext?.websiteId, req.websiteContext?.websiteSlug);
    return res.status(200).json(sendContext(req, products));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const getBrandsRoute = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const brands = await getBrands();
    return res.status(200).json(sendContext(req, brands));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const getBrandBySlugRoute = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const brand = await getBrandBySlug(getParamString(req.params.slug));
    return res.status(200).json(sendContext(req, brand));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const getBrandProductsRoute = async (req: EcommerceUserRequest, res: Response) => {
  try {
    const products = await getBrandProducts(getParamString(req.params.slug), req.websiteContext?.websiteId, req.websiteContext?.websiteSlug);
    return res.status(200).json(sendContext(req, products));
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};
