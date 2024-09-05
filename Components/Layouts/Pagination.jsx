import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const disableButtonClassName =
  "cursor-auto disabled:opacity-50 text-color1 hover:text-color2 border px-4 py-2 rounded-2xl";

const activeButtonClassName =
  "flex gap-1 justify-center items-center text-color1";

export default function Pagination({ totalPages, currentPage, onPageChange }) {
  const prevPage = currentPage - 1 > 0;
  const nextPage = currentPage + 1 <= totalPages;

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
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className={disableButtonClassName} disabled={!prevPage}>
            Önceki
          </button>
        )}
        {prevPage && (
          <div className={activeButtonClassName}>
            <FaAngleLeft />
            <button onClick={handlePrevPage}>Önceki</button>
          </div>
        )}
        <span className="text-color1">
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className={disableButtonClassName} disabled={!nextPage}>
            Sonraki
          </button>
        )}
        {nextPage && (
          <div className={activeButtonClassName}>
            <button onClick={handleNextPage}>Sonraki</button>
            <FaAngleRight />
          </div>
        )}
      </nav>
    </div>
  );
}
