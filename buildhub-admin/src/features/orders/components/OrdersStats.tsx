import {
  ShoppingCart,
  DollarSign,
  Clock3,
  CheckCircle2,
} from "lucide-react";

const stats = [
  {
    title: "Total Orders",
    value: "1,248",
    change: "+18%",
    icon: ShoppingCart,
    color: "blue",
  },
  {
    title: "Revenue",
    value: "$86,420",
    change: "+12%",
    icon: DollarSign,
    color: "green",
  },
  {
    title: "Pending Orders",
    value: "94",
    change: "+5%",
    icon: Clock3,
    color: "yellow",
  },
  {
    title: "Completed",
    value: "1,102",
    change: "+22%",
    icon: CheckCircle2,
    color: "violet",
  },
];

const colorClasses = {
  blue: {
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    border: "border-blue-500/20",
  },
  green: {
    bg: "bg-green-500/10",
    text: "text-green-400",
    border: "border-green-500/20",
  },
  yellow: {
    bg: "bg-yellow-500/10",
    text: "text-yellow-400",
    border: "border-yellow-500/20",
  },
  violet: {
    bg: "bg-violet-500/10",
    text: "text-violet-400",
    border: "border-violet-500/20",
  },
};

const OrdersStats = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;
        const color =
          colorClasses[item.color as keyof typeof colorClasses];

        return (
          <div
            key={item.title}
            className={`rounded-2xl border ${color.border} bg-zinc-900 p-6`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-400">
                  {item.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold text-white">
                  {item.value}
                </h2>

                <p className={`mt-2 text-sm ${color.text}`}>
                  {item.change} this month
                </p>
              </div>

              <div
                className={`rounded-2xl p-4 ${color.bg}`}
              >
                <Icon
                  className={`h-7 w-7 ${color.text}`}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrdersStats;