import { AlertTriangle, Trash2, X } from "lucide-react";

interface DeleteConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmDialog = ({
  open,
  onClose,
  onConfirm,
}: DeleteConfirmDialogProps) => {
  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="fixed left-1/2 top-1/2 z-50 w-[92%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 p-5">

          <div className="flex items-center gap-3">
            <div className="rounded-full bg-red-500/20 p-3">
              <AlertTriangle className="h-6 w-6 text-red-500" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white">
                Delete User
              </h2>

              <p className="text-sm text-zinc-400">
                This action cannot be undone.
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

        {/* Body */}
        <div className="p-6">

          <p className="leading-7 text-zinc-300">
            Are you sure you want to permanently delete this user?
          </p>

        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-zinc-800 p-5">

          <button
            onClick={onClose}
            className="rounded-xl border border-zinc-700 px-5 py-3 text-zinc-300 hover:border-blue-500"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-500"
          >
            <Trash2 className="h-4 w-4" />
            Delete User
          </button>

        </div>

      </div>
    </>
  );
};

export default DeleteConfirmDialog;