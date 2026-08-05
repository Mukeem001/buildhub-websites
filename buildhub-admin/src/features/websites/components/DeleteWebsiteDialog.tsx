import { AlertTriangle } from "lucide-react";

interface DeleteWebsiteDialogProps {
  open: boolean;
  websiteName?: string;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteWebsiteDialog = ({
  open,
  websiteName,
  onClose,
  onConfirm,
}: DeleteWebsiteDialogProps) => {
  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="fixed left-1/2 top-1/2 z-50 w-[92%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-zinc-800 bg-zinc-950 p-8 shadow-2xl">

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
          <AlertTriangle className="h-8 w-8 text-red-500" />
        </div>

        <h2 className="mt-6 text-center text-2xl font-bold text-white">
          Delete Website?
        </h2>

        <p className="mt-3 text-center text-zinc-400">
          This action cannot be undone.
          {websiteName ? (
            <>
              You are about to delete <span className="font-semibold text-white">{websiteName}</span>.
            </>
          ) : (
            "The website and its data will be permanently deleted."
          )}
        </p>

        <div className="mt-8 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-zinc-700 py-3 text-zinc-300 hover:border-blue-500"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-red-600 py-3 font-semibold text-white hover:bg-red-500"
          >
            Delete Website
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteWebsiteDialog;