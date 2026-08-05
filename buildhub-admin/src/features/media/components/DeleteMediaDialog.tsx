import { AlertTriangle } from "lucide-react";

interface DeleteMediaDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteMediaDialog = ({
  open,
  onClose,
  onConfirm,
}: DeleteMediaDialogProps) => {
  if (!open) return null;

  return (
    <>
      {/* Backdrop */}

      <div
        className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}

      <div className="fixed left-1/2 top-1/2 z-50 w-[95%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-zinc-800 bg-zinc-950 shadow-2xl">

        <div className="p-8">

          {/* Icon */}

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10">

            <AlertTriangle className="h-10 w-10 text-red-500" />

          </div>

          {/* Title */}

          <h2 className="mt-6 text-center text-2xl font-bold text-white">
            Delete Media
          </h2>

          <p className="mt-3 text-center text-zinc-400">
            Are you sure you want to permanently delete this media file?
          </p>

          <p className="mt-2 text-center text-sm text-red-400">
            This action cannot be undone.
          </p>

          {/* Buttons */}

          <div className="mt-8 flex gap-3">

            <button
              onClick={onClose}
              className="flex-1 rounded-xl border border-zinc-700 px-5 py-3 text-zinc-300 transition hover:border-zinc-500 hover:bg-zinc-900"
            >
              Cancel
            </button>

            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="flex-1 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-500"
            >
              Delete
            </button>

          </div>

        </div>

      </div>
    </>
  );
};

export default DeleteMediaDialog;