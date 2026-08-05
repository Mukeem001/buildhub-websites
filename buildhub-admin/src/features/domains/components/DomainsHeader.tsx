import { Globe, Plus, Search } from "lucide-react";

interface DomainsHeaderProps {
  onCreateDomain: () => void;

  search: string;
  status: string;
  registrar: string;
  sortBy: string;

  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onRegistrarChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

const DomainsHeader = ({
  onCreateDomain,

  search,
  status,
  registrar,
  sortBy,

  onSearchChange,
  onStatusChange,
  onRegistrarChange,
  onSortChange,
}: DomainsHeaderProps) => {
  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">

      {/* Top */}

      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-cyan-600/20 p-3">
            <Globe className="h-6 w-6 text-cyan-400" />
          </div>

          <div>

            <h1 className="text-3xl font-bold text-white">
              Domains
            </h1>

            <p className="mt-1 text-zinc-400">
              Manage connected domains across BuildHub.
            </p>

          </div>

        </div>

        <button
          onClick={onCreateDomain}
          className="flex items-center justify-center gap-2 rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white transition hover:bg-cyan-500"
        >
          <Plus className="h-5 w-5" />

          Create Domain
        </button>

      </div>

      {/* Search */}

      <div className="space-y-4">

        <div className="relative">

          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />

          <input
            type="text"
            placeholder="Search domains..."
            value={search}
            onChange={(e) =>
              onSearchChange(e.target.value)
            }
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-3 pl-12 pr-4 text-white outline-none transition focus:border-cyan-500"
          />

        </div>

        {/* Filters */}

        <div className="grid gap-4 md:grid-cols-3">

          {/* Status */}

          <select
            value={status}
            onChange={(e) =>
              onStatusChange(e.target.value)
            }
            className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-cyan-500"
          >
            <option value="">
              All Status
            </option>

            <option value="Connected">
              Connected
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Expired">
              Expired
            </option>

          </select>

          {/* Registrar */}

          <select
            value={registrar}
            onChange={(e) =>
              onRegistrarChange(
                e.target.value
              )
            }
            className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-cyan-500"
          >
            <option value="">
              All Registrars
            </option>

            <option value="GoDaddy">
              GoDaddy
            </option>

            <option value="Cloudflare">
              Cloudflare
            </option>

            <option value="Namecheap">
              Namecheap
            </option>

            <option value="Google Domains">
              Google Domains
            </option>

          </select>

          {/* Sort */}

          <select
            value={sortBy}
            onChange={(e) =>
              onSortChange(e.target.value)
            }
            className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-cyan-500"
          >
            <option value="domain">
              Sort by Domain
            </option>

            <option value="website">
              Sort by Website
            </option>

            <option value="expiry">
              Sort by Expiry
            </option>

            <option value="status">
              Sort by Status
            </option>

          </select>

        </div>

      </div>

    </div>
  );
};

export default DomainsHeader;