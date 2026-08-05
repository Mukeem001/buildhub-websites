import {
  Server,
  Cpu,
  HardDrive,
  Database,
  CheckCircle2,
} from "lucide-react";
import type { DashboardSystemStatus } from "@/services/dashboard";

interface SystemStatusProps {
  systems?: DashboardSystemStatus[];
  loading?: boolean;
}

const SystemStatus = ({ systems }: SystemStatusProps) => {
  const items = systems ?? [];

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">System Monitoring</h2>
        <div className="flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1 text-sm text-green-400">
          <CheckCircle2 size={16} />
          Healthy
        </div>
      </div>
      <div className="space-y-4">
        {items.length > 0 ? (
          items.map((item) => {
            const Icon = item.title.includes("CPU")
              ? Cpu
              : item.title.includes("RAM")
              ? Database
              : item.title.includes("Storage")
              ? HardDrive
              : Server;

            return (
              <div
                key={item.title}
                className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950 p-4 transition hover:border-blue-500/40"
              >
                <div className="flex items-center gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.bg}`}>
                    <Icon className={item.color} size={22} />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400">{item.title}</p>
                    <h3 className="font-semibold text-white">{item.value}</h3>
                  </div>
                </div>
                <div className="h-2 w-24 overflow-hidden rounded-full bg-zinc-800">
                  <div
                    className="h-full rounded-full bg-blue-500"
                    style={{ width: item.value.includes("%") ? item.value : "70%" }}
                  />
                </div>
              </div>
            );
          })) : (
          <p className="text-sm text-zinc-400">System status unavailable.</p>
        )}
      </div>
    </div>
  );
};

export default SystemStatus;
