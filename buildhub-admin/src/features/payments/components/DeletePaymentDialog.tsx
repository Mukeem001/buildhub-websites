import {
  AlertTriangle,
  X,
} from "lucide-react";

interface DeletePaymentDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeletePaymentDialog = ({
  open,
  onClose,
  onConfirm,
}: DeletePaymentDialogProps) => {
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

        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 p-6">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-red-500/10 p-3">
              <AlertTriangle className="h-6 w-6 text-red-500" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">
                Delete Payment
              </h2>

              <p className="text-sm text-zinc-400">
                This action cannot be undone.
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

        {/* Body */}
        <div className="p-6">

          <p className="leading-7 text-zinc-300">
            Are you sure you want to permanently delete this payment?
            This will remove all related transaction records.
          </p>

        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-zinc-800 p-6">

          <button
            onClick={onClose}
            className="rounded-xl border border-zinc-700 px-5 py-3 text-zinc-300 transition hover:border-emerald-500"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-500"
          >
            Delete Payment
          </button>

        </div>

      </div>
    </>
  );
};

export default DeletePaymentDialog;