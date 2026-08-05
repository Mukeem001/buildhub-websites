import { useState } from "react";
import { X, Plus, Paperclip } from "lucide-react";
import type { TicketCategory, TicketPriority } from "../types/ticket";

interface CreateTicketModalProps {
  open: boolean;
  onClose: () => void;

  onCreate: (ticket: {
    subject: string;
    customer: string;
    email: string;
    category: TicketCategory;
    priority: TicketPriority;
    assignedTo: string;
    message: string;
  }) => void;
}

const CreateTicketModal = ({
  open,
  onClose,
  onCreate,
}: CreateTicketModalProps) => {
  const [subject, setSubject] = useState("");
  const [customer, setCustomer] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState<TicketCategory>("Technical");
  const [priority, setPriority] = useState<TicketPriority>("Medium");
  const [assignedTo, setAssignedTo] = useState("Unassigned");
  const [message, setMessage] = useState("");

  if (!open) return null;

  const handleCreate = () => {
    if (!subject || !customer || !email || !message) return;

    onCreate({
      subject,
      customer,
      email,
      category,
      priority,
      assignedTo,
      message,
    });

    setSubject("");
    setCustomer("");
    setEmail("");
    setCategory("Technical");
    setPriority("Medium");
    setAssignedTo("Unassigned");
    setMessage("");

    onClose();
  };

  return (
    <>
      {/* Overlay */}

      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
      />

      {/* Modal */}

      <div className="fixed left-1/2 top-1/2 z-50 w-[95%] max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-zinc-800 p-6">

          <div>

            <h2 className="text-2xl font-bold text-white">
              Create Support Ticket
            </h2>

            <p className="mt-1 text-sm text-zinc-400">
              Create a new customer support request.
            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-zinc-800"
          >
            <X className="h-5 w-5 text-zinc-400" />
          </button>

        </div>

        {/* Body */}

        <div className="space-y-5 p-6">

          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Subject
            </label>

            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter ticket subject..."
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-cyan-500"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm text-zinc-400">
                Customer
              </label>

              <input
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
                placeholder="Customer Name"
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-400">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="customer@email.com"
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-cyan-500"
              />
            </div>

          </div>

          <div className="grid gap-5 md:grid-cols-3">

            <div>
              <label className="mb-2 block text-sm text-zinc-400">
                Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as TicketCategory)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white"
              >
                <option>Technical</option>
                <option>Billing</option>
                <option>Website</option>
                <option>Domain</option>
                <option>Account</option>
                <option>Templates</option>
                <option>Bug</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-400">
                Priority
              </label>

              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TicketPriority)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Urgent</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-400">
                Assign Agent
              </label>

              <select
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white"
              >
                <option>Unassigned</option>
                <option>Sarah</option>
                <option>David</option>
                <option>Alex</option>
                <option>Emma</option>
                <option>Michael</option>
              </select>
            </div>

          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Description
            </label>

            <textarea
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe the customer's issue..."
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-cyan-500"
            />
          </div>

          {/* Attachment UI */}

          <div className="rounded-xl border-2 border-dashed border-zinc-700 p-6">

            <div className="flex flex-col items-center justify-center">

              <Paperclip className="mb-3 h-8 w-8 text-zinc-500" />

              <p className="font-medium text-white">
                Attach Files
              </p>

              <p className="mt-1 text-sm text-zinc-500">
                Drag & drop files here or click to browse
              </p>

              <button
                type="button"
                className="mt-5 rounded-xl border border-zinc-700 px-5 py-2 text-white transition hover:bg-zinc-800"
              >
                Choose File
              </button>

            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t border-zinc-800 p-6">

          <button
            onClick={onClose}
            className="rounded-xl border border-zinc-700 px-6 py-3 text-white hover:bg-zinc-800"
          >
            Cancel
          </button>

          <button
            onClick={handleCreate}
            className="flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black hover:bg-cyan-400"
          >
            <Plus size={18} />
            Create Ticket
          </button>

        </div>

      </div>
    </>
  );
};

export default CreateTicketModal;