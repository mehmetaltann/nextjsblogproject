import { useState } from "react";

export const usePagination = (data, postsPerPage = 3, isLoading = false) => {
  const [currentPage, setCurrentPage] = useState(1);

  if (!isLoading) {
    const totalPages = Math.ceil(data?.length / postsPerPage);
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const displayPosts = data?.slice(startIndex, endIndex);
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
  } else {
    const totalPages = 0;
    const startIndex = 0;
    const endIndex = 0;
    const displayPosts = null;
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
  }

  return {
    totalPages,
    displayPosts,
    setCurrentPage,
    onPageChange,
    currentPage,
  };
};
