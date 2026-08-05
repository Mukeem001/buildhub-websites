import { useEffect, useState } from "react";
import { X } from "lucide-react";

import PermissionsMatrix from "./PermissionsMatrix";
import { Permission, Role } from "../types/role";

interface EditRoleModalProps {
  open: boolean;
  role: Role | null;

  onClose: () => void;
  onSave: (role: Role) => void;
}

const EditRoleModal = ({
  open,
  role,
  onClose,
  onSave,
}: EditRoleModalProps) => {
  const [editedRole, setEditedRole] = useState<Role | null>(null);

  useEffect(() => {
    if (role) {
      setEditedRole({
        ...role,
        permissions: role.permissions.map((permission) => ({
          ...permission,
          actions: [...permission.actions],
        })),
      });
    }
  }, [role]);

  if (!open || !editedRole) return null;

  const handlePermissionChange = (permissions: Permission[]) => {
    setEditedRole({
      ...editedRole,
      permissions,
    });
  };

  const handleSave = () => {
    onSave({
      ...editedRole,
      updatedAt: new Date().toISOString().split("T")[0],
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm">

      <div className="max-h-[95vh] w-full max-w-6xl overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-zinc-800 p-6">

          <div>

            <h2 className="text-2xl font-bold text-white">
              Edit Role
            </h2>

            <p className="mt-1 text-sm text-zinc-400">
              Update role details and permissions.
            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
          >
            <X size={22} />
          </button>

        </div>

        {/* Body */}

        <div className="max-h-[70vh] space-y-8 overflow-y-auto p-6">

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

            <div>

              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Role Name
              </label>

              <input
                value={editedRole.name}
                onChange={(e) =>
                  setEditedRole({
                    ...editedRole,
                    name: e.target.value,
                  })
                }
                className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none focus:border-cyan-500"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Role Color
              </label>

              <input
                type="color"
                value={editedRole.color}
                onChange={(e) =>
                  setEditedRole({
                    ...editedRole,
                    color: e.target.value,
                  })
                }
                className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950"
              />

            </div>

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Description
            </label>

            <textarea
              rows={4}
              value={editedRole.description}
              onChange={(e) =>
                setEditedRole({
                  ...editedRole,
                  description: e.target.value,
                })
              }
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 p-4 text-white outline-none focus:border-cyan-500"
            />

          </div>

          <div>

            <h3 className="mb-4 text-lg font-semibold text-white">
              Permissions
            </h3>

            <PermissionsMatrix
              permissions={editedRole.permissions}
              editable
              onChange={handlePermissionChange}
            />

          </div>

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
            onClick={handleSave}
            className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:bg-cyan-400"
          >
            Save Changes
          </button>

        </div>

      </div>

    </div>
  );
};

export default EditRoleModal;