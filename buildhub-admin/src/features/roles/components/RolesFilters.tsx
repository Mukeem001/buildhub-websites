import { RotateCcw } from "lucide-react";

interface RolesFiltersProps {
  roleType: string;
  users: string;
  sortBy: string;

  onRoleTypeChange: (value: string) => void;
  onUsersChange: (value: string) => void;
  onSortChange: (value: string) => void;

  onReset: () => void;
}

const RolesFilters = ({
  roleType,
  users,
  sortBy,
  onRoleTypeChange,
  onUsersChange,
  onSortChange,
  onReset,
}: RolesFiltersProps) => {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

        {/* Role Type */}

        <select
          value={roleType}
          onChange={(e) => onRoleTypeChange(e.target.value)}
          className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none transition focus:border-cyan-500"
        >
          <option value="">All Roles</option>
          <option value="system">System Roles</option>
          <option value="custom">Custom Roles</option>
        </select>

        {/* Users */}

        <select
          value={users}
          onChange={(e) => onUsersChange(e.target.value)}
          className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none transition focus:border-cyan-500"
        >
          <option value="">All Users</option>
          <option value="0-5">0 - 5 Users</option>
          <option value="6-10">6 - 10 Users</option>
          <option value="11-20">11 - 20 Users</option>
          <option value="20+">20+ Users</option>
        </select>

        {/* Sort */}

        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white outline-none transition focus:border-cyan-500"
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
          <option value="name">Role Name</option>
          <option value="users">Most Users</option>
        </select>

        {/* Reset */}

        <button
          onClick={onReset}
          className="flex h-12 items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-white transition hover:border-cyan-500 hover:bg-zinc-800"
        >
          <RotateCcw size={18} />
          Reset Filters
        </button>

      </div>

    </div>
  );
};

export default RolesFilters;