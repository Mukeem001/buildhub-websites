import {
  X,
  Bell,
  User,
  Calendar,
  Flag,
  Tag,
  FileText,
  Pencil,
} from "lucide-react";

import { Notification } from "../types/notification";

interface NotificationDrawerProps {
  open: boolean;
  notification: Notification | null;

  onClose: () => void;
  onEdit: (notification: Notification) => void;
}

const NotificationDrawer = ({
  open,
  notification,
  onClose,
  onEdit,
}: NotificationDrawerProps) => {
  if (!open || !notification) return null;

  const badgeColor = (value: string) => {
    switch (value) {
      case "High":
        return "bg-red-500/10 text-red-400";

      case "Medium":
        return "bg-orange-500/10 text-orange-400";

      case "Low":
        return "bg-green-500/10 text-green-400";

      case "Unread":
        return "bg-yellow-500/10 text-yellow-400";

      case "Read":
        return "bg-emerald-500/10 text-emerald-400";

      case "Scheduled":
        return "bg-blue-500/10 text-blue-400";

      default:
        return "bg-zinc-700 text-white";
    }
  };

  return (
    <>
      {/* Overlay */}

      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
      />

      {/* Drawer */}

      <div className="fixed right-0 top-0 z-50 h-screen w-full max-w-lg overflow-y-auto border-l border-zinc-800 bg-zinc-950 shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-zinc-800 p-6">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-yellow-500/10 p-3">

              <Bell className="h-6 w-6 text-yellow-400" />

            </div>

            <div>

              <h2 className="text-xl font-bold text-white">
                Notification Details
              </h2>

              <p className="text-sm text-zinc-400">
                Notification ID #{notification.id}
              </p>

            </div>

          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 transition hover:bg-zinc-800"
          >
            <X className="h-5 w-5 text-zinc-400" />
          </button>

        </div>

        {/* Content */}

        <div className="space-y-6 p-6">

          <div>

            <label className="mb-2 flex items-center gap-2 text-sm text-zinc-500">

              <FileText size={16} />

              Title

            </label>

            <p className="rounded-xl bg-zinc-900 p-4 text-white">
              {notification.title}
            </p>

          </div>

          <div>

            <label className="mb-2 flex items-center gap-2 text-sm text-zinc-500">

              <Bell size={16} />

              Message

            </label>

            <div className="rounded-xl bg-zinc-900 p-4 leading-7 text-zinc-300">
              {notification.message}
            </div>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <div>

              <label className="mb-2 flex items-center gap-2 text-sm text-zinc-500">

                <User size={16} />

                Recipient

              </label>

              <div className="rounded-xl bg-zinc-900 p-4 text-white">
                {notification.recipient}
              </div>

            </div>

            <div>

              <label className="mb-2 flex items-center gap-2 text-sm text-zinc-500">

                <Tag size={16} />

                Type

              </label>

              <div className="rounded-xl bg-zinc-900 p-4 text-white">
                {notification.type}
              </div>

            </div>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <div>

              <label className="mb-2 flex items-center gap-2 text-sm text-zinc-500">

                <Flag size={16} />

                Priority

              </label>

              <span
                className={`inline-flex rounded-full px-4 py-2 text-sm font-medium ${badgeColor(
                  notification.priority
                )}`}
              >
                {notification.priority}
              </span>

            </div>

            <div>

              <label className="mb-2 flex items-center gap-2 text-sm text-zinc-500">

                <Bell size={16} />

                Status

              </label>

              <span
                className={`inline-flex rounded-full px-4 py-2 text-sm font-medium ${badgeColor(
                  notification.status
                )}`}
              >
                {notification.status}
              </span>

            </div>

          </div>

          <div>

            <label className="mb-2 flex items-center gap-2 text-sm text-zinc-500">

              <Calendar size={16} />

              Created At

            </label>

            <div className="rounded-xl bg-zinc-900 p-4 text-white">
              {notification.createdAt}
            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="sticky bottom-0 flex gap-3 border-t border-zinc-800 bg-zinc-950 p-6">

          <button
            onClick={() => onEdit(notification)}
            className="flex-1 rounded-xl bg-yellow-500 py-3 font-semibold text-black transition hover:bg-yellow-400"
          >
            <span className="flex items-center justify-center gap-2">
              <Pencil size={18} />
              Edit Notification
            </span>
          </button>

          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-zinc-700 py-3 font-semibold text-white transition hover:bg-zinc-800"
          >
            Close
          </button>

        </div>

      </div>
    </>
  );
};

export default NotificationDrawer;