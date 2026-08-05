import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";

import type { Template } from "../types/template";

interface CreateTemplateModalProps {
  open: boolean;
  onClose: () => void;
  mode?: "create" | "edit";
  template?: Template | null;
  onSubmit: (payload: any) => Promise<void>;
}

const CreateTemplateModal = ({
  open,
  onClose,
  mode = "create",
  template,
  onSubmit,
}: CreateTemplateModalProps) => {
  const [form, setForm] = useState({
    name: "Modern Ecommerce",
    author: "BuildHub",
    category: "Ecommerce",
    price: "999",
    thumbnail: "",
    status: "Published",
    downloads: "1203567868",
    description: "Modern Ecommerce template...",
    slug: "ecommerce",
    previewUrl: "https://enyowebservices.com/",
    rating: "4.9",
    premium: "true",
  });

  useEffect(() => {
    if (template) {
      setForm({
        name: template.name,
        author: template.author,
        category: template.category,
        price: String(template.price ?? 0),
        thumbnail: template.image,
        status: template.status,
        downloads: String(template.downloads ?? 0),
        description: template.description,
        slug: template.slug || template.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
        previewUrl: template.previewUrl || "",
        rating: String(template.rating ?? 4.8),
        premium: template.premium ? "true" : "false",
      });
    } else {
      setForm({
        name: "Modern Ecommerce",
        author: "BuildHub",
        category: "Ecommerce",
        price: "999",
        thumbnail: "",
        status: "Published",
        downloads: "1203567868",
        description: "Modern Ecommerce template...",
        slug: "ecommerce",
        previewUrl: "https://enyowebservices.com/",
        rating: "4.9",
        premium: "true",
      });
    }
  }, [template, open]);

  if (!open) return null;

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      toast.error("Template name is required.");
      return;
    }

    await onSubmit({
      name: form.name.trim(),
      slug: form.slug.trim() || form.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      description: form.description.trim(),
      category: form.category.trim() || "General",
      author: form.author.trim() || "BuildHub",
      price: Number(form.price) || 0,
      downloads: Number(form.downloads) || 0,
      thumbnail: form.thumbnail.trim(),
      previewUrl: form.previewUrl.trim(),
      premium: form.premium === "true",
      rating: Number(form.rating) || 4.8,
      isActive: form.status === "Published",
    });
  };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed left-1/2 top-1/2 z-50 w-[95%] max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-zinc-800 bg-zinc-950 shadow-2xl">
        <div className="flex items-center justify-between border-b border-zinc-800 p-6">
          <h2 className="text-2xl font-bold text-white">
            {mode === "create" ? "Create Template" : "Edit Template"}
          </h2>
          <button onClick={onClose} className="rounded-lg p-2 hover:bg-zinc-800">
            <X className="h-5 w-5 text-zinc-400" />
          </button>
        </div>

        <div className="grid gap-5 p-6 md:grid-cols-2">
          <Input label="Template Name" value={form.name} onChange={(value) => handleChange("name", value)} />
          <Input label="Slug" value={form.slug} onChange={(value) => handleChange("slug", value)} />
          <Input label="Author" value={form.author} onChange={(value) => handleChange("author", value)} />
          <Input label="Category" value={form.category} onChange={(value) => handleChange("category", value)} />
          <Input label="Price" type="number" value={form.price} onChange={(value) => handleChange("price", value)} />
          <Input label="Downloads" type="number" value={form.downloads} onChange={(value) => handleChange("downloads", value)} />
          <Input label="Rating" type="number" value={form.rating} onChange={(value) => handleChange("rating", value)} />
          <Select label="Premium" options={["true", "false"]} value={form.premium} onChange={(value) => handleChange("premium", value)} />
          <Input label="Thumbnail URL" value={form.thumbnail} onChange={(value) => handleChange("thumbnail", value)} />
          <Input label="Preview URL" value={form.previewUrl} onChange={(value) => handleChange("previewUrl", value)} />
          <Select label="Status" options={["Published", "Draft"]} value={form.status} onChange={(value) => handleChange("status", value)} />
          <Input label="Description" value={form.description} onChange={(value) => handleChange("description", value)} />
        </div>

        <div className="flex justify-end gap-3 border-t border-zinc-800 p-6">
          <button onClick={onClose} className="rounded-xl border border-zinc-700 px-5 py-3 text-zinc-300 hover:border-violet-500">
            Cancel
          </button>
          <button onClick={handleSubmit} className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-500">
            {mode === "create" ? "Create Template" : "Save Changes"}
          </button>
        </div>
      </div>
    </>
  );
};

interface InputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
}

function Input({ label, type = "text", value, onChange }: InputProps) {
  return (
    <div>
      <label className="mb-2 block text-sm text-zinc-400">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-violet-500"
      />
    </div>
  );
}

interface SelectProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

function Select({ label, options, value, onChange }: SelectProps) {
  return (
    <div>
      <label className="mb-2 block text-sm text-zinc-400">{label}</label>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-violet-500">
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

export default CreateTemplateModal;
