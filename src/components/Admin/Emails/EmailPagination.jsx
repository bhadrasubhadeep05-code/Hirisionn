import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const EmailPagination = ({
  page = 1,
  limit = 20,
  total = 0,
  totalPages = 1,
  onPageChange,
  disabled = false,
}) => {
  if (totalPages <= 1 && total <= limit) {
    return null;
  }

  const startItem = total === 0 ? 0 : (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);

  // Generate page numbers to show (e.g. 1, 2, 3 ... 10)
  const getPageNumbers = () => {
    const pages = [];
    const delta = 2; // pages around current

    const left = Math.max(1, page - delta);
    const right = Math.min(totalPages, page + delta);

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= left && i <= right)) {
        pages.push(i);
      } else if (
        (i === left - 1 && left > 2) ||
        (i === right + 1 && right < totalPages - 1)
      ) {
        pages.push("...");
      }
    }

    // Deduplicate consecutive ellipses if any
    return pages.filter((item, index) => item !== "..." || pages[index - 1] !== "...");
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 mt-4 border-t border-slate-200/80">
      {/* Information text */}
      <div className="text-xs md:text-sm text-slate-500 font-medium">
        Showing <span className="font-semibold text-slate-800">{startItem}</span> to{" "}
        <span className="font-semibold text-slate-800">{endItem}</span> of{" "}
        <span className="font-semibold text-slate-800">{total}</span> emails
      </div>

      {/* Pagination buttons */}
      <div className="flex items-center gap-1.5">
        {/* Previous Button */}
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1 || disabled}
          className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs md:text-sm font-semibold border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition shadow-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        {/* Numbered page buttons */}
        <div className="hidden sm:flex items-center gap-1">
          {pageNumbers.map((p, idx) => {
            if (p === "...") {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  className="px-2 py-1 text-slate-400 text-xs font-semibold"
                >
                  …
                </span>
              );
            }

            const isCurrent = p === page;
            return (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange(p)}
                disabled={disabled || isCurrent}
                className={`w-9 h-9 rounded-xl text-xs font-semibold transition flex items-center justify-center ${
                  isCurrent
                    ? "bg-[#0F172A] text-white shadow-md font-bold"
                    : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40"
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>

        {/* Mobile current indicator */}
        <span className="sm:hidden text-xs font-semibold text-slate-600 px-2">
          Page {page} of {totalPages}
        </span>

        {/* Next Button */}
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages || disabled}
          className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs md:text-sm font-semibold border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition shadow-sm"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default EmailPagination;
