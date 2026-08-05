import {
  Trash2,
  CheckCircle2,
  MailOpen,
  Download,
  X,
} from "lucide-react";

interface BulkActionsBarProps {
  selectedCount: number;

  onDelete: () => void;

  onMarkRead: () => void;

  onMarkUnread: () => void;

  onExport: () => void;

  onClear: () => void;
}

const BulkActionsBar = ({
  selectedCount,
  onDelete,
  onMarkRead,
  onMarkUnread,
  onExport,
  onClear,
}: BulkActionsBarProps) => {
  if (selectedCount === 0) return null;

  return (
    <div className="sticky top-4 z-30 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-yellow-500/30 bg-zinc-900 p-5 shadow-lg">

      {/* Left */}

      <div className="flex items-center gap-3">

        <div className="rounded-xl bg-yellow-500/10 p-3">

          <CheckCircle2 className="h-6 w-6 text-yellow-400" />

        </div>

        <div>

          <h3 className="font-semibold text-white">
            {selectedCount} Notification
            {selectedCount > 1 ? "s" : ""} Selected
          </h3>

          <p className="text-sm text-zinc-400">
            Choose an action to perform on the selected notifications.
          </p>

        </div>

      </div>

      {/* Right */}

      <div className="flex flex-wrap gap-2">

        <button
          onClick={onMarkRead}
          className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-white transition hover:bg-emerald-500"
        >
          <CheckCircle2 size={16} />
          Mark Read
        </button>

        <button
          onClick={onMarkUnread}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-500"
        >
          <MailOpen size={16} />
          Mark Unread
        </button>

        <button
          onClick={onExport}
          className="flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-white transition hover:bg-violet-500"
        >
          <Download size={16} />
          Export
        </button>

        <button
          onClick={onDelete}
          className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-white transition hover:bg-red-500"
        >
          <Trash2 size={16} />
          Delete
        </button>

        <button
          onClick={onClear}
          className="flex items-center gap-2 rounded-xl border border-zinc-700 px-4 py-2 text-zinc-300 transition hover:border-zinc-500 hover:bg-zinc-800"
        >
          <X size={16} />
          Clear
        </button>

      </div>

    </div>
  );
};

export default BulkActionsBar;