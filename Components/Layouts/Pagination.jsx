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
          <button
            className="cursor-auto disabled:opacity-50 text-color1 hover:text-color2 border px-4 py-2 border-color9 rounded-2xl"
            disabled={!prevPage}
          >
            Önceki
          </button>
        )}
        {prevPage && <button onClick={handlePrevPage}> Önceki</button>}
        <span className="text-color1">
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button
            className="cursor-auto disabled:opacity-50 text-color1 hover:text-color2 border px-4 py-2 border-color9 rounded-2xl"
            disabled={!nextPage}
          >
            Sonraki
          </button>
        )}
        {nextPage && <button onClick={handleNextPage}>Sonraki</button>}
      </nav>
    </div>
  );
}
