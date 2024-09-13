"use client";
import axios from "axios";
import PostList from "@/Components/BlogList/PostList";
import TagsTable from "@/Components/BlogList/TagsTable";
import AnimationWrapper from "@/Components/Layouts/AnimationWrapper";
import Pagination from "@/Components/Layouts/Pagination";
import useSWR from "swr";
import { ClientContext } from "@/store/ClientContext";
import { usePagination } from "@/store/usePagination";
import { getAttCount } from "@/lib/utils/helpers";
import { useContext } from "react";
import { Loader } from "@/Components/Layouts/Loader";

const page = ({ type }) => {
  const { selectedCategory, setSelectedCategory } = useContext(ClientContext);
  const {
    data: allPosts,
    error,
    isLoading,
  } = useSWR("/api/blogs", async () => {
    const response = await axios.get("/api/blog");
    return response.data.blogs;
  });

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
      className="flex flex-col justify-center px-3 md:px-0 md:w-2/4 lg:min-w-[820px] w-full sm:flex-row mt-4 gap-4 md:gap-8"
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
          <div className="flex flex-col gap-4">
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
