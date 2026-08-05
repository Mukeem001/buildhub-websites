import { X, LayoutTemplate, Download, User, Tag } from "lucide-react";

import type { Template } from "../types/template";

interface TemplateDrawerProps {
  open: boolean;
  onClose: () => void;
  template: Template | null;
}

const TemplateDrawer = ({
  open,
  onClose,
  template,
}: TemplateDrawerProps) => {
  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 z-50 h-screen w-full max-w-xl overflow-y-auto border-l border-zinc-800 bg-zinc-950 shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 p-6">

          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-violet-600/20 p-3">
              <LayoutTemplate className="h-6 w-6 text-violet-400" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">
                Template Details
              </h2>

              <p className="text-sm text-zinc-400">
                View template information
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-zinc-800"
          >
            <X className="h-5 w-5 text-zinc-400" />
          </button>

        </div>

        {/* Content */}
        <div className="space-y-6 p-6">

          <div className="flex justify-center">
            <div className="flex h-40 w-40 items-center justify-center rounded-2xl bg-violet-600/20">
              <LayoutTemplate className="h-20 w-20 text-violet-400" />
            </div>
          </div>

          <InfoRow
            icon={<Tag size={18} />}
            label="Template Name"
            value={template?.name || "-"}
          />

          <InfoRow
            icon={<User size={18} />}
            label="Author"
            value={template?.author || "-"}
          />

          <InfoRow
            icon={<Tag size={18} />}
            label="Category"
            value={template?.category || "-"}
          />

          <InfoRow
            icon={<Download size={18} />}
            label="Downloads"
            value={template?.downloads?.toLocaleString() || "0"}
          />

          <InfoRow
            icon={<Tag size={18} />}
            label="Status"
            value={template?.status || "Draft"}
          />

          <InfoRow
            icon={<Tag size={18} />}
            label="Price"
            value={template?.price === 0 ? "Free" : `₹${template?.price?.toLocaleString()}`}
          />

        </div>

        {/* Footer */}
        <div className="border-t border-zinc-800 p-6">
          <button
            onClick={onClose}
            className="w-full rounded-xl bg-violet-600 py-3 font-semibold text-white hover:bg-violet-500"
          >
            Close
          </button>
        </div>

      </div>
    </>
  );
};

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function InfoRow({
  icon,
  label,
  value,
}: InfoRowProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 p-4">

      <div className="flex items-center gap-3 text-zinc-400">
        {icon}
        <span>{label}</span>
      </div>

      <span className="font-semibold text-white">
        {value}
      </span>

    </div>
  );
}

export default TemplateDrawer;