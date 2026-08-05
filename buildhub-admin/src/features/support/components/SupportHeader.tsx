import {
  LifeBuoy,
  Search,
  RefreshCw,
  Download,
  Plus,
} from "lucide-react";

interface SupportHeaderProps {
  search: string;
  status: string;
  category: string;
  priority: string;

  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onPriorityChange: (value: string) => void;

  onRefresh: () => void;
  onExport: () => void;
  onCreateTicket: () => void;
}

const SupportHeader = ({
  search,
  status,
  category,
  priority,
  onSearchChange,
  onStatusChange,
  onCategoryChange,
  onPriorityChange,
  onRefresh,
  onExport,
  onCreateTicket,
}: SupportHeaderProps) => {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

      {/* Top Header */}

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-cyan-500/10 p-4">

            <LifeBuoy className="h-8 w-8 text-cyan-400" />

          </div>

          <div>

            <h1 className="text-3xl font-bold text-white">
              Support Center
            </h1>

            <p className="mt-1 text-zinc-400">
              Manage customer support tickets efficiently.
            </p>

          </div>

        </div>

        <div className="flex flex-wrap gap-3">

          <button
            onClick={onRefresh}
            className="flex items-center gap-2 rounded-xl border border-zinc-700 px-5 py-3 text-white transition hover:border-cyan-500 hover:bg-zinc-800"
          >
            <RefreshCw size={18} />
            Refresh
          </button>

          <button
            onClick={onExport}
            className="flex items-center gap-2 rounded-xl border border-zinc-700 px-5 py-3 text-white transition hover:border-emerald-500 hover:bg-zinc-800"
          >
            <Download size={18} />
            Export CSV
          </button>

          <button
            onClick={onCreateTicket}
            className="flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-black transition hover:bg-cyan-400"
          >
            <Plus size={18} />
            Create Ticket
          </button>

        </div>

      </div>

      {/* Filters */}

      <div className="mt-8 grid gap-4 xl:grid-cols-4">

        {/* Search */}

        <div className="relative">

          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />

          <input
            type="text"
            placeholder="Search tickets..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-3 pl-12 pr-4 text-white outline-none transition focus:border-cyan-500"
          />

        </div>

        {/* Status */}

        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-cyan-500"
        >
          <option value="">All Status</option>
          <option value="Open">Open</option>
          <option value="Pending">Pending</option>
          <option value="Resolved">Resolved</option>
          <option value="Closed">Closed</option>
        </select>

        {/* Category */}

        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-cyan-500"
        >
          <option value="">All Categories</option>
          <option value="Billing">Billing</option>
          <option value="Technical">Technical</option>
          <option value="Website">Website</option>
          <option value="Domain">Domain</option>
          <option value="Account">Account</option>
          <option value="Templates">Templates</option>
          <option value="Bug">Bug</option>
          <option value="Other">Other</option>
        </select>

        {/* Priority */}

        <select
          value={priority}
          onChange={(e) => onPriorityChange(e.target.value)}
          className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-cyan-500"
        >
          <option value="">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Urgent">Urgent</option>
        </select>

      </div>

    </div>
  );
};

export default SupportHeader;