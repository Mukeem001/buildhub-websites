import {
  AlertTriangle,
  Trash2,
  X,
  User,
  Mail,
} from "lucide-react";

import { Ticket } from "../types/ticket";

interface DeleteTicketDialogProps {
  open: boolean;
  ticket: Ticket | null;

  onClose: () => void;

  onConfirm: (ticket: Ticket) => void;
}

const DeleteTicketDialog = ({
  open,
  ticket,
  onClose,
  onConfirm,
}: DeleteTicketDialogProps) => {
  if (!open || !ticket) return null;

  return (
    <>
      {/* Overlay */}

      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
      />

      {/* Dialog */}

      <div className="fixed left-1/2 top-1/2 z-50 w-[95%] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl">

        {/* Header */}

        <div className="flex items-center gap-4 border-b border-zinc-800 p-6">

          <div className="rounded-2xl bg-red-500/10 p-4">

            <AlertTriangle className="h-8 w-8 text-red-500" />

          </div>

          <div>

            <h2 className="text-2xl font-bold text-white">
              Delete Ticket
            </h2>

            <p className="mt-1 text-sm text-zinc-400">
              This action is permanent and cannot be undone.
            </p>

          </div>

        </div>

        {/* Body */}

        <div className="space-y-6 p-6">

          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">

            <p className="text-zinc-300">
              Are you sure you want to permanently delete this support ticket?
            </p>

          </div>

          {/* Ticket */}

          <div className="rounded-xl bg-zinc-900 p-5">

            <p className="text-sm text-zinc-500">
              Ticket Subject
            </p>

            <h3 className="mt-2 text-lg font-semibold text-white">
              {ticket.subject}
            </h3>

            <p className="mt-3 text-sm leading-6 text-zinc-400">
              {ticket.message}
            </p>

          </div>

          {/* Customer */}

          <div className="grid gap-4 md:grid-cols-2">

            <div className="rounded-xl bg-zinc-900 p-5">

              <div className="mb-2 flex items-center gap-2 text-zinc-500">

                <User size={18} />

                Customer

              </div>

              <p className="font-medium text-white">
                {ticket.customer}
              </p>

            </div>

            <div className="rounded-xl bg-zinc-900 p-5">

              <div className="mb-2 flex items-center gap-2 text-zinc-500">

                <Mail size={18} />

                Email

              </div>

              <p className="font-medium text-white">
                {ticket.email}
              </p>

            </div>

          </div>

          {/* Extra Info */}

          <div className="grid gap-4 md:grid-cols-3">

            <div className="rounded-xl bg-zinc-900 p-4">

              <p className="text-sm text-zinc-500">
                Category
              </p>

              <p className="mt-2 text-white">
                {ticket.category}
              </p>

            </div>

            <div className="rounded-xl bg-zinc-900 p-4">

              <p className="text-sm text-zinc-500">
                Priority
              </p>

              <p className="mt-2 text-white">
                {ticket.priority}
              </p>

            </div>

            <div className="rounded-xl bg-zinc-900 p-4">

              <p className="text-sm text-zinc-500">
                Status
              </p>

              <p className="mt-2 text-white">
                {ticket.status}
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
            onClick={() => onConfirm(ticket)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-500"
          >
            <Trash2 size={18} />
            Delete Ticket
          </button>

        </div>

      </div>
    </>
  );
};

export default DeleteTicketDialog;