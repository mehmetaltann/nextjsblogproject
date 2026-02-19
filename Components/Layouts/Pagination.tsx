import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const prevPage = currentPage > 1;
  const nextPage = currentPage < totalPages;

  return (
    <div className="pt-6 pb-3">
      <nav className="flex justify-center items-center gap-6 flex-wrap">
        <button
          onClick={() => prevPage && onPageChange(currentPage - 1)}
          disabled={!prevPage}
          className="flex items-center gap-2 px-4 py-2 border rounded-xl disabled:opacity-40"
        >
          <FaAngleLeft />
          Önceki
        </button>

        <span className="text-color1 font-medium">
          {currentPage} / {totalPages}
        </span>

        <button
          onClick={() => nextPage && onPageChange(currentPage + 1)}
          disabled={!nextPage}
          className="flex items-center gap-2 px-4 py-2 border rounded-xl disabled:opacity-40"
        >
          Sonraki
          <FaAngleRight />
        </button>
      </nav>
    </div>
  );
}
