import { useMemo, useState } from "react";
import {
  Search,
  X,
  UserPlus,
  Mail,
  Circle,
} from "lucide-react";
import { Role } from "../types/role";

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  status: "Online" | "Offline";
}

interface AssignUsersDrawerProps {
  open: boolean;
  role: Role | null;

  users: User[];

  onClose: () => void;
  onAssign: (userId: number) => void;
  onRemove: (userId: number) => void;
}

const AssignUsersDrawer = ({
  open,
  role,
  users,
  onClose,
  onAssign,
  onRemove,
}: AssignUsersDrawerProps) => {
  const [search, setSearch] = useState("");

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        user.email
          .toLowerCase()
          .includes(search.toLowerCase())
    );
  }, [users, search]);

  if (!open || !role) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm">

      <div className="absolute right-0 top-0 flex h-full w-full max-w-xl flex-col border-l border-zinc-800 bg-zinc-900">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-zinc-800 p-6">

          <div>
            <h2 className="text-2xl font-bold text-white">
              Assign Users
            </h2>

            <p className="mt-1 text-zinc-400">
              {role.name}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 transition hover:bg-zinc-800"
          >
            <X size={22} />
          </button>

        </div>

        {/* Search */}

        <div className="border-b border-zinc-800 p-6">

          <div className="relative">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search users..."
              className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 pl-11 pr-4 text-white outline-none focus:border-cyan-500"
            />

          </div>

        </div>

        {/* Users */}

        <div className="flex-1 space-y-4 overflow-y-auto p-6">

          {filteredUsers.map((user) => (

            <div
              key={user.id}
              className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950 p-4"
            >

              <div className="flex items-center gap-4">

                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-12 w-12 rounded-full object-cover"
                />

                <div>

                  <h3 className="font-semibold text-white">
                    {user.name}
                  </h3>

                  <div className="mt-1 flex items-center gap-2 text-sm text-zinc-400">

                    <Mail size={14} />

                    {user.email}

                  </div>

                  <div className="mt-2 flex items-center gap-2 text-xs">

                    <Circle
                      size={10}
                      fill={
                        user.status === "Online"
                          ? "#22c55e"
                          : "#71717a"
                      }
                    />

                    <span className="text-zinc-400">
                      {user.status}
                    </span>

                  </div>

                </div>

              </div>

              <div className="flex gap-2">

                <button
                  onClick={() => onAssign(user.id)}
                  className="flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2 font-medium text-black transition hover:bg-cyan-400"
                >
                  <UserPlus size={16} />
                  Assign
                </button>

                <button
                  onClick={() => onRemove(user.id)}
                  className="rounded-xl border border-red-500 px-4 py-2 text-red-400 transition hover:bg-red-500/10"
                >
                  Remove
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default AssignUsersDrawer;