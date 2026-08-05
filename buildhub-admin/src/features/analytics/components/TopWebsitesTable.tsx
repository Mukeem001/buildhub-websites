import { Eye, Pencil, Trash2, TrendingUp } from "lucide-react";
import { topWebsites } from "../data/analytics";

interface TopWebsitesTableProps {
  onView?: (id: number) => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const TopWebsitesTable = ({
  onView,
  onEdit,
  onDelete,
}: TopWebsitesTableProps) => {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-zinc-800 p-6">

        <div>

          <h2 className="text-xl font-bold text-white">
            Top Performing Websites
          </h2>

          <p className="mt-1 text-sm text-zinc-400">
            Highest traffic & revenue generating websites
          </p>

        </div>

      </div>

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-zinc-950">

            <tr className="border-b border-zinc-800">

              <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-400">
                Website
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-400">
                Owner
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-400">
                Visitors
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-400">
                Revenue
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-400">
                Growth
              </th>

              <th className="px-6 py-4 text-right text-sm font-semibold text-zinc-400">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {topWebsites.map((site) => (

              <tr
                key={site.id}
                className="border-b border-zinc-800 transition hover:bg-zinc-800/40"
              >

                <td className="px-6 py-5">

                  <div>

                    <h3 className="font-semibold text-white">
                      {site.name}
                    </h3>

                    <p className="text-sm text-zinc-500">
                      Website #{site.id}
                    </p>

                  </div>

                </td>

                <td className="px-6 py-5 text-zinc-300">
                  {site.owner}
                </td>

                <td className="px-6 py-5">

                  <span className="font-semibold text-cyan-400">
                    {site.visitors.toLocaleString()}
                  </span>

                </td>

                <td className="px-6 py-5">

                  <span className="font-semibold text-emerald-400">
                    ${site.revenue.toLocaleString()}
                  </span>

                </td>

                <td className="px-6 py-5">

                  <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-400">

                    <TrendingUp size={14} />

                    +12%

                  </span>

                </td>

                <td className="px-6 py-5">

                  <div className="flex justify-end gap-2">

                    <button
                      onClick={() => onView?.(site.id)}
                      className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                    >
                      <Eye size={17} />
                    </button>

                    <button
                      onClick={() => onEdit?.(site.id)}
                      className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                    >
                      <Pencil size={17} />
                    </button>

                    <button
                      onClick={() => onDelete?.(site.id)}
                      className="rounded-lg p-2 text-zinc-400 transition hover:bg-red-500/10 hover:text-red-500"
                    >
                      <Trash2 size={17} />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default TopWebsitesTable;