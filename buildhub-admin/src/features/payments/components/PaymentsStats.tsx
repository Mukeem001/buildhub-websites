import {
  CreditCard,
  DollarSign,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { ComponentType, SVGProps } from "react";

type Color = keyof typeof colorClasses;

type Stat = {
  title: string;
  value: string;
  change: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  color: Color;
};

const stats: Stat[] = [
  {
    title: "Total Revenue",
    value: "$128,540",
    change: "+18.5%",
    icon: DollarSign,
    color: "emerald",
  },
  {
    title: "Successful Payments",
    value: "2,486",
    change: "+12.4%",
    icon: CheckCircle2,
    color: "green",
  },
  {
    title: "Pending Payments",
    value: "142",
    change: "+3.1%",
    icon: CreditCard,
    color: "yellow",
  },
  {
    title: "Failed Payments",
    value: "29",
    change: "-1.8%",
    icon: AlertTriangle,
    color: "red",
  },
];

const colorClasses = {
  emerald: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/20",
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
  red: {
    bg: "bg-red-500/10",
    text: "text-red-400",
    border: "border-red-500/20",
  },
} as const;

const PaymentsStats = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

      {stats.map((item: Stat) => {
        const Icon = item.icon;
        const colors = colorClasses[item.color];

        return (
          <div
            key={item.title}
            className={`rounded-2xl border ${colors.border} bg-zinc-900 p-6 transition hover:-translate-y-1 hover:border-emerald-500/40`}
          >
            <div className="flex items-start justify-between">

              <div>

                <p className="text-sm text-zinc-400">
                  {item.title}
                </p>

                <h3 className="mt-3 text-3xl font-bold text-white">
                  {item.value}
                </h3>

                <p
                  className={`mt-3 text-sm font-medium ${colors.text}`}
                >
                  {item.change} this month
                </p>

              </div>

              <div
                className={`rounded-2xl ${colors.bg} p-4`}
              >
                <Icon
                  className={`h-7 w-7 ${colors.text}`}
                />
              </div>

            </div>

          </div>
        );
      })}

    </div>
  );
};

export default PaymentsStats;