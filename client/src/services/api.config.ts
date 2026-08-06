const getDefaultApiUrl = (): string => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  if (typeof window === "undefined") {
    return "http://2.28.13.238:5000/api";
  }

  const protocol = window.location.protocol;
  const hostname = window.location.hostname;

  return `${protocol}//${hostname}:5000/api`;
};

export const API_URL = getDefaultApiUrl();
