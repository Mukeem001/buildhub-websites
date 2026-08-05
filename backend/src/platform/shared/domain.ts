export const validateDomain = (domain: string): string | null => {
  const normalized = domain
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/\/$/, "");

  if (!normalized) {
    return null;
  }

  const isValid = /^[a-z0-9.-]+\.[a-z]{2,}$/i.test(normalized);

  return isValid ? normalized : null;
};

export const getSubdomainFromTitle = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || "site";
};
