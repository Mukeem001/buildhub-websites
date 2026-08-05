import {
  Bell,
  Search,
  Download,
  RefreshCw,
  Plus,
} from "lucide-react";

interface NotificationsHeaderProps {
  search: string;
  type: string;
  status: string;

  onSearchChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onStatusChange: (value: string) => void;

  onRefresh: () => void;
  onExport: () => void;
  onSendNotification: () => void;
}

const NotificationsHeader = ({
  search,
  type,
  status,
  onSearchChange,
  onTypeChange,
  onStatusChange,
  onRefresh,
  onExport,
  onSendNotification,
}: NotificationsHeaderProps) => {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

      {/* Header */}

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-yellow-500/10 p-4">

            <Bell className="h-8 w-8 text-yellow-400" />

          </div>

          <div>

            <h1 className="text-3xl font-bold text-white">
              Notifications
            </h1>

            <p className="mt-1 text-zinc-400">
              Manage system notifications, alerts and announcements.
            </p>

          </div>

        </div>

        <div className="flex flex-wrap gap-3">

          <button
            onClick={onRefresh}
            className="flex items-center gap-2 rounded-xl border border-zinc-700 px-5 py-3 text-white transition hover:border-yellow-500 hover:bg-zinc-800"
          >
            <RefreshCw size={18} />
            Refresh
          </button>

          <button
            onClick={onExport}
            className="flex items-center gap-2 rounded-xl border border-zinc-700 px-5 py-3 text-white transition hover:border-blue-500 hover:bg-zinc-800"
          >
            <Download size={18} />
            Export CSV
          </button>

          <button
            onClick={onSendNotification}
            className="flex items-center gap-2 rounded-xl bg-yellow-500 px-5 py-3 font-semibold text-black transition hover:bg-yellow-400"
          >
            <Plus size={18} />
            Send Notification
          </button>

        </div>

      </div>

      {/* Filters */}

      <div className="mt-8 grid gap-4 lg:grid-cols-3">

        {/* Search */}

        <div className="relative">

          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />

          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search notifications..."
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-3 pl-12 pr-4 text-white outline-none transition focus:border-yellow-500"
          />

        </div>

        {/* Type */}

        <select
          value={type}
          onChange={(e) => onTypeChange(e.target.value)}
          className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
        >
          <option value="">All Types</option>
          <option value="System">System</option>
          <option value="Payment">Payment</option>
          <option value="Orders">Orders</option>
          <option value="Users">Users</option>
          <option value="Security">Security</option>
          <option value="Website">Website</option>
          <option value="Marketing">Marketing</option>
        </select>

        {/* Status */}

        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
        >
          <option value="">All Status</option>
          <option value="Unread">Unread</option>
          <option value="Read">Read</option>
          <option value="Scheduled">Scheduled</option>
        </select>

      </div>

    </div>
  );
};

export default NotificationsHeader;