import {
  UserPlus,
  Globe,
  CreditCard,
  ShieldCheck,
} from "lucide-react";
import type { DashboardActivity } from "@/services/dashboard";

interface LatestActivityProps {
  activity?: DashboardActivity[];
  loading?: boolean;
}

const LatestActivity = ({ activity }: LatestActivityProps) => {
  const items = activity ?? [];

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="mb-6 text-xl font-bold text-white">Latest Activity</h2>

      <div className="space-y-6">
        {items.length > 0 ? (
          items.map((item, index) => {
            const Icon = item.title.includes("user")
              ? UserPlus
              : item.title.includes("Website")
              ? Globe
              : item.title.includes("Payment")
              ? CreditCard
              : ShieldCheck;

            return (
              <div key={`${item.title}-${index}`} className="flex items-start gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.color}`}>
                  <Icon size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <p className="text-sm text-zinc-400">{item.description}</p>
                </div>
                <span className="text-xs text-zinc-500">{item.time}</span>
              </div>
            );
          })) : (
          <p className="text-sm text-zinc-400">No activity available.</p>
        )}
      </div>
    </div>
  );
};

export default LatestActivity;
