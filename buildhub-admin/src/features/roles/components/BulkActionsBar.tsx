import {
  Trash2,
  Download,
  FileJson,
  X,
} from "lucide-react";

interface BulkActionsBarProps {
  selectedCount: number;

  onDelete: () => void;
  onExportCSV: () => void;
  onExportJSON: () => void;
  onClearSelection: () => void;
}

const BulkActionsBar = ({
  selectedCount,
  onDelete,
  onExportCSV,
  onExportJSON,
  onClearSelection,
}: BulkActionsBarProps) => {
  if (selectedCount === 0) return null;

  return (
    <div className="sticky top-4 z-40 rounded-3xl border border-cyan-500/20 bg-zinc-900/95 p-5 shadow-2xl backdrop-blur-xl">

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}

        <div>

          <h3 className="text-lg font-semibold text-white">
            {selectedCount} Role{selectedCount > 1 ? "s" : ""} Selected
          </h3>

          <p className="mt-1 text-sm text-zinc-400">
            Perform bulk actions on the selected roles.
          </p>

        </div>

        {/* Actions */}

        <div className="flex flex-wrap gap-3">

          <button
            onClick={onExportCSV}
            className="flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-medium text-black transition hover:bg-cyan-400"
          >
            <Download size={18} />
            Export CSV
          </button>

          <button
            onClick={onExportJSON}
            className="flex items-center gap-2 rounded-xl bg-violet-500 px-5 py-3 font-medium text-white transition hover:bg-violet-400"
          >
            <FileJson size={18} />
            Export JSON
          </button>

          <button
            onClick={onDelete}
            className="flex items-center gap-2 rounded-xl bg-red-500 px-5 py-3 font-medium text-white transition hover:bg-red-400"
          >
            <Trash2 size={18} />
            Delete
          </button>

          <button
            onClick={onClearSelection}
            className="flex items-center gap-2 rounded-xl border border-zinc-700 px-5 py-3 text-white transition hover:bg-zinc-800"
          >
            <X size={18} />
            Clear
          </button>

        </div>

      </div>

    </div>
  );
};

export default BulkActionsBar;