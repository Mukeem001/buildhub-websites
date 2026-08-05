import { useEffect, useState } from "react";
import {
  Globe,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import { Domain } from "../types/domain";

interface DomainsTableProps {
  domains: Domain[];

  search: string;
  status: string;
  registrar: string;
  sortBy: string;

  selectedIds: Array<string | number>;
  setSelectedIds: React.Dispatch<
    React.SetStateAction<Array<string | number>>
  >;

  onViewDomain: () => void;
  onEditDomain: () => void;
  onDeleteDomain: () => void;
}

const ITEMS_PER_PAGE = 5;

const statusColor: Record<string, string> = {
  Connected:
    "bg-green-500/10 text-green-400 border-green-500/20",

  Pending:
    "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",

  Expired:
    "bg-red-500/10 text-red-400 border-red-500/20",
};

const sslColor: Record<string, string> = {
  Active:
    "bg-blue-500/10 text-blue-400 border-blue-500/20",

  Expired:
    "bg-red-500/10 text-red-400 border-red-500/20",
};

const DomainsTable = ({
  domains,

  search,
  status,
  registrar,
  sortBy,

  selectedIds,
  setSelectedIds,

  onViewDomain,
  onEditDomain,
  onDeleteDomain,
}: DomainsTableProps) => {

  const [currentPage, setCurrentPage] =
    useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, status, registrar, sortBy]);

  // Filter

  const filteredDomains =
    domains.filter((domain) => {

      const query =
        search.toLowerCase();

      const matchesSearch =
        domain.domain
          .toLowerCase()
          .includes(query) ||
        domain.website
          .toLowerCase()
          .includes(query) ||
        domain.owner
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        status === "" ||
        domain.status === status;

      const matchesRegistrar =
        registrar === "" ||
        domain.registrar === registrar;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesRegistrar
      );
    });

  // Sort

  const sortedDomains = [
    ...filteredDomains,
  ].sort((a, b) => {

    switch (sortBy) {

      case "website":
        return a.website.localeCompare(
          b.website
        );

      case "expiry":
        return (
          new Date(
            a.expiryDate
          ).getTime() -
          new Date(
            b.expiryDate
          ).getTime()
        );

      case "status":
        return a.status.localeCompare(
          b.status
        );

      default:
        return a.domain.localeCompare(
          b.domain
        );

    }

  });

  const totalPages = Math.max(
    1,
    Math.ceil(
      sortedDomains.length /
        ITEMS_PER_PAGE
    )
  );

  const paginatedDomains =
    sortedDomains.slice(
      (currentPage - 1) *
        ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );

  const allSelected =
    paginatedDomains.length > 0 &&
    paginatedDomains.every(
      (domain) =>
        selectedIds.includes(
          domain.id
        )
    );

  const toggleSelectAll = () => {

    if (allSelected) {

      setSelectedIds((prev) =>
        prev.filter(
          (id) =>
            !paginatedDomains.some(
              (domain) =>
                domain.id === id
            )
        )
      );

    } else {

      setSelectedIds((prev) => [
        ...new Set([
          ...prev,
          ...paginatedDomains.map(
            (domain) =>
              domain.id
          ),
        ]),
      ]);

    }

  };

  const toggleSelect = (
    id: string | number
  ) => {

    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter(
            (item) =>
              item !== id
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
                  onChange={
                    toggleSelectAll
                  }
                  className="h-4 w-4 cursor-pointer accent-cyan-600"
                />

              </th>

              <th className="px-6 py-4 text-left text-sm text-zinc-400">
                Domain
              </th>

              <th className="px-6 py-4 text-left text-sm text-zinc-400">
                Website
              </th>

              <th className="px-6 py-4 text-left text-sm text-zinc-400">
                Registrar
              </th>

              <th className="px-6 py-4 text-left text-sm text-zinc-400">
                SSL
              </th>

              <th className="px-6 py-4 text-left text-sm text-zinc-400">
                Status
              </th>

              <th className="px-6 py-4 text-left text-sm text-zinc-400">
                Expiry
              </th>

              <th className="px-6 py-4 text-right text-sm text-zinc-400">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

                      {paginatedDomains.length > 0 ? (
            paginatedDomains.map((domain) => (
              <tr
                key={domain.id}
                className="border-b border-zinc-800 transition hover:bg-zinc-800/40"
              >
                {/* Checkbox */}

                <td className="px-6 py-5">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(domain.id)}
                    onChange={() => toggleSelect(domain.id)}
                    className="h-4 w-4 cursor-pointer accent-cyan-600"
                  />
                </td>

                {/* Domain */}

                <td className="px-6 py-5">

                  <div className="flex items-center gap-4">

                    <div className="rounded-xl bg-cyan-500/10 p-3">
                      <Globe className="h-5 w-5 text-cyan-400" />
                    </div>

                    <div>

                      <h3 className="font-semibold text-white">
                        {domain.domain}
                      </h3>

                      <p className="text-sm text-zinc-400">
                        {domain.owner}
                      </p>

                    </div>

                  </div>

                </td>

                {/* Website */}

                <td className="px-6 py-5 text-zinc-300">
                  {domain.website}
                </td>

                {/* Registrar */}

                <td className="px-6 py-5">
                  <span className="rounded-lg bg-blue-500/10 px-3 py-1 text-sm text-blue-400">
                    {domain.registrar}
                  </span>
                </td>

                {/* SSL */}

                <td className="px-6 py-5">

                  <span
                    className={`rounded-lg border px-3 py-1 text-sm ${
                      sslColor[domain.ssl]
                    }`}
                  >
                    {domain.ssl}
                  </span>

                </td>

                {/* Status */}

                <td className="px-6 py-5">

                  <span
                    className={`rounded-lg border px-3 py-1 text-sm ${
                      statusColor[domain.status]
                    }`}
                  >
                    {domain.status}
                  </span>

                </td>

                {/* Expiry */}

                <td className="px-6 py-5 text-zinc-300">
                  {domain.expiryDate}
                </td>

                {/* Actions */}

                <td className="px-6 py-5">

                  <div className="flex justify-end gap-2">

                    <button
                      onClick={onViewDomain}
                      className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                    >
                      <Eye size={17} />
                    </button>

                    <button
                      onClick={onEditDomain}
                      className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                    >
                      <Pencil size={17} />
                    </button>

                    <button
                      onClick={onDeleteDomain}
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
                No domains found.
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
            {paginatedDomains.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-white">
            {sortedDomains.length}
          </span>{" "}
          domains
        </p>

        <div className="flex items-center gap-2">

          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage((page) => page - 1)
            }
            className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-white transition hover:border-cyan-500 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40"
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
                    ? "bg-cyan-600 text-white"
                    : "border border-zinc-700 text-zinc-300 hover:border-cyan-500 hover:bg-zinc-800"
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
            className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-white transition hover:border-cyan-500 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>

        </div>

      </div>

    </div>
  );
};

export default DomainsTable;