import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type {
  DashboardTrafficSource,
} from "@/services/dashboard";

interface TrafficChartProps {
  trafficSources?: DashboardTrafficSource[];
  loading?: boolean;
}

const COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
];

const TrafficChart = ({ trafficSources }: TrafficChartProps) => {
  const data = trafficSources ?? [];

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="text-xl font-semibold text-white">Traffic Sources</h2>
      <p className="mt-1 text-sm text-zinc-400">Visitor acquisition channels</p>

      <div className="mt-8 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={70}
              outerRadius={100}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 space-y-3">
        {data.map((item, index) => (
          <div
            key={item.name}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div
                className="h-3 w-3 rounded-full"
                style={{ background: COLORS[index % COLORS.length] }}
              />
              <span className="text-zinc-300">{item.name}</span>
            </div>
            <span className="font-semibold text-white">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrafficChart;
