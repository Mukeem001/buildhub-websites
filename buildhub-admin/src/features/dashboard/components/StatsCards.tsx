import {
  FaUsers,
  FaGlobe,
  FaShoppingCart,
  FaDollarSign,
} from "react-icons/fa";
import type { DashboardStats } from "@/services/dashboard";

interface StatsCardsProps {
  stats?: DashboardStats;
  loading?: boolean;
}

const StatsCards = ({ stats, loading }: StatsCardsProps) => {
  const items = [
    {
      title: "Total Users",
      value: stats?.totalUsers
        ? stats.totalUsers.toLocaleString()
        : loading
        ? "..."
        : "0",
      change: "+12%",
      icon: FaUsers,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      title: "Websites",
      value: stats?.totalWebsites
        ? stats.totalWebsites.toLocaleString()
        : loading
        ? "..."
        : "0",
      change: "+8%",
      icon: FaGlobe,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Orders",
      value: stats?.orders
        ? stats.orders.toLocaleString()
        : loading
        ? "..."
        : "0",
      change: "+18%",
      icon: FaShoppingCart,
      color: "text-orange-400",
      bg: "bg-orange-500/10",
    },
    {
      title: "Revenue",
      value: stats?.revenue
        ? `$${stats.revenue.toLocaleString()}`
        : loading
        ? "..."
        : "$0",
      change: "+23%",
      icon: FaDollarSign,
      color: "text-pink-400",
      bg: "bg-pink-500/10",
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-400">{item.title}</p>
                <h2 className="mt-3 text-3xl font-bold text-white">{item.value}</h2>
                <span className="mt-3 inline-block rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                  {item.change}
                </span>
              </div>

              <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.bg}`}>
                <Icon className={`text-2xl ${item.color}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
