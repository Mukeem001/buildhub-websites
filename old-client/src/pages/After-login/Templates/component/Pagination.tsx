import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <section className="bg-slate-950 pb-24">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 px-5">

        {/* Previous */}

        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className={`flex h-12 w-12 items-center justify-center rounded-xl transition ${
            currentPage === 1
              ? "cursor-not-allowed bg-slate-800 text-slate-500"
              : "bg-slate-900 text-white hover:bg-blue-600"
          }`}
        >
          <FaChevronLeft />
        </button>

        {/* Page Numbers */}

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`flex h-12 w-12 items-center justify-center rounded-xl font-semibold transition ${
              currentPage === page
                ? "bg-blue-600 text-white"
                : "bg-slate-900 text-slate-300 hover:bg-slate-800"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next */}

        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className={`flex h-12 w-12 items-center justify-center rounded-xl transition ${
            currentPage === totalPages
              ? "cursor-not-allowed bg-slate-800 text-slate-500"
              : "bg-slate-900 text-white hover:bg-blue-600"
          }`}
        >
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
};

export default Pagination;