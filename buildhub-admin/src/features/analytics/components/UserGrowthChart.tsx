import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { userGrowthData } from "../data/analytics";

const UserGrowthChart = () => {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

      {/* Header */}

      <div className="mb-6">

        <h2 className="text-xl font-bold text-white">
          User Growth
        </h2>

        <p className="mt-1 text-sm text-zinc-400">
          Monthly registered users
        </p>

      </div>

      <div className="h-[360px]">

        <ResponsiveContainer width="100%" height="100%">

          <AreaChart data={userGrowthData}>

            <defs>

              <linearGradient
                id="userGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#8b5cf6"
                  stopOpacity={0.8}
                />

                <stop
                  offset="100%"
                  stopColor="#8b5cf6"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

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

            <Area
              type="monotone"
              dataKey="users"
              stroke="#8b5cf6"
              strokeWidth={3}
              fill="url(#userGradient)"
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default UserGrowthChart;