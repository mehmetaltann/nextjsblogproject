"use client";
import BlogPostPreview from "./BlogPostPreview";
import AnimationWrapper from "@/Components/Layouts/AnimationWrapper";
import Pagination from "@/Components/Layouts/Pagination";
import { usePagination } from "@/app/hooks/usePagination";
import { Loader } from "../Layouts/Loader";
import { usePosts } from "@/app/hooks/usePosts";
import { useContext, useEffect, useState } from "react";
import { ClientContext } from "@/store/ClientContext";

const BlogPosts = ({ type }) => {
  const { allPosts, isLoading, error } = usePosts();
  const { searchItem } = useContext(ClientContext);
  const [filteredData, setFilteredData] = useState(allPosts);

  const filteredPosts =
    !isLoading && allPosts.filter((item) => item.isHome && item);

  useEffect(() => {
    if (!isLoading) {
      const filteredItems = filteredPosts?.filter((post) =>
        post.title.toLowerCase().includes(searchItem.toLowerCase())
      );
      setFilteredData(filteredItems);
    }
  }, [searchItem]);

  //Pagination
  const { totalPages, displayPosts, onPageChange, currentPage } = usePagination(
    filteredData ? filteredData : filteredPosts,
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
