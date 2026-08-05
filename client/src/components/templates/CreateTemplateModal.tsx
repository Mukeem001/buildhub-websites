import { useState } from "react";
import { Sparkles, X, UploadCloud } from "lucide-react";

interface CreateTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (payload: {
    name: string;
    category: string;
    description: string;
    price: number;
    premium: boolean;
    thumbnail?: string;
    previewUrl?: string;
  }) => Promise<void>;
}

const DEFAULT_CATEGORIES = [
  "Business",
  "Ecommerce",
  "Portfolio",
  "Restaurant",
  "Hospital",
  "Blog",
  "Agency",
];

const CreateTemplateModal = ({
  isOpen,
  onClose,
  onCreate,
}: CreateTemplateModalProps) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Business");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [premium, setPremium] = useState(false);
  const [thumbnail, setThumbnail] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [saving, setSaving] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter a template name.");
      return;
    }

    setSaving(true);

    try {
      await onCreate({
        name: name.trim(),
        category,
        description: description.trim(),
        price,
        premium,
        thumbnail: thumbnail.trim(),
        previewUrl: previewUrl.trim(),
      });
      onClose();
    } catch (error: any) {
      alert(error?.message || "Unable to create template.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              <Sparkles size={14} className="inline-block" /> New Template
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white">Create a Template</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-300 transition hover:border-slate-500 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-300">
              Name
              <input
                className="h-12 w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 text-sm text-white outline-none transition focus:border-blue-500/70"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Template name"
              />
            </label>

            <label className="space-y-2 text-sm text-slate-300">
              Category
              <select
                className="h-12 w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 text-sm text-white outline-none transition focus:border-blue-500/70"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {DEFAULT_CATEGORIES.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="space-y-2 text-sm text-slate-300">
            Description
            <textarea
              rows={4}
              className="w-full resize-none rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500/70"
              placeholder="Describe your template features and use case"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-300">
              Price
              <input
                type="number"
                min={0}
                className="h-12 w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 text-sm text-white outline-none transition focus:border-blue-500/70"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </label>

            <label className="flex items-center gap-3 text-sm text-slate-300">
              <input
                type="checkbox"
                checked={premium}
                onChange={(e) => setPremium(e.target.checked)}
                className="h-5 w-5 rounded border-slate-600 bg-slate-900 accent-blue-500"
              />
              Premium template
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-300">
              Thumbnail URL
              <input
                className="h-12 w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 text-sm text-white outline-none transition focus:border-blue-500/70"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                placeholder="https://..."
              />
            </label>
            <label className="space-y-2 text-sm text-slate-300">
              Preview URL
              <input
                className="h-12 w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 text-sm text-white outline-none transition focus:border-blue-500/70"
                value={previewUrl}
                onChange={(e) => setPreviewUrl(e.target.value)}
                placeholder="https://..."
              />
            </label>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-slate-800 bg-slate-900 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-slate-500 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <UploadCloud size={18} />
              {saving ? "Saving..." : "Create Template"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTemplateModal;
