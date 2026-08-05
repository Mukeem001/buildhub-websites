const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

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
  }));
};
