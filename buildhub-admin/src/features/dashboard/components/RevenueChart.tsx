import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
} from "recharts";
import type {
  DashboardRevenuePoint,
} from "@/services/dashboard";

interface RevenueChartProps {
  revenue?: number;
  revenueSeries?: DashboardRevenuePoint[];
  loading?: boolean;
}

const RevenueChart = ({
  revenue,
  revenueSeries,
}: RevenueChartProps) => {
  const data = revenueSeries ?? [];
  const displayRevenue = revenue
    ? `$${revenue.toLocaleString()}`
    : "$0";

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Revenue Overview</h2>
          <p className="text-sm text-zinc-400">Monthly revenue growth</p>
        </div>

        <h3 className="text-2xl font-bold text-emerald-400">{displayRevenue}</h3>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <XAxis dataKey="month" stroke="#71717a" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#2563eb"
              fill="#2563eb33"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
