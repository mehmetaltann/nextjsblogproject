import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const disableButtonClassName =
  "cursor-auto flex gap-1 justify-center items-center disabled:opacity-50 text-color1 hover:text-color2 border rounded-2xl py-3 px-4";

const activeButtonClassName =
  "flex gap-1 justify-center items-center text-color1";

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

  const handlePrevPage = () => {
    if (prevPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (nextPage) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="space-y-2 pb-3 pt-6 md:space-y-5">
      <nav className="flex justify-between items-center">
        <div className="flex items-center">
          <button
            className={
              prevPage ? activeButtonClassName : disableButtonClassName
            }
            onClick={handlePrevPage}
            disabled={!prevPage}
          >
            <FaAngleLeft />
            Önceki
          </button>
        </div>

        <span className="text-color1">
          {currentPage} of {totalPages}
        </span>

        <div className="flex items-center">
          <button
            className={
              nextPage ? activeButtonClassName : disableButtonClassName
            }
            onClick={handleNextPage}
            disabled={!nextPage}
          >
            Sonraki
            <FaAngleRight />
          </button>
        </div>
      </nav>
    </div>
  );
}
