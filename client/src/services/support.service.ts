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

const buildSupportUrl = (
  websiteId: string,
  websiteSlug: string,
  suffix: string
) => `${API_URL}/modules/ecommerce/user/${websiteId}/${websiteSlug}${suffix}`;

export const listSupportTickets = async (
  websiteId: string,
  websiteSlug: string
) => {
  const response = await fetch(
    buildSupportUrl(websiteId, websiteSlug, "/support/tickets"),
    {
      headers: getAuthHeaders(),
    }
  );

  const data = await handleResponse(response);
  return data?.data || [];
};

export const createSupportTicket = async (
  payload: { subject: string; category: string; message: string },
  websiteId: string,
  websiteSlug: string
) => {
  const response = await fetch(
    buildSupportUrl(websiteId, websiteSlug, "/support/ticket"),
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    }
  );

  const data = await handleResponse(response);
  return data?.data;
};
