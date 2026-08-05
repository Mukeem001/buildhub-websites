import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import { Notification } from "../types/notification";

interface NotificationsTableProps {
  notifications: Notification[];

  selectedIds: number[];

  setSelectedIds: React.Dispatch<
    React.SetStateAction<number[]>
  >;

  onView: (notification: Notification) => void;

  onEdit: (notification: Notification) => void;

  onDelete: (notification: Notification) => void;
}

const NotificationsTable = ({
  notifications,
  selectedIds,
  setSelectedIds,
  onView,
  onEdit,
  onDelete,
}: NotificationsTableProps) => {
  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === notifications.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(
        notifications.map((item) => item.id)
      );
    }
  };

  const badgeClass = (
    value: string,
    type: "status" | "priority"
  ) => {
    if (type === "status") {
      switch (value) {
        case "Read":
          return "bg-green-500/10 text-green-400";

        case "Unread":
          return "bg-yellow-500/10 text-yellow-400";

        case "Scheduled":
          return "bg-blue-500/10 text-blue-400";

        default:
          return "bg-zinc-700 text-white";
      }
    }

    switch (value) {
      case "High":
        return "bg-red-500/10 text-red-400";

      case "Medium":
        return "bg-orange-500/10 text-orange-400";

      case "Low":
        return "bg-green-500/10 text-green-400";

      default:
        return "bg-zinc-700 text-white";
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-zinc-950">

            <tr>

              <th className="px-6 py-4">

                <input
                  type="checkbox"
                  checked={
                    notifications.length > 0 &&
                    selectedIds.length ===
                      notifications.length
                  }
                  onChange={toggleSelectAll}
                  className="h-4 w-4"
                />

              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-400">
                Notification
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-400">
                Recipient
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-400">
                Type
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-400">
                Priority
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-400">
                Status
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-400">
                Date
              </th>

              <th className="px-6 py-4 text-right text-sm font-semibold text-zinc-400">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {notifications.map((notification) => (

              <tr
                key={notification.id}
                className="border-t border-zinc-800 transition hover:bg-zinc-800/40"
              >

                <td className="px-6 py-4">

                  <input
                    type="checkbox"
                    checked={selectedIds.includes(
                      notification.id
                    )}
                    onChange={() =>
                      toggleSelect(notification.id)
                    }
                    className="h-4 w-4"
                  />

                </td>

                <td className="px-6 py-4">

                  <div>

                    <h3 className="font-semibold text-white">
                      {notification.title}
                    </h3>

                    <p className="mt-1 max-w-sm truncate text-sm text-zinc-400">
                      {notification.message}
                    </p>

                  </div>

                </td>

                <td className="px-6 py-4 text-zinc-300">
                  {notification.recipient}
                </td>

                <td className="px-6 py-4">

                  <span className="rounded-full bg-zinc-800 px-3 py-1 text-sm text-white">
                    {notification.type}
                  </span>

                </td>

                <td className="px-6 py-4">

                  <span
                    className={`rounded-full px-3 py-1 text-sm ${badgeClass(
                      notification.priority,
                      "priority"
                    )}`}
                  >
                    {notification.priority}
                  </span>

                </td>

                <td className="px-6 py-4">

                  <span
                    className={`rounded-full px-3 py-1 text-sm ${badgeClass(
                      notification.status,
                      "status"
                    )}`}
                  >
                    {notification.status}
                  </span>

                </td>

                <td className="px-6 py-4 text-zinc-400">
                  {notification.createdAt}
                </td>

                <td className="px-6 py-4">

                  <div className="flex justify-end gap-2">

                    <button
                      onClick={() =>
                        onView(notification)
                      }
                      className="rounded-lg p-2 transition hover:bg-zinc-800"
                    >
                      <Eye
                        size={18}
                        className="text-cyan-400"
                      />
                    </button>

                    <button
                      onClick={() =>
                        onEdit(notification)
                      }
                      className="rounded-lg p-2 transition hover:bg-zinc-800"
                    >
                      <Pencil
                        size={18}
                        className="text-yellow-400"
                      />
                    </button>

                    <button
                      onClick={() =>
                        onDelete(notification)
                      }
                      className="rounded-lg p-2 transition hover:bg-red-500/10"
                    >
                      <Trash2
                        size={18}
                        className="text-red-400"
                      />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default NotificationsTable;