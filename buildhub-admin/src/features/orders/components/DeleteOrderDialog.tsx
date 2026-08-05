import { AlertTriangle } from "lucide-react";

interface DeleteOrderDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteOrderDialog = ({
  open,
  onClose,
  onConfirm,
}: DeleteOrderDialogProps) => {
  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="fixed left-1/2 top-1/2 z-50 w-[95%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-zinc-800 bg-zinc-950 shadow-2xl">

        <div className="flex flex-col items-center p-8 text-center">

          <div className="mb-6 rounded-full bg-red-500/10 p-5">
            <AlertTriangle className="h-10 w-10 text-red-500" />
          </div>

          <h2 className="text-2xl font-bold text-white">
            Delete Order
          </h2>

          <p className="mt-3 text-zinc-400">
            Are you sure you want to delete this order?
            <br />
            This action cannot be undone.
          </p>

          <div className="mt-8 flex w-full gap-3">

            <button
              onClick={onClose}
              className="flex-1 rounded-xl border border-zinc-700 py-3 text-zinc-300 transition hover:border-violet-500"
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

      </div>
    </>
  );
};

export default DeleteOrderDialog;