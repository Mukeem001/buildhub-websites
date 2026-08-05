import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { revenueData } from "../data/analytics";

const RevenueChart = () => {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

      {/* Header */}

      <div className="mb-6">

        <h2 className="text-xl font-bold text-white">
          Revenue Overview
        </h2>

        <p className="mt-1 text-sm text-zinc-400">
          Monthly revenue performance
        </p>

      </div>

      <div className="h-[360px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <LineChart data={revenueData}>

            <CartesianGrid
              stroke="#27272a"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="month"
              stroke="#a1a1aa"
            />

            <YAxis
              stroke="#a1a1aa"
            />

            <Tooltip
              contentStyle={{
                background: "#18181b",
                border: "1px solid #3f3f46",
                borderRadius: 12,
                color: "#fff",
              }}
            />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              strokeWidth={4}
              dot={{
                r: 5,
                fill: "#3b82f6",
              }}
              activeDot={{
                r: 8,
              }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default RevenueChart;