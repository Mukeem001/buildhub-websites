import {
  Shield,
  Users,
  UserCheck,
  Lock,
  Activity,
  Sparkles,
} from "lucide-react";

interface RolesStatsProps {
  totalRoles: number;
  totalUsers: number;
  systemRoles: number;
  customRoles: number;
  totalPermissions: number;
  activeAssignments: number;
}

const RolesStats = ({
  totalRoles,
  totalUsers,
  systemRoles,
  customRoles,
  totalPermissions,
  activeAssignments,
}: RolesStatsProps) => {
  const stats = [
    {
      title: "Total Roles",
      value: totalRoles,
      icon: Shield,
      color: "cyan",
    },
    {
      title: "Assigned Users",
      value: totalUsers,
      icon: Users,
      color: "emerald",
    },
    {
      title: "System Roles",
      value: systemRoles,
      icon: Lock,
      color: "violet",
    },
    {
      title: "Custom Roles",
      value: customRoles,
      icon: Sparkles,
      color: "amber",
    },
    {
      title: "Permissions",
      value: totalPermissions,
      icon: UserCheck,
      color: "blue",
    },
    {
      title: "Assignments",
      value: activeAssignments,
      icon: Activity,
      color: "rose",
    },
  ];

  const colors = {
    cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    violet: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    rose: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  };

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/30"
          >
            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-zinc-400">
                  {item.title}
                </p>

                <h2 className="mt-3 text-3xl font-bold text-white">
                  {item.value.toLocaleString()}
                </h2>

              </div>

              <div
                className={`rounded-2xl border p-4 ${
                  colors[item.color as keyof typeof colors]
                }`}
              >
                <Icon size={24} />
              </div>

            </div>

            <div className="mt-6 h-2 overflow-hidden rounded-full bg-zinc-800">

              <div
                className="h-full rounded-full bg-cyan-500"
                style={{
                  width: `${Math.min(Number(item.value), 100)}%`,
                }}
              />

            </div>

          </div>
        );
      })}

    </div>
  );
};

export default RolesStats;