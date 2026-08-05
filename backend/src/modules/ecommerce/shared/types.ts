export interface EcommerceProduct {
  id: string;
  name: string;
  price: number;
  description?: string;
  isActive: boolean;
  websiteId?: string;
  websiteSlug?: string;
  createdAt?: string;
  slug?: string;
}
