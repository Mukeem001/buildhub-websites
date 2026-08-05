import api from "./api";

export interface SuperAdminWebsite {
  _id: string;
  name: string;
  slug?: string;
  domain?: string;
  customDomain?: string;
  subdomain?: string;
  templateSlug?: string;
  status?: string;
  isPublished?: boolean;
  owner?: string | { fullName?: string; email?: string };
  userId?: string | { fullName?: string; email?: string };
  visitors?: number;
  storage?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const getAllWebsites = async () => {
  const response = await api.get("/api/super-admin/websites");
  return response.data.data as SuperAdminWebsite[];
};

export const getSuperAdminProfile = async () => {
  const response = await api.get("/api/super-admin/profile");
  return response.data.data;
};
