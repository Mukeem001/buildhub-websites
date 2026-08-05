import {
  X,
  Ticket,
  User,
  Mail,
  FolderOpen,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  MessageSquare,
  Pencil,
} from "lucide-react";

import { Ticket as TicketType } from "../types/ticket";

interface TicketDrawerProps {
  open: boolean;
  ticket: TicketType | null;

  onClose: () => void;
  onReply: (ticket: TicketType) => void;
  onEdit: (ticket: TicketType) => void;
}

const TicketDrawer = ({
  open,
  ticket,
  onClose,
  onReply,
  onEdit,
}: TicketDrawerProps) => {
  if (!open || !ticket) return null;

  const statusColor = (status: string) => {
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

  const priorityColor = (priority: string) => {
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
    <>
      {/* Overlay */}

      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
      />

      {/* Drawer */}

      <div className="fixed right-0 top-0 z-50 h-screen w-full max-w-xl overflow-y-auto border-l border-zinc-800 bg-zinc-950 shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-zinc-800 p-6">

          <div className="flex items-center gap-4">

            <div className="rounded-xl bg-cyan-500/10 p-3">
              <Ticket className="h-7 w-7 text-cyan-400" />
            </div>

            <div>

              <h2 className="text-2xl font-bold text-white">
                Ticket #{ticket.id}
              </h2>

              <p className="text-sm text-zinc-400">
                Support Ticket Details
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

        <div className="space-y-6 p-6">

          <div className="rounded-xl bg-zinc-900 p-5">

            <h3 className="text-lg font-semibold text-white">
              {ticket.subject}
            </h3>

            <p className="mt-4 leading-7 text-zinc-300">
              {ticket.message}
            </p>

          </div>

          <div className="grid gap-4 md:grid-cols-2">

            <InfoCard
              icon={<User size={18} />}
              label="Customer"
              value={ticket.customer}
            />

            <InfoCard
              icon={<Mail size={18} />}
              label="Email"
              value={ticket.email}
            />

            <InfoCard
              icon={<FolderOpen size={18} />}
              label="Category"
              value={ticket.category}
            />

            <InfoCard
              icon={<User size={18} />}
              label="Assigned To"
              value={ticket.assignedTo}
            />

            <InfoCard
              icon={<Calendar size={18} />}
              label="Created"
              value={ticket.createdAt}
            />

            <InfoCard
              icon={<Calendar size={18} />}
              label="Updated"
              value={ticket.updatedAt}
            />

          </div>

          <div className="grid grid-cols-2 gap-4">

            <div className="rounded-xl bg-zinc-900 p-5">

              <div className="mb-3 flex items-center gap-2 text-zinc-400">
                <AlertTriangle size={18} />
                Priority
              </div>

              <span
                className={`rounded-full px-4 py-2 text-sm font-medium ${priorityColor(
                  ticket.priority
                )}`}
              >
                {ticket.priority}
              </span>

            </div>

            <div className="rounded-xl bg-zinc-900 p-5">

              <div className="mb-3 flex items-center gap-2 text-zinc-400">
                <CheckCircle2 size={18} />
                Status
              </div>

              <span
                className={`rounded-full px-4 py-2 text-sm font-medium ${statusColor(
                  ticket.status
                )}`}
              >
                {ticket.status}
              </span>

            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="sticky bottom-0 flex gap-3 border-t border-zinc-800 bg-zinc-950 p-6">

          <button
            onClick={() => onReply(ticket)}
            className="flex-1 rounded-xl bg-cyan-500 py-3 font-semibold text-black transition hover:bg-cyan-400"
          >
            <span className="flex items-center justify-center gap-2">
              <MessageSquare size={18} />
              Reply
            </span>
          </button>

          <button
            onClick={() => onEdit(ticket)}
            className="flex-1 rounded-xl border border-zinc-700 py-3 font-semibold text-white transition hover:bg-zinc-800"
          >
            <span className="flex items-center justify-center gap-2">
              <Pencil size={18} />
              Edit
            </span>
          </button>

        </div>

      </div>
    </>
  );
};

interface InfoCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const InfoCard = ({
  icon,
  label,
  value,
}: InfoCardProps) => (
  <div className="rounded-xl bg-zinc-900 p-5">

    <div className="mb-2 flex items-center gap-2 text-zinc-400">
      {icon}
      {label}
    </div>

    <p className="font-medium text-white">
      {value}
    </p>

  </div>
);

export default TicketDrawer;