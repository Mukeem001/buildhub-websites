import { getCurrentUser } from "./auth.service";

import { API_URL } from "./api.config";

export const fetchTemplates = async () => {
  const response = await fetch(`${API_URL}/templates`);
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "Failed to fetch templates");
  }

  const templates = Array.isArray(data?.data) ? data.data : [];

  return templates.map((template: any) => ({
    id: template._id || template.id,
    slug: template.slug || "template",
    title: template.name || template.title || "Untitled Template",
    name: template.name || template.title || "Untitled Template",
    category: template.category || "General",
    image:
      template.thumbnail ||
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
    premium: Boolean(template.premium),
    rating: Number(template.rating) || 4.8,
    downloads: Number(template.downloads) || 0,
    price: Number(template.price) || 0,
    previewUrl: template.previewUrl || "",
    description: template.description || "Responsive template from BuildHub.",
    isActive: Boolean(template.isActive),
    tags: Array.isArray(template.tags) ? template.tags : [],
  }));
};

export const createTemplate = async (payload: any) => {
  const user = getCurrentUser();

  const response = await fetch(`${API_URL}/templates`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(user?.token ? { Authorization: `Bearer ${user.token}` } : {}),
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "Failed to create template");
  }

  return data?.data;
};
