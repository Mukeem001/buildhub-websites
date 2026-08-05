import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { visitorsData } from "../data/analytics";

const VisitorsChart = () => {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

      {/* Header */}

      <div className="mb-6">

        <h2 className="text-xl font-bold text-white">
          Daily Visitors
        </h2>

        <p className="mt-1 text-sm text-zinc-400">
          Website visitors during this week
        </p>

      </div>

      <div className="h-[360px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <BarChart data={visitorsData}>

            <CartesianGrid
              stroke="#27272a"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="day"
              stroke="#a1a1aa"
            />

            <YAxis
              stroke="#a1a1aa"
            />

            <Tooltip
              cursor={{
                fill: "rgba(255,255,255,0.05)",
              }}
              contentStyle={{
                background: "#18181b",
                border: "1px solid #3f3f46",
                borderRadius: 12,
                color: "#fff",
              }}
            />

            <Bar
              dataKey="visitors"
              fill="#06b6d4"
              radius={[8, 8, 0, 0]}
              maxBarSize={48}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default VisitorsChart;