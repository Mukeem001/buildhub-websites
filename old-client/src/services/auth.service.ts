export interface User {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  role?: string;
  token?: string;
}

const SESSION_KEY = "buildhub_session";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const handleResponse = async (response: Response) => {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "Request failed");
  }

  return data;
};

export const registerUser = async (payload: {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
}) => {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await handleResponse(response);

  const user: User = {
    id: data?.data?.user?.id,
    fullName: data?.data?.user?.fullName,
    email: data?.data?.user?.email,
    phone: data?.data?.user?.phone,
    role: data?.data?.user?.role,
    token: data?.data?.token,
  };

  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("auth:session-changed"));
  }
  return user;
};

export const loginUser = async (payload: {
  email: string;
  password: string;
}) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await handleResponse(response);

  const user: User = {
    id: data?.data?.user?.id,
    fullName: data?.data?.user?.fullName,
    email: data?.data?.user?.email,
    phone: data?.data?.user?.phone,
    role: data?.data?.user?.role,
    token: data?.data?.token,
  };

  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("auth:session-changed"));
  }
  return user;
};

export const forgotPassword = async (email: string) => {
  const response = await fetch(`${API_URL}/auth/send-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  return handleResponse(response);
};

export const getCurrentUser = (): User | null => {
  const data = localStorage.getItem(SESSION_KEY);
  return data ? JSON.parse(data) : null;
};

export const logoutUser = () => {
  localStorage.removeItem(SESSION_KEY);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("auth:session-changed"));
  }
};

export const invalidateSession = (reason?: string) => {
  logoutUser();

  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("auth:session-invalidated", { detail: { reason } }));
    window.localStorage.setItem("buildhub_session_invalidated", JSON.stringify({ reason, timestamp: Date.now() }));
  }
};