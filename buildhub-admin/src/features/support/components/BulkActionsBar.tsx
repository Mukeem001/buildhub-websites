import {
  Trash2,
  CheckCircle2,
  FolderCheck,
  UserCheck,
  Download,
  X,
} from "lucide-react";

interface BulkActionsBarProps {
  selectedCount: number;

  onDelete: () => void;
  onResolve: () => void;
  onCloseTickets: () => void;
  onAssign: () => void;
  onExport: () => void;
  onClear: () => void;
}

const BulkActionsBar = ({
  selectedCount,
  onDelete,
  onResolve,
  onCloseTickets,
  onAssign,
  onExport,
  onClear,
}: BulkActionsBarProps) => {
  if (selectedCount === 0) return null;

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5 lg:flex-row lg:items-center lg:justify-between">

      {/* Left */}

      <div>
        <h3 className="text-lg font-semibold text-white">
          {selectedCount} Ticket{selectedCount > 1 ? "s" : ""} Selected
        </h3>

        <p className="mt-1 text-sm text-zinc-400">
          Perform bulk actions on the selected support tickets.
        </p>
      </div>

      {/* Right */}

      <div className="flex flex-wrap gap-3">

        <button
          onClick={onResolve}
          className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 font-medium text-black transition hover:bg-emerald-400"
        >
          <CheckCircle2 size={18} />
          Resolve
        </button>

        <button
          onClick={onCloseTickets}
          className="flex items-center gap-2 rounded-xl bg-blue-500 px-4 py-2 font-medium text-black transition hover:bg-blue-400"
        >
          <FolderCheck size={18} />
          Close
        </button>

        <button
          onClick={onAssign}
          className="flex items-center gap-2 rounded-xl bg-violet-500 px-4 py-2 font-medium text-white transition hover:bg-violet-400"
        >
          <UserCheck size={18} />
          Assign
        </button>

        <button
          onClick={onExport}
          className="flex items-center gap-2 rounded-xl border border-zinc-700 px-4 py-2 text-white transition hover:bg-zinc-800"
        >
          <Download size={18} />
          Export
        </button>

        <button
          onClick={onDelete}
          className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-500"
        >
          <Trash2 size={18} />
          Delete
        </button>

        <button
          onClick={onClear}
          className="flex items-center gap-2 rounded-xl border border-zinc-700 px-4 py-2 text-white transition hover:bg-zinc-800"
        >
          <X size={18} />
          Clear
        </button>

      </div>
    </div>
  );
};

export default BulkActionsBar;