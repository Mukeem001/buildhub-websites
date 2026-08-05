import { useState, useEffect } from "react";
import { Eye, Pencil, Trash2, Globe } from "lucide-react";


import type { Website } from "@/utils/websiteActions";

interface WebsitesTableProps {
  websites: Website[];

  search: string;
  status: string;
  plan: string;
  sortBy: string;

  selectedIds: Array<string | number>;
  setSelectedIds: React.Dispatch<React.SetStateAction<Array<string | number>>>;

  onViewWebsite: (website: Website) => void;
  onEditWebsite: (website: Website) => void;
  onDeleteWebsite: (website: Website) => void;
}

const statusColor: Record<string, string> = {
  Published:
    "bg-green-500/10 text-green-400 border-green-500/20",
  Draft:
    "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Maintenance:
    "bg-red-500/10 text-red-400 border-red-500/20",
};

const ITEMS_PER_PAGE = 5;

const WebsitesTable = ({
  websites,
  search,
  status,
  plan,
  sortBy,
  selectedIds,
  setSelectedIds,
  onViewWebsite,
  onEditWebsite,
  onDeleteWebsite,
}: WebsitesTableProps) => {


  const [currentPage, setCurrentPage] = useState(1);

  // ✅ IMPORTANT


  useEffect(() => {
    setCurrentPage(1);
  }, [search, status, plan, sortBy]);

  // --------------------------
  // FILTER
  // --------------------------

  const filteredWebsites = websites.filter((site) => {
    const query = search.toLowerCase();

    const matchesSearch =
      site.name.toLowerCase().includes(query) ||
      site.domain.toLowerCase().includes(query) ||
      site.owner.toLowerCase().includes(query);

    const matchesStatus =
      status === "" || site.status === status;

    const matchesPlan =
      plan === "" || site.plan === plan;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPlan
    );
  });

  // --------------------------
  // SORT
  // --------------------------

  const sortedWebsites = [...filteredWebsites].sort((a, b) => {
    switch (sortBy) {
      case "visitors":
        return b.visitors - a.visitors;

      case "plan":
        return a.plan.localeCompare(b.plan);

      case "status":
        return a.status.localeCompare(b.status);

      default:
        return a.name.localeCompare(b.name);
    }
  });

  // --------------------------
  // PAGINATION
  // --------------------------

  const totalPages = Math.max(
    1,
    Math.ceil(sortedWebsites.length / ITEMS_PER_PAGE)
  );

  const paginatedWebsites = sortedWebsites.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // --------------------------
  // BULK SELECT
  // --------------------------

  const allSelected =
    paginatedWebsites.length > 0 &&
    paginatedWebsites.every((site) =>
      selectedIds.includes(site.id)
    );

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds((prev) =>
        prev.filter(
          (id) =>
            !paginatedWebsites.some(
              (site) => site.id === id
            )
        )
      );
    } else {
      setSelectedIds((prev) => [
        ...new Set([
          ...prev,
          ...paginatedWebsites.map(
            (site) => site.id
          ),
        ]),
      ]);
    }
  };

  const toggleSelect = (id: string | number) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-zinc-950">

            <tr className="border-b border-zinc-800">

              {/* Checkbox */}

              <th className="w-14 px-6 py-4">

                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleSelectAll}
                  className="h-4 w-4 cursor-pointer rounded accent-blue-600"
                />

              </th>

              <th className="px-6 py-4 text-left text-sm text-zinc-400">
                Website
              </th>

              <th className="px-6 py-4 text-left text-sm text-zinc-400">
                Owner
              </th>

              <th className="px-6 py-4 text-left text-sm text-zinc-400">
                Plan
              </th>

              <th className="px-6 py-4 text-left text-sm text-zinc-400">
                Visitors
              </th>

              <th className="px-6 py-4 text-left text-sm text-zinc-400">
                Status
              </th>

              <th className="px-6 py-4 text-right text-sm text-zinc-400">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>


                        {paginatedWebsites.length > 0 ? (
              paginatedWebsites.map((site) => (
                <tr
                  key={site.id}
                  className="border-b border-zinc-800 transition hover:bg-zinc-800/40"
                >
                  {/* Checkbox */}
                  <td className="px-6 py-5">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(site.id)}
                      onChange={() => toggleSelect(site.id)}
                      className="h-4 w-4 cursor-pointer rounded accent-blue-600"
                    />
                  </td>

                  {/* Website */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="rounded-xl bg-blue-600/20 p-3">
                        <Globe className="h-5 w-5 text-blue-500" />
                      </div>

                      <div>
                        <h3 className="font-semibold text-white">
                          {site.name}
                        </h3>

                        <p className="text-sm text-zinc-400">
                          {site.domain}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Owner */}
                  <td className="px-6 py-5 text-zinc-300">
                    {site.owner.includes(" — ") ? (
                      <div>
                        <div className="font-medium text-white">
                          {site.owner.split(" — ")[0]}
                        </div>
                        <div className="text-sm text-zinc-400">
                          {site.owner.split(" — ")[1]}
                        </div>
                      </div>
                    ) : (
                      site.owner
                    )}
                  </td>

                  {/* Plan */}
                  <td className="px-6 py-5">
                    <span className="rounded-lg bg-blue-500/10 px-3 py-1 text-sm text-blue-400">
                      {site.plan}
                    </span>
                  </td>

                  {/* Visitors */}
                  <td className="px-6 py-5 text-white">
                    {site.visitors.toLocaleString()}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5">
                    <span
                      className={`rounded-lg border px-3 py-1 text-sm ${
                        statusColor[site.status]
                      }`}
                    >
                      {site.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-5">
                    <div className="flex justify-end gap-2">

                      <button
                        onClick={() => onViewWebsite(site)}
                        className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        onClick={() => onEditWebsite(site)}
                        className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        onClick={() => onDeleteWebsite(site)}
                        className="rounded-lg p-2 text-zinc-400 transition hover:bg-red-500/10 hover:text-red-500"
                      >
                        <Trash2 size={17} />
                      </button>

                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-12 text-center text-zinc-500"
                >
                  No websites found.
                </td>
              </tr>
            )}
          </tbody>

        </table>

      </div>

            {/* Selected Count */}
      {selectedIds.length > 0 && (
        <div className="flex items-center justify-between border-t border-zinc-800 bg-zinc-950 px-6 py-3">
          <p className="text-sm font-medium text-blue-400">
            {selectedIds.length} website
            {selectedIds.length > 1 ? "s" : ""} selected
          </p>

          <button
            onClick={() => setSelectedIds([])}
            className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition hover:border-red-500 hover:text-red-400"
          >
            Clear Selection
          </button>
        </div>
      )}

      {/* Pagination */}
      <div className="flex flex-col gap-4 border-t border-zinc-800 px-6 py-4 md:flex-row md:items-center md:justify-between">

        <p className="text-sm text-zinc-400">
          Showing{" "}
          <span className="font-semibold text-white">
            {paginatedWebsites.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-white">
            {sortedWebsites.length}
          </span>{" "}
          websites
        </p>

        <div className="flex items-center gap-2">

          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((page) => page - 1)}
            className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-white transition hover:border-blue-500 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`h-10 w-10 rounded-lg text-sm font-medium transition ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "border border-zinc-700 text-zinc-300 hover:border-blue-500 hover:bg-zinc-800"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((page) => page + 1)}
            className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-white transition hover:border-blue-500 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>

        </div>
      </div>
    </div>
  );
};

export default WebsitesTable;