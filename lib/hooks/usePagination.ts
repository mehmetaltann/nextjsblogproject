import { useState, Dispatch, SetStateAction } from "react";

interface UsePaginationResult<T> {
  totalPages: number;
  displayPosts: T[];
  setCurrentPage: Dispatch<SetStateAction<number>>;
  onPageChange: (page: number) => void;
  currentPage: number;
}

export const usePagination = <T>(
  data: T[],
  postsPerPage: number = 3
): UsePaginationResult<T> => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.ceil(data?.length / postsPerPage);

  const startIndex = (currentPage - 1) * postsPerPage;

  const endIndex = startIndex + postsPerPage;

  const displayPosts = data ? data.slice(startIndex, endIndex) : [];

  const onPageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return {
    totalPages,
    displayPosts,
    setCurrentPage,
    onPageChange,
    currentPage,
  };
};
