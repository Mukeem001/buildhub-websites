import { useState } from "react";
import { X, Send, Save } from "lucide-react";

interface SendNotificationModalProps {
  open: boolean;
  onClose: () => void;
  onSend: (data: {
    title: string;
    message: string;
    recipient: string;
    type: string;
    priority: string;
    schedule: string;
  }) => void;
}

const SendNotificationModal = ({
  open,
  onClose,
  onSend,
}: SendNotificationModalProps) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [recipient, setRecipient] = useState("All Users");
  const [type, setType] = useState("System");
  const [priority, setPriority] = useState("Medium");
  const [schedule, setSchedule] = useState("");

  if (!open) return null;

  const handleSend = () => {
    onSend({
      title,
      message,
      recipient,
      type,
      priority,
      schedule,
    });

    setTitle("");
    setMessage("");
    setRecipient("All Users");
    setType("System");
    setPriority("Medium");
    setSchedule("");

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

      <div className="fixed left-1/2 top-1/2 z-50 w-[95%] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-zinc-800 p-6">

          <div>

            <h2 className="text-2xl font-bold text-white">
              Send Notification
            </h2>

            <p className="mt-1 text-sm text-zinc-400">
              Create and send a notification to your users.
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
              Title
            </label>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Notification title..."
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-yellow-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Message
            </label>

            <textarea
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your notification..."
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-yellow-500"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm text-zinc-400">
                Recipient
              </label>

              <select
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white"
              >
                <option>All Users</option>
                <option>Admins</option>
                <option>Premium Users</option>
                <option>Free Users</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-400">
                Type
              </label>

              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white"
              >
                <option>System</option>
                <option>Payment</option>
                <option>Orders</option>
                <option>Website</option>
                <option>Security</option>
                <option>Marketing</option>
              </select>
            </div>

          </div>

          <div className="grid gap-4 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm text-zinc-400">
                Priority
              </label>

              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-400">
                Schedule
              </label>

              <input
                type="datetime-local"
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white"
              />
            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="flex flex-wrap justify-end gap-3 border-t border-zinc-800 p-6">

          <button
            className="flex items-center gap-2 rounded-xl border border-zinc-700 px-5 py-3 text-white hover:bg-zinc-800"
          >
            <Save size={18} />
            Save Draft
          </button>

          <button
            onClick={handleSend}
            className="flex items-center gap-2 rounded-xl bg-yellow-500 px-5 py-3 font-semibold text-black hover:bg-yellow-400"
          >
            <Send size={18} />
            Send Notification
          </button>

        </div>

      </div>
    </>
  );
};

export default SendNotificationModal;