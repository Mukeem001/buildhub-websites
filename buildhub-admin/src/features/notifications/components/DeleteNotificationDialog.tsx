import { AlertTriangle, Trash2, X } from "lucide-react";

import { Notification } from "../types/notification";

interface DeleteNotificationDialogProps {
  open: boolean;
  notification: Notification | null;

  onClose: () => void;
  onConfirm: (notification: Notification) => void;
}

const DeleteNotificationDialog = ({
  open,
  notification,
  onClose,
  onConfirm,
}: DeleteNotificationDialogProps) => {
  if (!open || !notification) return null;

  return (
    <>
      {/* Overlay */}

      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
      />

      {/* Dialog */}

      <div className="fixed left-1/2 top-1/2 z-50 w-[95%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl">

        {/* Header */}

        <div className="flex items-center gap-4 border-b border-zinc-800 p-6">

          <div className="rounded-2xl bg-red-500/10 p-4">

            <AlertTriangle className="h-8 w-8 text-red-500" />

          </div>

          <div>

            <h2 className="text-xl font-bold text-white">
              Delete Notification
            </h2>

            <p className="mt-1 text-sm text-zinc-400">
              This action cannot be undone.
            </p>

          </div>

        </div>

        {/* Body */}

        <div className="space-y-5 p-6">

          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">

            <p className="text-zinc-300">
              Are you sure you want to permanently delete this notification?
            </p>

            <div className="mt-5 rounded-lg bg-zinc-900 p-4">

              <h3 className="font-semibold text-white">
                {notification.title}
              </h3>

              <p className="mt-2 text-sm text-zinc-400">
                {notification.message}
              </p>

            </div>

          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">

            <div className="rounded-xl bg-zinc-900 p-4">

              <p className="text-zinc-500">Recipient</p>

              <p className="mt-1 font-medium text-white">
                {notification.recipient}
              </p>

            </div>

            <div className="rounded-xl bg-zinc-900 p-4">

              <p className="text-zinc-500">Type</p>

              <p className="mt-1 font-medium text-white">
                {notification.type}
              </p>

            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="flex gap-3 border-t border-zinc-800 p-6">

          <button
            onClick={onClose}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-zinc-700 py-3 font-medium text-white transition hover:bg-zinc-800"
          >
            <X size={18} />
            Cancel
          </button>

          <button
            onClick={() => onConfirm(notification)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-500"
          >
            <Trash2 size={18} />
            Delete
          </button>

        </div>

      </div>
    </>
  );
};

export default DeleteNotificationDialog;