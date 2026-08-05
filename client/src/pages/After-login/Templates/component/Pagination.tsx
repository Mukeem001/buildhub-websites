import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages?: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages = 12,
  onPageChange,
}) => {
  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="mt-12 flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className={`flex h-12 w-12 items-center justify-center rounded-xl border transition ${
          currentPage === 1
            ? "cursor-not-allowed border-slate-800 bg-slate-800 text-slate-600"
            : "border-slate-800 bg-slate-900 text-slate-400 hover:border-blue-500/40 hover:bg-slate-800 hover:text-white"
        }`}
      >
        <ChevronLeft size={20} />
      </button>

      {pages.map((page) => {
        const isActive = currentPage === page;

        return (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={`hidden h-12 min-w-12 items-center justify-center rounded-xl border px-4 text-sm font-semibold transition sm:flex ${
              isActive
                ? "border-blue-500 bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                : "border-transparent bg-slate-900 text-slate-300 hover:border-slate-700 hover:bg-slate-800 hover:text-white"
            }`}
          >
            {page}
          </button>
        );
      })}

      <div className="flex h-12 min-w-12 items-center justify-center rounded-xl border border-blue-500 bg-blue-600 px-4 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 sm:hidden">
        {currentPage}
      </div>

      <button
        type="button"
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className={`flex h-12 w-12 items-center justify-center rounded-xl border transition ${
          currentPage === totalPages
            ? "cursor-not-allowed border-slate-800 bg-slate-800 text-slate-600"
            : "border-slate-800 bg-slate-900 text-slate-300 hover:border-blue-500/40 hover:bg-slate-800 hover:text-white"
        }`}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;
