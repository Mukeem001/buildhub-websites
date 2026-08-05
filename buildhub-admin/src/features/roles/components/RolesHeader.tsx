import {
  RefreshCw,
  Download,
  FileJson,
  Plus,
  Search,
} from "lucide-react";

interface RolesHeaderProps {
  search: string;
  onSearchChange: (value: string) => void;

  onRefresh: () => void;
  onExportCSV: () => void;
  onExportJSON: () => void;
  onCreateRole: () => void;
}

const RolesHeader = ({
  search,
  onSearchChange,
  onRefresh,
  onExportCSV,
  onExportJSON,
  onCreateRole,
}: RolesHeaderProps) => {
  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900">

      {/* Top */}

      <div className="flex flex-col gap-6 border-b border-zinc-800 p-8 xl:flex-row xl:items-center xl:justify-between">

        <div>

          <h1 className="text-4xl font-bold text-white">
            Roles & Permissions
          </h1>

          <p className="mt-3 text-zinc-400">
            Manage system roles, permissions and user access across
            the BuildHub platform.
          </p>

        </div>

        {/* Search */}

        <div className="relative w-full xl:w-[420px]">

          <Search
            size={20}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
          />

          <input
            value={search}
            onChange={(e) =>
              onSearchChange(e.target.value)
            }
            placeholder="Search roles..."
            className="h-14 w-full rounded-2xl border border-zinc-700 bg-zinc-950 pl-12 pr-5 text-white outline-none transition focus:border-cyan-500"
          />

        </div>

      </div>

      {/* Bottom */}

      <div className="flex flex-wrap gap-4 p-8">

        <button
          onClick={onRefresh}
          className="flex items-center gap-3 rounded-2xl border border-zinc-700 px-6 py-4 text-white transition hover:bg-zinc-800"
        >
          <RefreshCw size={20} />
          Refresh
        </button>

        <button
          onClick={onExportCSV}
          className="flex items-center gap-3 rounded-2xl bg-cyan-500 px-6 py-4 font-semibold text-black transition hover:bg-cyan-400"
        >
          <Download size={20} />
          Export CSV
        </button>

        <button
          onClick={onExportJSON}
          className="flex items-center gap-3 rounded-2xl bg-violet-500 px-6 py-4 font-semibold text-white transition hover:bg-violet-400"
        >
          <FileJson size={20} />
          Export JSON
        </button>

        <button
          onClick={onCreateRole}
          className="ml-auto flex items-center gap-3 rounded-2xl bg-emerald-500 px-6 py-4 font-semibold text-black transition hover:bg-emerald-400"
        >
          <Plus size={20} />
          Create Role
        </button>

      </div>

    </div>
  );
};

export default RolesHeader;