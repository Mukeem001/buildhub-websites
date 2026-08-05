import { AlertTriangle } from "lucide-react";
import { Role } from "../types/role";

interface DeleteRoleDialogProps {
  open: boolean;
  role: Role | null;

  onClose: () => void;
  onConfirm: () => void;
}

const DeleteRoleDialog = ({
  open,
  role,
  onClose,
  onConfirm,
}: DeleteRoleDialogProps) => {
  if (!open || !role) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm">

      <div className="w-full max-w-lg rounded-3xl border border-zinc-800 bg-zinc-900">

        {/* Header */}

        <div className="border-b border-zinc-800 p-6">

          <div className="flex items-center gap-4">

            <div className="rounded-2xl bg-red-500/10 p-3 text-red-400">
              <AlertTriangle size={28} />
            </div>

            <div>

              <h2 className="text-2xl font-bold text-white">
                Delete Role
              </h2>

              <p className="mt-1 text-sm text-zinc-400">
                This action cannot be undone.
              </p>

            </div>

          </div>

        </div>

        {/* Body */}

        <div className="space-y-5 p-6">

          <p className="text-zinc-300">
            Are you sure you want to delete
            <span className="mx-1 font-semibold text-white">
              {role.name}
            </span>
            role?
          </p>

          {role.isSystem && (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4">

              <p className="text-sm text-red-400">
                ⚠ System roles are protected and should not be removed.
              </p>

            </div>
          )}

        </div>

        {/* Footer */}

        <div className="flex flex-col-reverse gap-4 border-t border-zinc-800 p-6 sm:flex-row sm:justify-end">

          <button
            onClick={onClose}
            className="rounded-xl border border-zinc-700 px-6 py-3 text-white transition hover:bg-zinc-800"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={role.isSystem}
            className="rounded-xl bg-red-500 px-6 py-3 font-semibold text-white transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Delete Role
          </button>

        </div>

      </div>

    </div>
  );
};

export default DeleteRoleDialog;