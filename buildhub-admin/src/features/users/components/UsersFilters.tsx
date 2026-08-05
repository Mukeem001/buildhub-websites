import { Search, RotateCcw, Filter } from "lucide-react";

interface UsersFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  roleFilter: string;
  onRoleFilterChange: (value: string) => void;
  planFilter: string;
  onPlanFilterChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  totalUsers: number;
}

const UsersFilters = ({
  search,
  onSearchChange,
  roleFilter,
  onRoleFilterChange,
  planFilter,
  onPlanFilterChange,
  statusFilter,
  onStatusFilterChange,
  totalUsers,
}: UsersFiltersProps) => {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

        {/* Search */}
        <div className="relative w-full xl:max-w-md">

          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />

          <input
            type="text"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search users..."
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 py-3 pl-12 pr-4 text-white outline-none transition focus:border-blue-500"
          />

        </div>

        {/* Filters */}

        <div className="flex flex-wrap gap-3">

          <select
            value={roleFilter}
            onChange={(event) => onRoleFilterChange(event.target.value)}
            className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-300 outline-none focus:border-blue-500"
          >
            <option>All Roles</option>
            <option>Super Admin</option>
            <option>Admin</option>
            <option>Editor</option>
            <option>User</option>
          </select>

          <select
            value={planFilter}
            onChange={(event) => onPlanFilterChange(event.target.value)}
            className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-300 outline-none focus:border-blue-500"
          >
            <option>All Plans</option>
            <option>Free</option>
            <option>Pro</option>
            <option>Business</option>
            <option>Enterprise</option>
          </select>

          <select
            value={statusFilter}
            onChange={(event) => onStatusFilterChange(event.target.value)}
            className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-300 outline-none focus:border-blue-500"
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Suspended</option>
          </select>

          <button className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-300 transition hover:border-blue-500">

            <Filter size={18} />

            More Filters

          </button>

          <button
            type="button"
            onClick={() => {
              onSearchChange("");
              onRoleFilterChange("All Roles");
              onPlanFilterChange("All Plans");
              onStatusFilterChange("All Status");
            }}
            className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400 transition hover:bg-red-500/20"
          >
            <RotateCcw size={18} />
            Reset
          </button>

        </div>

      </div>

      {/* Footer */}

      <div className="mt-5 flex flex-col gap-3 border-t border-zinc-800 pt-5 sm:flex-row sm:items-center sm:justify-between">

        <p className="text-sm text-zinc-400">
          Showing <span className="font-semibold text-white">{totalUsers}</span> users
        </p>

        <p className="text-sm text-zinc-500">Last Updated: Just Now</p>

      </div>

    </div>
  );
};

export default UsersFilters;