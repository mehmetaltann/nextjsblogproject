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

  const categoryCountObj = useMemo(
    () => getAttCount(allPosts),
    [allPosts]
  );

  const filteredPosts = useMemo(() => {
    return selectedCategory === ALL_CATEGORIES
      ? allPosts
      : allPosts.filter((item) =>
          item.category.some(
            (insItem) => insItem.name === selectedCategory
          )
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
      className="flex flex-col md:flex-row gap-12 px-4 py-6 max-w-screen-xl mx-auto mt-6"
      keyValue="BlogListPage"
    >
      <TagsTable
        categoryCountObj={categoryCountObj}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        setCurrentPage={setCurrentPage}
      />

      {/* RIGHT CONTENT AREA */}
      <div className="flex-1 flex justify-center">
        <div className="w-full max-w-3xl">
          <PostList posts={displayPosts} />

          {totalPages > 1 && (
            <div className="mt-12 flex justify-center">
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </AnimationWrapper>
  );
};

export default Main;
