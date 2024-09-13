"use client";
import BlogPostPreview from "./BlogPostPreview";
import useSWR from "swr";
import axios from "axios";
import AnimationWrapper from "@/Components/Layouts/AnimationWrapper";
import Pagination from "@/Components/Layouts/Pagination";
import { usePagination } from "@/store/usePagination";
import { Loader } from "../Layouts/Loader";

const BlogPosts = ({ type }) => {
  const {
    data: blogs,
    error,
    isLoading,
  } = useSWR("/api/blogs", async () => {
    const response = await axios.get("/api/blog");
    return response.data.blogs;
  });

  const filteredPosts =
    !isLoading && blogs.filter((item) => item.isHome && item);

  //Pagination
  const { totalPages, displayPosts, onPageChange, currentPage } = usePagination(
    filteredPosts,
    4,
    isLoading
  );

  return (
    <>
      {isLoading && <Loader />}
      {error && <div>failed to load</div>}
      {!isLoading && !error && (
        <>
          <section className="grid grid-cols-1 gap-12 lg:gap-18 md:grid-cols-2 md:my-16 my-8">
            {displayPosts.map(
              ({
                cloudinaryImageId,
                title,
                description,
                _id,
                category,
                date,
              }) => {
                return (
                  <AnimationWrapper key={_id} keyValue={type}>
                    <BlogPostPreview
                      id={_id}
                      cloudinaryImageId={cloudinaryImageId}
                      title={title}
                      description={description}
                      category={category}
                      date={date}
                    />
                  </AnimationWrapper>
                );
              }
            )}
          </section>
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
          )}
        </>
      )}
    </>
  );
};

export default BlogPosts;
