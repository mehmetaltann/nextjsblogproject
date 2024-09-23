"use client";
import TagsTable from "./TagsTable";
import AnimationWrapper from "@/Components/Layouts/AnimationWrapper";
import PostList from "./PostList";
import Pagination from "../Layouts/Pagination";
import { getAttCount } from "@/lib/utils/helpers";
import { useContext, useMemo } from "react";
import { ClientContext } from "@/store/ClientContext";
import { usePagination } from "@/lib/hooks/usePagination";

const Main = ({ allPosts, type }) => {
  const { selectedCategory, setSelectedCategory } = useContext(ClientContext);

  const categoryCountObj = useMemo(() => getAttCount(allPosts), [allPosts]);

  const filteredPosts = useMemo(() => {
    return selectedCategory === "Tümü"
      ? allPosts
      : allPosts.filter((item) =>
          item.category.some((insItem) => insItem.name === selectedCategory)
        );
  }, [selectedCategory, allPosts]);

  const {
    totalPages,
    displayPosts,
    onPageChange,
    setCurrentPage,
    currentPage,
  } = usePagination(filteredPosts, 3);

  const handlePageChange = (page) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimationWrapper
      className="flex flex-col md:flex-row gap-4 justify-center px-5 lg:w-4/6 xl:w-3/6 mt-4"
      keyValue={type}
    >
      <TagsTable
        categoryCountObj={categoryCountObj}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        setCurrentPage={setCurrentPage}
      />
      <div className="flex flex-col">
        <PostList posts={displayPosts} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </AnimationWrapper>
  );
};

export default Main;
