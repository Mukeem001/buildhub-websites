import { AlertTriangle } from "lucide-react";

interface DeleteTemplateDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  templateName?: string;
}

const DeleteTemplateDialog = ({
  open,
  onClose,
  onConfirm,
  templateName,
}: DeleteTemplateDialogProps) => {
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

          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10">
            <AlertTriangle className="h-10 w-10 text-red-500" />
          </div>

          <h2 className="text-center text-2xl font-bold text-white">
            Delete Template
          </h2>

          <p className="mt-4 text-center leading-7 text-zinc-400">
            Are you sure you want to delete <span className="font-semibold text-white">{templateName || "this template"}</span>?
            <br />
            This action cannot be undone.
          </p>

        </div>

        <div className="flex gap-3 border-t border-zinc-800 p-6">

          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-zinc-700 py-3 font-medium text-zinc-300 transition hover:border-zinc-500"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-500"
          >
            Delete
          </button>

        </div>

      </div>
    </>
  );
};

export default DeleteTemplateDialog;