"use client";
import TagsTable from "./TagsTable";
import AnimationWrapper from "@/Components/Layouts/AnimationWrapper";
import PostList from "./PostList";
import Pagination from "../Layouts/Pagination";
import { getAttCount } from "@/lib/utils/helpers";
import { useContext, useMemo } from "react";
import { ClientContext } from "@/store/ClientContext";
import { usePagination } from "@/lib/hooks/usePagination";
import { HomePost } from "@/lib/types/types";

interface MainProps {
  allPosts: HomePost[];
}

const ALL_CATEGORIES = "Tümü";

const Main = ({ allPosts }: MainProps) => {
  const context = useContext(ClientContext);

  if (!context) {
    throw new Error(
      "useClientContext must be used within a ClientContextProvider"
    );
  }

  const { selectedCategory, setSelectedCategory } = context;

  const categoryCountObj = useMemo(() => getAttCount(allPosts), [allPosts]);

  const filteredPosts = useMemo(() => {
    return selectedCategory === ALL_CATEGORIES
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
  } = usePagination(filteredPosts, 4);

  const handlePageChange = (page: number) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimationWrapper
      className="flex flex-col md:flex-row gap-4 justify-center px-5 py-4 lg:w-4/6 xl:w-3/6 mt-4"
      keyValue="BlogListPage"
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
