import api from "./api";

export interface DomainPayload {
  _id: string;
  websiteId: string | { _id: string; name?: string };
  domain: string;
  hostname: string;
  type: string;
  cnameHost?: string;
  cnameTarget?: string;
  verificationStatus: string;
  sslStatus: string;
  sslError?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const connectDomain = async (payload: any) => {
  const response = await api.post("/api/domain/connect", payload);
  return response.data.data as DomainPayload;
};

export const verifyDomain = async (websiteId: string) => {
  const response = await api.post(`/api/domain/verify/${websiteId}`);
  return response.data.data as DomainPayload;
};

export const getDomain = async (websiteId: string) => {
  const response = await api.get(`/api/domain/${websiteId}`);
  return response.data.data as DomainPayload;
};

export const getDomains = async () => {
  const response = await api.get("/api/domain");
  return response.data.data as DomainPayload[];
};

export const removeDomain = async (websiteId: string) => {
  const response = await api.delete(`/api/domain/${websiteId}`);
  return response.data;
};

export const issueSsl = async (websiteId: string) => {
  const response = await api.post(`/api/domain/ssl/${websiteId}`);
  return response.data.data as DomainPayload;
};
