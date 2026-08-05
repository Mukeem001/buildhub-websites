import { useEffect, useState, type FormEvent } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import type { Website } from "@/utils/websiteActions";

interface CreateWebsiteModalProps {
  open: boolean;
  onClose: () => void;
  mode?: "create" | "edit";
  website?: Website | null;
  onCreateWebsite?: (data: WebsiteFormValues) => void;
  onUpdateWebsite?: (
    id: string | number,
    data: WebsiteFormValues
  ) => void;
}

export interface WebsiteFormValues {
  name: string;
  domain: string;
  owner: string;
  template: string;
  plan: string;
  status: string;
  storage: string;
  visitors: string;
}

const initialForm: WebsiteFormValues = {
  name: "",
  domain: "",
  owner: "",
  template: "",
  plan: "Free",
  status: "Draft",
  storage: "",
  visitors: "",
};

const CreateWebsiteModal = ({
  open,
  onClose,
  mode = "create",
  website,
  onCreateWebsite,
  onUpdateWebsite,
}: CreateWebsiteModalProps) => {
  const [formData, setFormData] = useState<WebsiteFormValues>(initialForm);

  useEffect(() => {
    if (!open) {
      setFormData(initialForm);
      return;
    }

    if (mode === "edit" && website) {
      setFormData({
        name: website.name,
        domain: website.domain,
        owner: website.owner,
        template: website.template,
        plan: website.plan,
        status: website.status,
        storage: website.storage,
        visitors: String(website.visitors || 0),
      });
      return;
    }

    setFormData(initialForm);
  }, [open, mode, website]);

  if (!open) return null;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = formData.name.trim();
    const domain = formData.domain.trim();
    const owner = formData.owner.trim();
    const template = formData.template.trim();

    if (!name || !domain || !owner || !template) {
      toast.error("Please fill in name, domain, owner, and template.");
      return;
    }

    const payload = {
      ...formData,
      name,
      domain,
      owner,
      template,
      storage: formData.storage.trim() || "0 GB",
      visitors: formData.visitors.trim() || "0",
    };

    if (mode === "edit" && website) {
      onUpdateWebsite?.(website.id, payload);
      return;
    }

    onCreateWebsite?.(payload);
  };

  const updateField = (field: keyof WebsiteFormValues, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 z-50 w-[95%] max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-zinc-800 bg-zinc-950 shadow-2xl">
        <form onSubmit={handleSubmit}>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-800 p-6">
            <h2 className="text-2xl font-bold text-white">
              {mode === "create"
                ? "Create Website"
                : "Edit Website"}
            </h2>

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 hover:bg-zinc-800"
            >
              <X className="h-5 w-5 text-zinc-400" />
            </button>
          </div>

          {/* Form */}
          <div className="grid gap-5 p-6 md:grid-cols-2">
            <Input
              label="Website Name"
              value={formData.name}
              onChange={(value) => updateField("name", value)}
            />

            <Input
              label="Domain"
              value={formData.domain}
              onChange={(value) => updateField("domain", value)}
              placeholder="example.com"
            />

            <Input
              label="Owner Name"
              value={formData.owner}
              onChange={(value) => updateField("owner", value)}
            />

            <Input
              label="Template"
              value={formData.template}
              onChange={(value) => updateField("template", value)}
            />

            <Select
              label="Plan"
              value={formData.plan}
              onChange={(value) => updateField("plan", value)}
              options={["Free", "Pro", "Business", "Enterprise"]}
            />

            <Select
              label="Status"
              value={formData.status}
              onChange={(value) => updateField("status", value)}
              options={["Published", "Draft", "Maintenance"]}
            />

            <Input
              label="Storage"
              value={formData.storage}
              onChange={(value) => updateField("storage", value)}
              placeholder="e.g. 10 GB"
            />

            <Input
              label="Visitors"
              type="number"
              value={formData.visitors}
              onChange={(value) => updateField("visitors", value)}
              placeholder="0"
            />
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t border-zinc-800 p-6">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-zinc-700 px-5 py-3 text-zinc-300 hover:border-blue-500"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-500"
            >
              {mode === "create"
                ? "Create Website"
                : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

interface InputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
}: InputProps) {
  return (
    <div>
      <label className="mb-2 block text-sm text-zinc-400">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-blue-500"
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
      <label className="mb-2 block text-sm text-zinc-400">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-blue-500"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CreateWebsiteModal;