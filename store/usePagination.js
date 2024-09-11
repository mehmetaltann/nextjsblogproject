import { useState } from "react";

export const usePagination = (data, postsPerPage = 3) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const displayPosts = data.slice(startIndex, endIndex);
  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return {
    totalPages,
    displayPosts,
    setCurrentPage,
    onPageChange,
    currentPage,
  };
};
