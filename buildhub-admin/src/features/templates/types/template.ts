export interface Template {
  id: string | number;
  name: string;
  slug?: string;
  description: string;
  category: string;
  author: string;
  price: number;
  downloads: number;
  status: "Published" | "Draft" | "Maintenance";
  image: string;
  rating?: number;
  premium?: boolean;
  previewUrl?: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}