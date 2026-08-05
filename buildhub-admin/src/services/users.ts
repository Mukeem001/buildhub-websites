import api from "./api";

export interface AdminUser {
  id: string;
  _id?: string;
  fullName: string;
  name?: string;
  email: string;
  phone?: string;
  role: string;
  isActive?: boolean;
  status?: string;
  plan?: string;
  company?: string;
  websiteCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

const normalizeRole = (value?: string) => {
  const normalized = (value || "").toLowerCase().trim();

  if (normalized === "admin" || normalized === "super admin" || normalized === "editor") {
    return "admin";
  }

  return "user";
};

const normalizeUserPayload = (payload: Partial<AdminUser>) => {
  const normalizedPayload: Record<string, any> = { ...payload };

  if (typeof payload.role !== "undefined") {
    normalizedPayload.role = normalizeRole(payload.role);
  }

  if (typeof payload.status !== "undefined") {
    normalizedPayload.isActive = payload.status !== "Suspended" && payload.status !== "Inactive" && payload.status !== "false";
    delete normalizedPayload.status;
  }

  if (typeof payload.isActive === "boolean") {
    normalizedPayload.isActive = payload.isActive;
  }

  return normalizedPayload;
};

export const getUsers = async () => {
  const response = await api.get("/api/users");
  return response.data.data as AdminUser[];
};

export const getUserById = async (id: string) => {
  const response = await api.get(`/api/users/${id}`);
  return response.data.data as AdminUser;
};

export const getUserProfileWithStats = async (id: string) => {
  const response = await api.get(`/api/users/${id}/profile`);
  return response.data.data as AdminUser;
};

export const deleteUser = async (id: string) => {
  const response = await api.delete(`/api/users/${id}`);
  return response.data;
};

export const bulkDeleteUsers = async (ids: string[]) => {
  const response = await api.post(`/api/users/bulk-delete`, { ids });
  return response.data;
};

export const updateUserById = async (id: string, payload: Partial<AdminUser>) => {
  const response = await api.patch(`/api/users/${id}`, normalizeUserPayload(payload));
  return response.data.data as AdminUser;
};

export const getCurrentUser = async () => {
  const response = await api.get("/api/users/me");
  return response.data.data as AdminUser;
};

export const updateCurrentUser = async (payload: Partial<AdminUser>) => {
  const response = await api.put("/api/users/me", payload);
  return response.data.data as AdminUser;
};
