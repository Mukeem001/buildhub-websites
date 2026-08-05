import {
  DollarSign,
  Users,
  Globe,
  ShoppingCart,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

import { analyticsStats } from "../data/analytics";

const stats = [
  {
    title: "Total Revenue",
    value: `$${analyticsStats.revenue.toLocaleString()}`,
    icon: DollarSign,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    title: "Total Users",
    value: analyticsStats.users.toLocaleString(),
    icon: Users,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    title: "Active Websites",
    value: analyticsStats.websites.toLocaleString(),
    icon: Globe,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
  },
  {
    title: "Orders",
    value: analyticsStats.orders.toLocaleString(),
    icon: ShoppingCart,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
  },
  {
    title: "Conversion Rate",
    value: `${analyticsStats.conversion}%`,
    icon: TrendingUp,
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
  },
  {
    title: "Bounce Rate",
    value: `${analyticsStats.bounceRate}%`,
    icon: TrendingDown,
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
  },
];

const AnalyticsStats = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className={`rounded-2xl border ${item.border} bg-zinc-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10`}
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

          </div>
        );
      })}

    </div>
  );
};

export default AnalyticsStats;