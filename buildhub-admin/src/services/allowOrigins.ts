import api from "./api";

export interface AllowOriginPayload {
  _id: string;
  origin: string;
  createdAt: string;
}

export const getAllowOrigins = async (): Promise<AllowOriginPayload[]> => {
  const res = await api.get("/api/admin/allow-origins");
  return res.data.data as AllowOriginPayload[];
};

export const createAllowOrigin = async (origin: string): Promise<AllowOriginPayload> => {
  const res = await api.post("/api/admin/allow-origins", { origin });
  return res.data.data as AllowOriginPayload;
};

export const deleteAllowOrigin = async (id: string): Promise<void> => {
  await api.delete(`/api/admin/allow-origins/${id}`);
};
