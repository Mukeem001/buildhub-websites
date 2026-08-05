export interface Project {
  id: string;
  slug?: string;
  name: string;
  templateName?: string;
  templateSlug?: string;
  url: string;
  domain?: string;
  status: "building" | "live" | "failed";
  createdAt: string;
  visits?: number;
  orders?: number;
  image?: string;
}