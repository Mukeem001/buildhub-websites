import api from "./api";

export interface TemplatePayload {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  category?: string;
  thumbnail?: string;
  previewUrl?: string;
  isActive?: boolean;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export const getTemplates = async () => {
  const response = await api.get("/api/templates");
  return response.data.data as TemplatePayload[];
};

export const getTemplate = async (id: string) => {
  const response = await api.get(`/api/templates/${id}`);
  return response.data.data as TemplatePayload;
};

export const createTemplate = async (payload: any) => {
  const response = await api.post("/api/templates", payload);
  return response.data.data as TemplatePayload;
};

export const updateTemplate = async (id: string, payload: any) => {
  const response = await api.put(`/api/templates/${id}`, payload);
  return response.data.data as TemplatePayload;
};

export const deleteTemplate = async (id: string) => {
  const response = await api.delete(`/api/templates/${id}`);
  return response.data;
};
