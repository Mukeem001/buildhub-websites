import {
  Ticket,
  FolderOpen,
  Clock3,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  UserCheck,
  Star,
} from "lucide-react";

import { supportStats } from "../data/tickets";

const stats = [
  {
    title: "Total Tickets",
    value: supportStats.total.toLocaleString(),
    icon: Ticket,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
  {
    title: "Open",
    value: supportStats.open.toLocaleString(),
    icon: FolderOpen,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    title: "Pending",
    value: supportStats.pending.toLocaleString(),
    icon: Clock3,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
  },
  {
    title: "Resolved",
    value: supportStats.resolved.toLocaleString(),
    icon: CheckCircle2,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    title: "Closed",
    value: supportStats.closed.toLocaleString(),
    icon: XCircle,
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
  },
  {
    title: "Urgent",
    value: supportStats.urgent.toLocaleString(),
    icon: AlertTriangle,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
  },
  {
    title: "Assigned",
    value: supportStats.assigned.toLocaleString(),
    icon: UserCheck,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
  },
  {
    title: "Customer Satisfaction",
    value: `${supportStats.satisfaction}%`,
    icon: Star,
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
  },
];

const SupportStats = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className={`rounded-2xl border ${item.border} bg-zinc-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/10`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-400">
                  {item.title}
                </p>

                <h2 className="mt-3 text-3xl font-bold text-white">
                  {item.value}
                </h2>
              </div>

              <div className={`rounded-2xl ${item.bg} p-4`}>
                <Icon
                  className={`h-7 w-7 ${item.color}`}
                />
              </div>
            </div>

            <div className="mt-6 h-2 overflow-hidden rounded-full bg-zinc-800">
              <div
                className="h-full rounded-full bg-cyan-500"
                style={{
                  width: `${Math.min(
                    Number(
                      item.value.toString().replace("%", "").replace(/,/g, "")
                    ),
                    100
                  )}%`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SupportStats;