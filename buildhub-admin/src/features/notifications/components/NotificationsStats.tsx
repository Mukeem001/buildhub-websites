import {
  Bell,
  Mail,
  CheckCircle2,
  Clock3,
  AlertTriangle,
  Send,
} from "lucide-react";

import { notificationStats } from "../data/notifications";

const stats = [
  {
    title: "Total Notifications",
    value: notificationStats.total.toLocaleString(),
    icon: Bell,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    title: "Unread",
    value: notificationStats.unread.toLocaleString(),
    icon: Mail,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
  },
  {
    title: "Read",
    value: notificationStats.read.toLocaleString(),
    icon: CheckCircle2,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    title: "Scheduled",
    value: notificationStats.scheduled.toLocaleString(),
    icon: Clock3,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
  },
  {
    title: "High Priority",
    value: notificationStats.highPriority.toLocaleString(),
    icon: AlertTriangle,
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
  },
  {
    title: "Sent Today",
    value: notificationStats.sentToday.toLocaleString(),
    icon: Send,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
];

const NotificationsStats = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className={`rounded-2xl border ${item.border} bg-zinc-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-yellow-500/40 hover:shadow-lg hover:shadow-yellow-500/10`}
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

            {/* Progress */}

            <div className="mt-6">

              <div className="h-2 overflow-hidden rounded-full bg-zinc-800">

                <div
                  className="h-full rounded-full bg-yellow-500"
                  style={{
                    width: `${Math.min(
                      Number(item.value.toString().replace(/,/g, "")),
                      100
                    )}%`,
                  }}
                />

              </div>

            </div>

          </div>
        );
      })}
    </div>
  );
};

export default NotificationsStats;