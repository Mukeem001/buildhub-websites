import { getCurrentUser, invalidateSession } from "./auth.service";
import { API_URL } from "./api.config";

const handleResponse = async (response: Response) => {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    if (response.status === 403) {
      invalidateSession(data?.message || "Session expired");
    }
    throw new Error(data?.message || "Request failed");
  }

  return data;
};

const getAuthHeaders = () => {
  const user = getCurrentUser();

  return {
    "Content-Type": "application/json",
    ...(user?.token ? { Authorization: `Bearer ${user.token}` } : {}),
  };
};

export const getWebsiteDashboard = async (websiteId: string) => {
  const response = await fetch(`${API_URL}/websites/dashboard/${websiteId}`, {
    headers: getAuthHeaders(),
  });

  const data = await handleResponse(response);
  return data?.data;
};

export const getWebsiteById = async (websiteId: string) => {
  const response = await fetch(`${API_URL}/websites/${websiteId}`, {
    headers: getAuthHeaders(),
  });

  const data = await handleResponse(response);
  return data?.data;
};

export const getWebsiteSettings = async (websiteId: string) => {
  const response = await fetch(`${API_URL}/websites/settings/${websiteId}`, {
    headers: getAuthHeaders(),
  });

  const data = await handleResponse(response);
  return data?.data;
};

export const updateWebsiteSettings = async (
  websiteId: string,
  payload: Record<string, unknown>
) => {
  const response = await fetch(`${API_URL}/websites/settings/${websiteId}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  const data = await handleResponse(response);
  return data?.data;
};
