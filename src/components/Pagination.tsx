"use client";
import React from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = [];

  // Always show first page
  if (currentPage > 2) {
    pages.push(1);
    if (currentPage > 3) {
      pages.push("...");
    }
  }

  // Show middle pages
  for (
    let i = Math.max(1, currentPage - 1);
    i <= Math.min(totalPages, currentPage + 1);
    i++
  ) {
    pages.push(i);
  }

  // Always show last page
  if (currentPage < totalPages - 1) {
    if (currentPage < totalPages - 2) {
      pages.push("...");
    }
    pages.push(totalPages);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      {/* Prev Button */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-1 rounded border border-gray-300 text-sm hover:bg-gray-100 disabled:opacity-50 bg-white"
      >
        Prev
      </button>

      {/* Page Numbers */}
      {pages.map((page, idx) =>
        page === "..." ? (
          <span key={idx} className="px-3 py-1 text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={idx}
            onClick={() => onPageChange(page as number)}
            // style={{ background: "white" }}
            className={`px-3 py-1 rounded text-sm border ${
              page === currentPage
                ? "bg-[#f50927] text-white border-[#f50927]"
                : "border-gray-300 hover:bg-gray-100 bg-white"
            }`}
          >
            {page}
          </button>
        )
      )}

      {/* Next Button */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-1 rounded border border-gray-300 text-sm hover:bg-gray-100 disabled:opacity-50 bg-white"
      >
        Next
      </button>
    </div>
  );
}
