import {
  Download,
  Shield,
  Trash2,
  UserCog,
} from "lucide-react";

interface BulkActionsProps {
  selectedCount: number;
  onDeleteSelected: () => void;
  onSuspendSelected: () => void;
  onChangeRoleSelected: () => void;
  onExportSelected: () => void;
}

const BulkActions = ({
  selectedCount,
  onDeleteSelected,
  onSuspendSelected,
  onChangeRoleSelected,
  onExportSelected,
}: BulkActionsProps) => {
  const isDisabled = selectedCount === 0;

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">

      <div className="mb-4 text-sm text-zinc-400">
        {selectedCount > 0 ? `${selectedCount} user(s) selected` : "No users selected"}
      </div>

      <div className="flex flex-wrap items-center gap-3">

        <button
          type="button"
          disabled={isDisabled}
          onClick={onDeleteSelected}
          className="flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-3 text-red-400 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Trash2 size={18} />
          Delete Selected
        </button>

        <button
          type="button"
          disabled={isDisabled}
          onClick={onSuspendSelected}
          className="flex items-center gap-2 rounded-xl border border-zinc-700 px-4 py-3 text-zinc-300 transition hover:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Shield size={18} />
          Suspend
        </button>

        <button
          type="button"
          disabled={isDisabled}
          onClick={onChangeRoleSelected}
          className="flex items-center gap-2 rounded-xl border border-zinc-700 px-4 py-3 text-zinc-300 transition hover:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <UserCog size={18} />
          Change Role
        </button>

        <button
          type="button"
          disabled={isDisabled}
          onClick={onExportSelected}
          className="flex items-center gap-2 rounded-xl border border-zinc-700 px-4 py-3 text-zinc-300 transition hover:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Download size={18} />
          Export Selected
        </button>

      </div>

    </div>
  );
};

export default BulkActions;