import {
  BarChart3,
  Search,
  Download,
  RefreshCw,
} from "lucide-react";

interface AnalyticsHeaderProps {
  search: string;
  period: string;

  onSearchChange: (value: string) => void;
  onPeriodChange: (value: string) => void;

  onExport: () => void;
  onRefresh: () => void;
}

const AnalyticsHeader = ({
  search,
  period,
  onSearchChange,
  onPeriodChange,
  onExport,
  onRefresh,
}: AnalyticsHeaderProps) => {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">

      {/* Top */}

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div className="flex items-center gap-4">

          <div className="rounded-xl bg-blue-500/10 p-3">

            <BarChart3 className="h-7 w-7 text-blue-400" />

          </div>

          <div>

            <h1 className="text-3xl font-bold text-white">
              Analytics Dashboard
            </h1>

            <p className="mt-1 text-zinc-400">
              Track revenue, visitors, users and business performance.
            </p>

          </div>

        </div>

        <div className="flex flex-wrap gap-3">

          <button
            onClick={onRefresh}
            className="flex items-center gap-2 rounded-xl border border-zinc-700 px-5 py-3 text-white transition hover:border-blue-500 hover:bg-zinc-800"
          >
            <RefreshCw size={18} />
            Refresh
          </button>

          <button
            onClick={onExport}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500"
          >
            <Download size={18} />
            Export Report
          </button>

        </div>

      </div>

      {/* Filters */}

      <div className="mt-8 grid gap-4 lg:grid-cols-2">

        {/* Search */}

        <div className="relative">

          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />

          <input
            type="text"
            placeholder="Search website or owner..."
            value={search}
            onChange={(e) =>
              onSearchChange(e.target.value)
            }
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-3 pl-12 pr-4 text-white outline-none transition focus:border-blue-500"
          />

        </div>

        {/* Period */}

        <select
          value={period}
          onChange={(e) =>
            onPeriodChange(e.target.value)
          }
          className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-blue-500"
        >
          <option value="today">Today</option>

          <option value="7days">
            Last 7 Days
          </option>

          <option value="30days">
            Last 30 Days
          </option>

          <option value="90days">
            Last 90 Days
          </option>

          <option value="year">
            This Year
          </option>

        </select>

      </div>

    </div>
  );
};

export default AnalyticsHeader;