"use client";
import BlogPostPreview from "./BlogPostPreview";
import AnimationWrapper from "@/Components/Layouts/AnimationWrapper";
import Pagination from "@/Components/Layouts/Pagination";
import { usePagination } from "@/lib/hooks/usePagination";
import { useContext, useEffect, useState, useMemo } from "react";
import { ClientContext } from "@/store/ClientContext";

const BlogPosts = ({ allPosts, type }) => {
  const { searchItem } = useContext(ClientContext);
  const [filteredData, setFilteredData] = useState(allPosts);

  const filteredPosts = useMemo(() => {
    return allPosts.filter((item) => item.isHome);
  }, [allPosts]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!searchItem) {
        setFilteredData(filteredPosts);
      } else {
        const filteredItems = filteredPosts.filter((post) =>
          post.title.toLowerCase().includes(searchItem.toLowerCase())
        );
        setFilteredData(filteredItems);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchItem, filteredPosts]);

  //Pagination
  const { totalPages, displayPosts, onPageChange, currentPage } = usePagination(
    filteredData || filteredPosts,
    4
  );

  const handlePageChange = (page) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {displayPosts.length === 0 ? (
        <p>Sonuç bulunamadı.</p>
      ) : (
        <section className="grid grid-cols-1 gap-12 lg:gap-18 md:grid-cols-2 md:my-16 my-8">
          {displayPosts.map((post) => (
            <AnimationWrapper key={post._id} keyValue={type}>
              <BlogPostPreview
                id={post._id}
                cloudinaryImageId={post.cloudinaryImageId}
                title={post.title}
                description={post.description}
                category={post.category}
                date={post.date}
              />
            </AnimationWrapper>
          ))}
        </section>
      )}
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default BlogPosts;
