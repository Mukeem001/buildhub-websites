import {
  Globe,
  Trash2,
  Download,
  X,
} from "lucide-react";

interface BulkActionsBarProps {
  selectedCount: number;
  onConnect: () => void;
  onExport: () => void;
  onDelete: () => void;
  onClear: () => void;
}

const BulkActionsBar = ({
  selectedCount,
  onConnect,
  onExport,
  onDelete,
  onClear,
}: BulkActionsBarProps) => {
  if (selectedCount === 0) return null;

  return (
    <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5 lg:flex-row lg:items-center lg:justify-between">

      {/* Left */}

      <div>
        <h3 className="text-lg font-semibold text-white">
          {selectedCount} Domain
          {selectedCount > 1 ? "s" : ""} Selected
        </h3>

        <p className="mt-1 text-sm text-zinc-400">
          Perform actions on selected domains.
        </p>
      </div>

      {/* Right */}

      <div className="flex flex-wrap gap-3">

        <button
          onClick={onConnect}
          className="flex items-center gap-2 rounded-xl bg-cyan-600 px-5 py-3 font-medium text-white transition hover:bg-cyan-500"
        >
          <Globe size={18} />
          Connect
        </button>

        <button
          onClick={onExport}
          className="flex items-center gap-2 rounded-xl bg-zinc-800 px-5 py-3 font-medium text-white transition hover:bg-zinc-700"
        >
          <Download size={18} />
          Export CSV
        </button>

        <button
          onClick={onDelete}
          className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-medium text-white transition hover:bg-red-500"
        >
          <Trash2 size={18} />
          Delete
        </button>

        <button
          onClick={onClear}
          className="flex items-center gap-2 rounded-xl border border-zinc-700 px-5 py-3 font-medium text-zinc-300 transition hover:border-red-500 hover:text-red-400"
        >
          <X size={18} />
          Clear
        </button>

      </div>

    </div>
  );
};

export default BulkActionsBar;