import api from "./api";

export interface WebsitePayload {
  id: string;
  name: string;
  slug?: string;
  domain?: string;
  owner?: string;
  template?: string;
  status?: string;
  plan?: string;
  visitors?: number;
  storage?: string;
  isPublished?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export const getUserWebsites = async (userId: string) => {
  const response = await api.get(`/api/websites/user/${userId}`);
  return response.data.data as WebsitePayload[];
};

export const getWebsite = async (id: string) => {
  const response = await api.get(`/api/websites/${id}`);
  return response.data.data as WebsitePayload;
};

export const createWebsite = async (payload: any) => {
  const response = await api.post(`/api/websites/create`, payload);
  return response.data.data as WebsitePayload;
};

export const updateWebsite = async (id: string, payload: any) => {
  const response = await api.put(`/api/websites/${id}`, payload);
  return response.data.data as WebsitePayload;
};

export const deleteWebsite = async (id: string) => {
  const response = await api.delete(`/api/websites/${id}`);
  return response.data;
};
