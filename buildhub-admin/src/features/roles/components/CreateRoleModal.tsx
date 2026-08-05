import { useEffect, useState } from "react";
import { X } from "lucide-react";

import PermissionsMatrix from "./PermissionsMatrix";
import { Permission, Role } from "../types/role";
import { permissions as defaultPermissions } from "../data/permissions";

interface CreateRoleModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (
    role: Omit<Role, "id" | "createdAt" | "updatedAt">
  ) => void;
}

const CreateRoleModal = ({
  open,
  onClose,
  onCreate,
}: CreateRoleModalProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#06b6d4");

  const [rolePermissions, setRolePermissions] =
    useState<Permission[]>(defaultPermissions);

  useEffect(() => {
    if (!open) return;

    setName("");
    setDescription("");
    setColor("#06b6d4");
    setRolePermissions(defaultPermissions);
  }, [open]);

  if (!open) return null;

  const handleSubmit = () => {
    if (!name.trim()) return;

    onCreate({
      name,
      description,
      color,
      users: 0,
      isSystem: false,
      permissions: rolePermissions,
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
              Create New Role
            </h2>

            <p className="mt-1 text-sm text-zinc-400">
              Configure role details and permissions.
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

        <div className="space-y-8 overflow-y-auto p-6 max-h-[70vh]">

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

            <div>

              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Role Name
              </label>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter role name"
                className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none transition focus:border-cyan-500"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Role Color
              </label>

              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-12 w-full cursor-pointer rounded-xl border border-zinc-700 bg-zinc-950"
              />

            </div>

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Description
            </label>

            <textarea
              rows={4}
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Describe this role..."
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 p-4 text-white outline-none transition focus:border-cyan-500"
            />

          </div>

          <div>

            <h3 className="mb-4 text-lg font-semibold text-white">
              Permissions
            </h3>

            <PermissionsMatrix
              permissions={rolePermissions}
              editable
              onChange={setRolePermissions}
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
            onClick={handleSubmit}
            disabled={!name.trim()}
            className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Create Role
          </button>

        </div>

      </div>

    </div>
  );
};

export default CreateRoleModal;