import { useEffect, useState } from "react";
import {
  Eye,
  Pencil,
  Trash2,
  LayoutTemplate,
} from "lucide-react";

import { Template } from "../types/template";

interface TemplatesTableProps {
  templates: Template[];

  search: string;
  status: string;
  category: string;
  sortBy: string;

  selectedIds: Array<string | number>;
  setSelectedIds: React.Dispatch<
    React.SetStateAction<Array<string | number>>
  >;

  onViewTemplate: (template: Template) => void;
  onEditTemplate: (template: Template) => void;
  onDeleteTemplate: (template: Template) => void;
}

const ITEMS_PER_PAGE = 5;

const statusColor: Record<string, string> = {
  Published:
    "bg-green-500/10 text-green-400 border-green-500/20",

  Draft:
    "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",

  Maintenance:
    "bg-red-500/10 text-red-400 border-red-500/20",
};

const TemplatesTable = ({
  templates,

  search,
  status,
  category,
  sortBy,

  selectedIds,
  setSelectedIds,

  onViewTemplate,
  onEditTemplate,
  onDeleteTemplate,
}: TemplatesTableProps) => {
  const [currentPage, setCurrentPage] =
    useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, status, category, sortBy]);

  // Filter
  const filteredTemplates =
    templates.filter((template) => {
      const query = search.toLowerCase();

      const matchesSearch =
        template.name
          .toLowerCase()
          .includes(query) ||
        template.author
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        status === "" ||
        template.status === status;

      const matchesCategory =
        category === "" ||
        template.category === category;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCategory
      );
    });

  // Sort
  const sortedTemplates = [
    ...filteredTemplates,
  ].sort((a, b) => {
    switch (sortBy) {
      case "downloads":
        return b.downloads - a.downloads;

      case "price":
        return b.price - a.price;

      case "status":
        return a.status.localeCompare(
          b.status
        );

      default:
        return a.name.localeCompare(
          b.name
        );
    }
  });

  // Pagination
  const totalPages = Math.max(
    1,
    Math.ceil(
      sortedTemplates.length /
        ITEMS_PER_PAGE
    )
  );

  const paginatedTemplates =
    sortedTemplates.slice(
      (currentPage - 1) *
        ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );

  // Select All
  const allSelected =
    paginatedTemplates.length > 0 &&
    paginatedTemplates.every((template) =>
      selectedIds.includes(template.id)
    );

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds((prev) =>
        prev.filter(
          (id) =>
            !paginatedTemplates.some(
              (template) =>
                template.id === id
            )
        )
      );
    } else {
      setSelectedIds((prev) => [
        ...new Set([
          ...prev,
          ...paginatedTemplates.map(
            (template) => template.id
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

              <th className="w-14 px-6 py-4">

                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleSelectAll}
                  className="h-4 w-4 cursor-pointer accent-violet-600"
                />

              </th>

              <th className="px-6 py-4 text-left text-sm text-zinc-400">
                Template
              </th>

              <th className="px-6 py-4 text-left text-sm text-zinc-400">
                Author
              </th>

              <th className="px-6 py-4 text-left text-sm text-zinc-400">
                Category
              </th>

              <th className="px-6 py-4 text-left text-sm text-zinc-400">
                Price
              </th>

              <th className="px-6 py-4 text-left text-sm text-zinc-400">
                Downloads
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

            {paginatedTemplates.length > 0 ? (
  paginatedTemplates.map((template) => (
    <tr
      key={template.id}
      className="border-b border-zinc-800 transition hover:bg-zinc-800/40"
    >
      {/* Checkbox */}
      <td className="px-6 py-5">
        <input
          type="checkbox"
          checked={selectedIds.includes(template.id)}
          onChange={() => toggleSelect(template.id)}
          className="h-4 w-4 cursor-pointer accent-violet-600"
        />
      </td>

      {/* Template */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-violet-600/20 p-3">
            <LayoutTemplate className="h-5 w-5 text-violet-400" />
          </div>

          <div>
            <h3 className="font-semibold text-white">
              {template.name}
            </h3>
          </div>
        </div>
      </td>

      {/* Author */}
      <td className="px-6 py-5 text-zinc-300">
        {template.author}
      </td>

      {/* Category */}
      <td className="px-6 py-5">
        <span className="rounded-lg bg-blue-500/10 px-3 py-1 text-sm text-blue-400">
          {template.category}
        </span>
      </td>

      {/* Price */}
      <td className="px-6 py-5 text-white">
        {template.price === 0
          ? "Free"
          : `₹${template.price.toLocaleString()}`}
      </td>

      {/* Downloads */}
      <td className="px-6 py-5 text-white">
        {template.downloads.toLocaleString()}
      </td>

      {/* Status */}
      <td className="px-6 py-5">
        <span
          className={`rounded-lg border px-3 py-1 text-sm ${
            statusColor[template.status]
          }`}
        >
          {template.status}
        </span>
      </td>

      {/* Actions */}
      <td className="px-6 py-5">
        <div className="flex justify-end gap-2">

          <button
            onClick={() => onViewTemplate(template)}
            className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
          >
            <Eye size={17} />
          </button>

          <button
            onClick={() => onEditTemplate(template)}
            className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
          >
            <Pencil size={17} />
          </button>

          <button
            onClick={() => onDeleteTemplate(template)}
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
      colSpan={8}
      className="px-6 py-12 text-center text-zinc-500"
    >
      No templates found.
    </td>
  </tr>
)}


          </tbody>

        </table>

      </div>

      {/* Pagination */}
      <div className="flex flex-col gap-4 border-t border-zinc-800 px-6 py-4 md:flex-row md:items-center md:justify-between">

        <p className="text-sm text-zinc-400">
          Showing{" "}
          <span className="font-semibold text-white">
            {paginatedTemplates.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-white">
            {sortedTemplates.length}
          </span>{" "}
          templates
        </p>

        <div className="flex items-center gap-2">

          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((page) => page - 1)}
            className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-white transition hover:border-violet-500 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>

          {Array.from(
            { length: totalPages },
            (_, index) => (
              <button
                key={index}
                onClick={() =>
                  setCurrentPage(index + 1)
                }
                className={`h-10 w-10 rounded-lg text-sm font-medium transition ${
                  currentPage === index + 1
                    ? "bg-violet-600 text-white"
                    : "border border-zinc-700 text-zinc-300 hover:border-violet-500 hover:bg-zinc-800"
                }`}
              >
                {index + 1}
              </button>
            )
          )}

          <button
            disabled={
              currentPage === totalPages
            }
            onClick={() =>
              setCurrentPage((page) => page + 1)
            }
            className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-white transition hover:border-violet-500 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>

        </div>

      </div>

    </div>
  );
};

export default TemplatesTable;