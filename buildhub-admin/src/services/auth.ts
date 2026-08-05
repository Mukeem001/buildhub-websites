import api from "./api";

export interface AuthPayload {
  token: string;
  user: {
    id: string;
    fullName: string;
    email: string;
    phone?: string;
    role: string;
  };
}

export const login = async (email: string, password: string) => {
  const response = await api.post("/api/auth/login", { email, password });
  return response.data.data as AuthPayload;
};

export const signup = async (payload: any) => {
  const response = await api.post("/api/auth/signup", payload);
  return response.data.data as AuthPayload;
};

export const logout = async () => {
  const response = await api.post("/api/auth/logout");
  return response.data;
};

export const me = async () => {
  const response = await api.get("/api/auth/me");
  return response.data.data as AuthPayload["user"];
};
