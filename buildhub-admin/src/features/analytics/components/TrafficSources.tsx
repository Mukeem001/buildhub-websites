import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { trafficSources } from "../data/analytics";

const TrafficSources = () => {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

      {/* Header */}

      <div className="mb-6">

        <h2 className="text-xl font-bold text-white">
          Traffic Sources
        </h2>

        <p className="mt-1 text-sm text-zinc-400">
          Visitors by acquisition channel
        </p>

      </div>

      <div className="h-[360px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <BarChart
            data={trafficSources}
            layout="vertical"
            margin={{
              top: 10,
              right: 20,
              left: 20,
              bottom: 10,
            }}
          >

            <CartesianGrid
              stroke="#27272a"
              strokeDasharray="3 3"
            />

            <XAxis
              type="number"
              stroke="#a1a1aa"
            />

            <YAxis
              dataKey="source"
              type="category"
              stroke="#a1a1aa"
              width={90}
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
              fill="#8b5cf6"
              radius={[0, 8, 8, 0]}
              barSize={20}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default TrafficSources;