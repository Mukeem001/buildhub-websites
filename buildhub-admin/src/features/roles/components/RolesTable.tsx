import {
  Eye,
  Pencil,
  Trash2,
  Users,
} from "lucide-react";
import { Role } from "../types/role";

interface RolesTableProps {
  roles: Role[];
  selectedIds: number[];

  onSelectionChange: (ids: number[]) => void;

  onView: (role: Role) => void;
  onEdit: (role: Role) => void;
  onDelete: (role: Role) => void;
  onAssignUsers: (role: Role) => void;
}

const RolesTable = ({
  roles,
  selectedIds,
  onSelectionChange,
  onView,
  onEdit,
  onDelete,
  onAssignUsers,
}: RolesTableProps) => {
  const toggleSelect = (id: number) => {
    if (selectedIds.includes(id)) {
      onSelectionChange(
        selectedIds.filter((item) => item !== id)
      );
    } else {
      onSelectionChange([...selectedIds, id]);
    }
  };

  const toggleAll = () => {
    if (selectedIds.length === roles.length) {
      onSelectionChange([]);
    } else {
      onSelectionChange(roles.map((r) => r.id));
    }
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900">

      <div className="overflow-x-auto">

        <table className="min-w-[1200px] w-full">

          <thead className="bg-zinc-950">

            <tr className="border-b border-zinc-800">

              <th className="px-6 py-5">

                <input
                  type="checkbox"
                  checked={
                    roles.length > 0 &&
                    selectedIds.length === roles.length
                  }
                  onChange={toggleAll}
                  className="h-4 w-4"
                />

              </th>

              <th className="px-6 py-5 text-left text-sm font-semibold text-zinc-400">
                Role
              </th>

              <th className="px-6 py-5 text-left text-sm font-semibold text-zinc-400">
                Users
              </th>

              <th className="px-6 py-5 text-left text-sm font-semibold text-zinc-400">
                Type
              </th>

              <th className="px-6 py-5 text-left text-sm font-semibold text-zinc-400">
                Permissions
              </th>

              <th className="px-6 py-5 text-left text-sm font-semibold text-zinc-400">
                Updated
              </th>

              <th className="px-6 py-5 text-center text-sm font-semibold text-zinc-400">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {roles.map((role) => (
              <tr
                key={role.id}
                className="border-b border-zinc-800 transition hover:bg-zinc-800/40"
              >
                <td className="px-6 py-5">

                  <input
                    type="checkbox"
                    checked={selectedIds.includes(role.id)}
                    onChange={() => toggleSelect(role.id)}
                    className="h-4 w-4"
                  />

                </td>

                <td className="px-6 py-5">

                  <div className="flex items-center gap-4">

                    <div
                      className="h-4 w-4 rounded-full"
                      style={{
                        backgroundColor: role.color,
                      }}
                    />

                    <div>

                      <h3 className="font-semibold text-white">
                        {role.name}
                      </h3>

                      <p className="mt-1 text-sm text-zinc-400">
                        {role.description}
                      </p>

                    </div>

                  </div>

                </td>

                <td className="px-6 py-5">

                  <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-400">
                    {role.users} Users
                  </span>

                </td>

                <td className="px-6 py-5">

                  {role.isSystem ? (
                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-400">
                      System
                    </span>
                  ) : (
                    <span className="rounded-full bg-violet-500/10 px-3 py-1 text-sm font-medium text-violet-400">
                      Custom
                    </span>
                  )}

                </td>

                <td className="px-6 py-5 text-white">
                  {role.permissions.length}
                </td>

                <td className="px-6 py-5 text-zinc-400">
                  {role.updatedAt}
                </td>

                <td className="px-6 py-5">

                  <div className="flex items-center justify-center gap-2">

                    <button
                      onClick={() => onView(role)}
                      className="rounded-xl p-2 text-cyan-400 transition hover:bg-cyan-500/10"
                      title="View Permissions"
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      onClick={() => onAssignUsers(role)}
                      className="rounded-xl p-2 text-emerald-400 transition hover:bg-emerald-500/10"
                      title="Assign Users"
                    >
                      <Users size={18} />
                    </button>

                    <button
                      onClick={() => onEdit(role)}
                      className="rounded-xl p-2 text-amber-400 transition hover:bg-amber-500/10"
                      title="Edit Role"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => onDelete(role)}
                      className="rounded-xl p-2 text-red-400 transition hover:bg-red-500/10"
                      title="Delete Role"
                      disabled={role.isSystem}
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default RolesTable;