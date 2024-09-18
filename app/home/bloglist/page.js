"use client";
import PostList from "@/Components/BlogList/PostList";
import TagsTable from "@/Components/BlogList/TagsTable";
import AnimationWrapper from "@/Components/Layouts/AnimationWrapper";
import Pagination from "@/Components/Layouts/Pagination";
import { ClientContext } from "@/store/ClientContext";
import { usePagination } from "@/app/hooks/usePagination";
import { getAttCount } from "@/lib/utils/helpers";
import { useContext } from "react";
import { Loader } from "@/Components/Layouts/Loader";
import { usePosts } from "@/app/hooks/usePosts";

const page = ({ type }) => {
  const { selectedCategory, setSelectedCategory } = useContext(ClientContext);

  const { allPosts, isLoading, error } = usePosts();

  //Category List
  const categoryCountObj = !isLoading && getAttCount(allPosts);

  const filteredPosts =
    !isLoading &&
    allPosts.filter((item) =>
      selectedCategory === "Tümü"
        ? true
        : item.category.some((insItem) => insItem.name === selectedCategory)
    );

  //Pagination
  const {
    totalPages,
    displayPosts,
    onPageChange,
    setCurrentPage,
    currentPage,
  } = usePagination(filteredPosts, 3, isLoading);

  return (
    <AnimationWrapper
      keyValue={type}
      className="flex flex-col md:flex-row gap-4 justify-center px-5 lg:w-4/6 xl:w-3/6 mt-4"
    >
      {isLoading && <Loader />}
      {error && <div>failed to load</div>}
      {!isLoading && !error && (
        <>
          <TagsTable
            categoryCountObj={categoryCountObj}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            setCurrentPage={setCurrentPage}
          />
          <div className="flex flex-col gap-8">
            <PostList posts={displayPosts} />
            {totalPages > 1 && (
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={onPageChange}
              />
            )}
          </div>
        </>
      )}
    </AnimationWrapper>
  );
};

export default page;
