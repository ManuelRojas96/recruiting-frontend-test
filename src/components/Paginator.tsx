import { getDisplayPages } from "../utils/Utils";

type PaginatorProps = {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
};

export default function Paginator({
  currentPage,
  totalPages,
  onChange,
}: PaginatorProps) {
  const displayPages = getDisplayPages(currentPage, totalPages);

  return (
    <div className="flex items-center gap-1 py-4">
      <button
        className="px-2"
        disabled={currentPage === 1}
        onClick={() => onChange(currentPage - 1)}
      >
        {"<"}
      </button>
      {displayPages.map((page, i) =>
        page === "..." ? (
          <span key={i} className="px-2 text-xl select-none">
            ...
          </span>
        ) : (
          <button
            key={i}
            className={`px-3 py-1 rounded ${
              currentPage === page ? "bg-gray-100 font-bold" : ""
            }`}
            onClick={() => onChange(page as number)}
            disabled={currentPage === page}
          >
            {page}
          </button>
        )
      )}
      <button
        className="px-2"
        disabled={currentPage === totalPages}
        onClick={() => onChange(currentPage + 1)}
      >
        {">"}
      </button>
    </div>
  );
}
