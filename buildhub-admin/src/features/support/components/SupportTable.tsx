import {
  Eye,
  Pencil,
  MessageSquare,
  Trash2,
} from "lucide-react";

import { Ticket } from "../types/ticket";

interface SupportTableProps {
  tickets: Ticket[];

  selectedIds: number[];

  setSelectedIds: React.Dispatch<
    React.SetStateAction<number[]>
  >;

  onView: (ticket: Ticket) => void;

  onEdit: (ticket: Ticket) => void;

  onReply: (ticket: Ticket) => void;

  onDelete: (ticket: Ticket) => void;
}

const SupportTable = ({
  tickets,
  selectedIds,
  setSelectedIds,
  onView,
  onEdit,
  onReply,
  onDelete,
}: SupportTableProps) => {
  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === tickets.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(tickets.map((t) => t.id));
    }
  };

  const statusBadge = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-blue-500/10 text-blue-400";

      case "Pending":
        return "bg-yellow-500/10 text-yellow-400";

      case "Resolved":
        return "bg-emerald-500/10 text-emerald-400";

      case "Closed":
        return "bg-red-500/10 text-red-400";

      default:
        return "bg-zinc-700 text-white";
    }
  };

  const priorityBadge = (priority: string) => {
    switch (priority) {
      case "Urgent":
        return "bg-red-500/10 text-red-400";

      case "High":
        return "bg-orange-500/10 text-orange-400";

      case "Medium":
        return "bg-yellow-500/10 text-yellow-400";

      case "Low":
        return "bg-green-500/10 text-green-400";

      default:
        return "bg-zinc-700 text-white";
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-zinc-950">

            <tr>

              <th className="px-6 py-4">

                <input
                  type="checkbox"
                  checked={
                    tickets.length > 0 &&
                    selectedIds.length === tickets.length
                  }
                  onChange={toggleSelectAll}
                />

              </th>

              <th className="px-6 py-4 text-left text-sm text-zinc-400">
                Ticket
              </th>

              <th className="px-6 py-4 text-left text-sm text-zinc-400">
                Customer
              </th>

              <th className="px-6 py-4 text-left text-sm text-zinc-400">
                Category
              </th>

              <th className="px-6 py-4 text-left text-sm text-zinc-400">
                Priority
              </th>

              <th className="px-6 py-4 text-left text-sm text-zinc-400">
                Status
              </th>

              <th className="px-6 py-4 text-left text-sm text-zinc-400">
                Assigned
              </th>

              <th className="px-6 py-4 text-left text-sm text-zinc-400">
                Updated
              </th>

              <th className="px-6 py-4 text-right text-sm text-zinc-400">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {tickets.map((ticket) => (

              <tr
                key={ticket.id}
                className="border-t border-zinc-800 hover:bg-zinc-800/40 transition"
              >

                <td className="px-6 py-5">

                  <input
                    type="checkbox"
                    checked={selectedIds.includes(ticket.id)}
                    onChange={() => toggleSelect(ticket.id)}
                  />

                </td>

                <td className="px-6 py-5">

                  <div>

                    <div className="font-semibold text-white">
                      #{ticket.id}
                    </div>

                    <div className="mt-1 text-sm text-zinc-400">
                      {ticket.subject}
                    </div>

                  </div>

                </td>

                <td className="px-6 py-5">

                  <div>

                    <div className="font-medium text-white">
                      {ticket.customer}
                    </div>

                    <div className="text-sm text-zinc-400">
                      {ticket.email}
                    </div>

                  </div>

                </td>

                <td className="px-6 py-5">

                  <span className="rounded-full bg-zinc-800 px-3 py-1 text-sm text-white">
                    {ticket.category}
                  </span>

                </td>

                <td className="px-6 py-5">

                  <span
                    className={`rounded-full px-3 py-1 text-sm ${priorityBadge(
                      ticket.priority
                    )}`}
                  >
                    {ticket.priority}
                  </span>

                </td>

                <td className="px-6 py-5">

                  <span
                    className={`rounded-full px-3 py-1 text-sm ${statusBadge(
                      ticket.status
                    )}`}
                  >
                    {ticket.status}
                  </span>

                </td>

                <td className="px-6 py-5 text-zinc-300">
                  {ticket.assignedTo}
                </td>

                <td className="px-6 py-5 text-zinc-400">
                  {ticket.updatedAt}
                </td>

                <td className="px-6 py-5">

                  <div className="flex justify-end gap-2">

                    <button
                      onClick={() => onView(ticket)}
                      className="rounded-lg p-2 hover:bg-zinc-800"
                    >
                      <Eye
                        size={18}
                        className="text-cyan-400"
                      />
                    </button>

                    <button
                      onClick={() => onEdit(ticket)}
                      className="rounded-lg p-2 hover:bg-zinc-800"
                    >
                      <Pencil
                        size={18}
                        className="text-yellow-400"
                      />
                    </button>

                    <button
                      onClick={() => onReply(ticket)}
                      className="rounded-lg p-2 hover:bg-zinc-800"
                    >
                      <MessageSquare
                        size={18}
                        className="text-green-400"
                      />
                    </button>

                    <button
                      onClick={() => onDelete(ticket)}
                      className="rounded-lg p-2 hover:bg-red-500/10"
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

export default SupportTable;