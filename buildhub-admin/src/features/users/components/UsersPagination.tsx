import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface UsersPaginationProps {
  currentPage: number;
  rowsPerPage: number;
  totalRows: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
}

const UsersPagination = ({
  currentPage,
  rowsPerPage,
  totalRows,
  onPageChange,
  onRowsPerPageChange,
}: UsersPaginationProps) => {
  const totalPages = Math.max(1, Math.ceil(totalRows / rowsPerPage));
  const pagesToShow = Array.from({ length: Math.min(totalPages, 5) }, (_, index) => index + 1);

  return (
    <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-5 lg:flex-row lg:items-center lg:justify-between">

      {/* Left */}

      <div className="flex items-center gap-4">

        <span className="text-sm text-zinc-400">Rows per page</span>

        <select
          value={rowsPerPage}
          onChange={(event) => onRowsPerPageChange(Number(event.target.value))}
          className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white outline-none"
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>

      </div>

      {/* Center */}

      <p className="text-sm text-zinc-400">
        Showing
        <span className="mx-2 font-semibold text-white">
          {Math.min((currentPage - 1) * rowsPerPage + 1, totalRows)}–{Math.min(currentPage * rowsPerPage, totalRows)}
        </span>
        of
        <span className="mx-2 font-semibold text-white">{totalRows}</span>
        Users
      </p>

      {/* Right */}

      <div className="flex items-center gap-2">

        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="rounded-lg border border-zinc-700 p-2 text-zinc-400 transition hover:border-blue-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronLeft size={18} />
        </button>

        {pagesToShow.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`rounded-lg px-4 py-2 ${
              page === currentPage
                ? "bg-blue-600 text-white"
                : "border border-zinc-700 text-zinc-400 hover:border-blue-500 hover:text-white"
            }`}
          >
            {page}
          </button>
        ))}

        {Math.ceil(totalRows / rowsPerPage) > 5 && (
          <span className="text-sm text-zinc-500">...</span>
        )}

        <button
          disabled={currentPage === Math.max(1, Math.ceil(totalRows / rowsPerPage))}
          onClick={() => onPageChange(currentPage + 1)}
          className="rounded-lg border border-zinc-700 p-2 text-zinc-400 transition hover:border-blue-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronRight size={18} />
        </button>

      </div>

    </div>
  );
};

export default UsersPagination;