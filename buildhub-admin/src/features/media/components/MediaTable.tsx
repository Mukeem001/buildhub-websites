import { useEffect, useState } from "react";
import {
  Eye,
  Pencil,
  Trash2,
  Image as ImageIcon,
  Video,
  FileText,
} from "lucide-react";

import { Media } from "../types/media";

interface MediaTableProps {
  media: Media[];

  search: string;
  folder: string;
  type: string;
  sortBy: string;

  selectedIds: number[];
  setSelectedIds: React.Dispatch<
    React.SetStateAction<number[]>
  >;

  onViewMedia: () => void;
  onEditMedia: () => void;
  onDeleteMedia: () => void;
}

const ITEMS_PER_PAGE = 6;

const statusColor: Record<string, string> = {
  Active:
    "bg-green-500/10 text-green-400 border-green-500/20",

  Processing:
    "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",

  Archived:
    "bg-red-500/10 text-red-400 border-red-500/20",
};

const MediaTable = ({
  media,

  search,
  folder,
  type,
  sortBy,

  selectedIds,
  setSelectedIds,

  onViewMedia,
  onEditMedia,
  onDeleteMedia,
}: MediaTableProps) => {
  const [currentPage, setCurrentPage] =
    useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, folder, type, sortBy]);

  // Filter

  const filteredMedia = media.filter((item) => {
    const query = search.toLowerCase();

    const matchesSearch =
      item.name.toLowerCase().includes(query) ||
      item.uploadedBy
        .toLowerCase()
        .includes(query);

    const matchesFolder =
      folder === "" ||
      item.folder === folder;

    const matchesType =
      type === "" ||
      item.type === type;

    return (
      matchesSearch &&
      matchesFolder &&
      matchesType
    );
  });

  // Sort

  const sortedMedia = [...filteredMedia].sort(
    (a, b) => {
      switch (sortBy) {
        case "date":
          return (
            new Date(b.uploadedAt).getTime() -
            new Date(a.uploadedAt).getTime()
          );

        case "type":
          return a.type.localeCompare(
            b.type
          );

        case "size":
          return a.size.localeCompare(
            b.size
          );

        default:
          return a.name.localeCompare(
            b.name
          );
      }
    }
  );

  const totalPages = Math.max(
    1,
    Math.ceil(
      sortedMedia.length /
        ITEMS_PER_PAGE
    )
  );

  const paginatedMedia =
    sortedMedia.slice(
      (currentPage - 1) *
        ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );

  const allSelected =
    paginatedMedia.length > 0 &&
    paginatedMedia.every((item) =>
      selectedIds.includes(item.id)
    );

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds((prev) =>
        prev.filter(
          (id) =>
            !paginatedMedia.some(
              (item) => item.id === id
            )
        )
      );
    } else {
      setSelectedIds((prev) => [
        ...new Set([
          ...prev,
          ...paginatedMedia.map(
            (item) => item.id
          ),
        ]),
      ]);
    }
  };

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter(
            (item) => item !== id
          )
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
                File
              </th>

              <th className="px-6 py-4 text-left text-sm text-zinc-400">
                Folder
              </th>

              <th className="px-6 py-4 text-left text-sm text-zinc-400">
                Type
              </th>

              <th className="px-6 py-4 text-left text-sm text-zinc-400">
                Size
              </th>

              <th className="px-6 py-4 text-left text-sm text-zinc-400">
                Uploaded By
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

          {paginatedMedia.length > 0 ? (
            paginatedMedia.map((item) => (
              <tr
                key={item.id}
                className="border-b border-zinc-800 transition hover:bg-zinc-800/40"
              >
                {/* Checkbox */}

                <td className="px-6 py-5">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(item.id)}
                    onChange={() => toggleSelect(item.id)}
                    className="h-4 w-4 cursor-pointer accent-violet-600"
                  />
                </td>

                {/* File */}

                <td className="px-6 py-5">

                  <div className="flex items-center gap-4">

                    <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-zinc-800">

                      {item.type === "Image" ? (
                        item.thumbnail ? (
                          <img
                            src={item.thumbnail}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <ImageIcon className="h-6 w-6 text-violet-400" />
                        )
                      ) : item.type === "Video" ? (
                        <Video className="h-6 w-6 text-blue-400" />
                      ) : (
                        <FileText className="h-6 w-6 text-yellow-400" />
                      )}

                    </div>

                    <div>

                      <h3 className="font-semibold text-white">
                        {item.name}
                      </h3>

                      <p className="text-sm text-zinc-400">
                        {item.uploadedAt}
                      </p>

                    </div>

                  </div>

                </td>

                {/* Folder */}

                <td className="px-6 py-5">

                  <span className="rounded-lg bg-blue-500/10 px-3 py-1 text-sm text-blue-400">
                    {item.folder}
                  </span>

                </td>

                {/* Type */}

                <td className="px-6 py-5">

                  <span className="rounded-lg bg-violet-500/10 px-3 py-1 text-sm text-violet-400">
                    {item.type}
                  </span>

                </td>

                {/* Size */}

                <td className="px-6 py-5 text-white">
                  {item.size}
                </td>

                {/* Uploaded By */}

                <td className="px-6 py-5 text-zinc-300">
                  {item.uploadedBy}
                </td>

                {/* Status */}

                <td className="px-6 py-5">

                  <span
                    className={`rounded-lg border px-3 py-1 text-sm ${
                      statusColor[item.status]
                    }`}
                  >
                    {item.status}
                  </span>

                </td>

                {/* Actions */}

                <td className="px-6 py-5">

                  <div className="flex justify-end gap-2">

                    <button
                      onClick={onViewMedia}
                      className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                    >
                      <Eye size={17} />
                    </button>

                    <button
                      onClick={onEditMedia}
                      className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                    >
                      <Pencil size={17} />
                    </button>

                    <button
                      onClick={onDeleteMedia}
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
                No media files found.
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
            {paginatedMedia.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-white">
            {sortedMedia.length}
          </span>{" "}
          media files
        </p>

        <div className="flex items-center gap-2">

          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage((page) => page - 1)
            }
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
            disabled={currentPage === totalPages}
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

export default MediaTable;