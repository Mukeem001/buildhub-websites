import {
  LayoutTemplate,
  CheckCircle2,
  Clock3,
  Download,
  DollarSign,
} from "lucide-react";

const stats = [
  {
    title: "Total Templates",
    value: "128",
    change: "+12 this month",
    icon: LayoutTemplate,
    color: "bg-violet-500/10 text-violet-400",
  },
  {
    title: "Published",
    value: "94",
    change: "+8 this week",
    icon: CheckCircle2,
    color: "bg-green-500/10 text-green-400",
  },
  {
    title: "Draft",
    value: "22",
    change: "5 pending review",
    icon: Clock3,
    color: "bg-yellow-500/10 text-yellow-400",
  },
  {
    title: "Downloads",
    value: "84.2K",
    change: "+18%",
    icon: Download,
    color: "bg-blue-500/10 text-blue-400",
  },
  {
    title: "Revenue",
    value: "$24,580",
    change: "+9%",
    icon: DollarSign,
    color: "bg-emerald-500/10 text-emerald-400",
  },
];

const TemplatesStats = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-400">
                  {item.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold text-white">
                  {item.value}
                </h2>

                <p className="mt-2 text-sm text-green-400">
                  {item.change}
                </p>
              </div>

              <div
                className={`rounded-2xl p-4 ${item.color}`}
              >
                <Icon className="h-7 w-7" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TemplatesStats;