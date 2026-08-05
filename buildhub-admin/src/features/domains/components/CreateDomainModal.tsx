import { Globe, X } from "lucide-react";

interface CreateDomainModalProps {
  open: boolean;
  onClose: () => void;
  mode?: "create" | "edit";
}

const CreateDomainModal = ({
  open,
  onClose,
  mode = "create",
}: CreateDomainModalProps) => {
  if (!open) return null;

  return (
    <>
      {/* Backdrop */}

      <div
        className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}

      <div className="fixed left-1/2 top-1/2 z-50 w-[95%] max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-zinc-800 bg-zinc-950 shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-zinc-800 p-6">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-cyan-500/10 p-3">
              <Globe className="h-6 w-6 text-cyan-400" />
            </div>

            <div>

              <h2 className="text-2xl font-bold text-white">
                {mode === "create"
                  ? "Create Domain"
                  : "Edit Domain"}
              </h2>

              <p className="text-sm text-zinc-400">
                Manage your website domain.
              </p>

            </div>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-zinc-800"
          >
            <X className="h-5 w-5 text-zinc-400" />
          </button>

        </div>

        {/* Form */}

        <div className="grid gap-6 p-6 md:grid-cols-2">

          {/* Domain */}

          <div>

            <label className="mb-2 block text-sm text-zinc-400">
              Domain Name
            </label>

            <input
              type="text"
              placeholder="example.com"
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-cyan-500"
            />

          </div>

          {/* Website */}

          <div>

            <label className="mb-2 block text-sm text-zinc-400">
              Website
            </label>

            <input
              type="text"
              placeholder="Website Name"
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-cyan-500"
            />

          </div>

          {/* Owner */}

          <div>

            <label className="mb-2 block text-sm text-zinc-400">
              Owner
            </label>

            <input
              type="text"
              placeholder="Owner Name"
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-cyan-500"
            />

          </div>

          {/* Registrar */}

          <div>

            <label className="mb-2 block text-sm text-zinc-400">
              Registrar
            </label>

            <select className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-cyan-500">

              <option>GoDaddy</option>
              <option>Namecheap</option>
              <option>Cloudflare</option>
              <option>Google Domains</option>

            </select>

          </div>

          {/* SSL */}

          <div>

            <label className="mb-2 block text-sm text-zinc-400">
              SSL Status
            </label>

            <select className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-cyan-500">

              <option>Active</option>
              <option>Expired</option>

            </select>

          </div>

          {/* Status */}

          <div>

            <label className="mb-2 block text-sm text-zinc-400">
              Connection Status
            </label>

            <select className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-cyan-500">

              <option>Connected</option>
              <option>Pending</option>
              <option>Expired</option>

            </select>

          </div>

          {/* Expiry */}

          <div className="md:col-span-2">

            <label className="mb-2 block text-sm text-zinc-400">
              Expiry Date
            </label>

            <input
              type="date"
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-cyan-500"
            />

          </div>

        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t border-zinc-800 p-6">

          <button
            onClick={onClose}
            className="rounded-xl border border-zinc-700 px-6 py-3 text-zinc-300 transition hover:border-cyan-500"
          >
            Cancel
          </button>

          <button className="rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white transition hover:bg-cyan-500">

            {mode === "create"
              ? "Create Domain"
              : "Save Changes"}

          </button>

        </div>

      </div>
    </>
  );
};

export default CreateDomainModal;