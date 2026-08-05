import {
  Globe,
  CheckCircle2,
  Clock3,
  AlertTriangle,
} from "lucide-react";

const stats = [
  {
    title: "Total Domains",
    value: "248",
    icon: Globe,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
  {
    title: "Connected",
    value: "198",
    icon: CheckCircle2,
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
  },
  {
    title: "Pending",
    value: "28",
    icon: Clock3,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
  },
  {
    title: "Expired",
    value: "22",
    icon: AlertTriangle,
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
  },
];

const DomainsStats = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className={`rounded-2xl border ${stat.border} bg-zinc-900 p-6 transition hover:-translate-y-1 hover:border-cyan-500/40`}
          >
            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-zinc-400">
                  {stat.title}
                </p>

                <h3 className="mt-3 text-3xl font-bold text-white">
                  {stat.value}
                </h3>

              </div>

              <div
                className={`rounded-2xl ${stat.bg} p-4`}
              >
                <Icon
                  className={`h-7 w-7 ${stat.color}`}
                />
              </div>

            </div>
          </div>
        );
      })}

    </div>
  );
};

export default DomainsStats;