"use client";
import BlogPostPreview from "./BlogPostPreview";
import AnimationWrapper from "@/Components/Layouts/AnimationWrapper";
import Pagination from "@/Components/Layouts/Pagination";
import { usePagination } from "@/lib/hooks/usePagination";
import { useContext, useEffect, useState, useMemo } from "react";
import { ClientContext } from "@/store/ClientContext";
import { HomePost } from "@/lib/types/types";

interface BlogPostsProps {
  allPosts: HomePost[];
}

const BlogPosts = ({ allPosts }: BlogPostsProps) => {
  const context = useContext(ClientContext);
  if (!context)
    throw new Error(
      "useClientContext must be used within a ClientContextProvider"
    );

  const { searchItem } = context;

  const [filteredData, setFilteredData] = useState<HomePost[]>(allPosts);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!searchItem) {
        setFilteredData(allPosts);
      } else {
        const filteredItems = allPosts.filter((post: { title: string }) =>
          post.title.toLowerCase().includes(searchItem.toLowerCase())
        );
        setFilteredData(filteredItems);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchItem, allPosts]);

  const { totalPages, displayPosts, onPageChange, currentPage } = usePagination(
    filteredData || allPosts,
    8
  );

  const handlePageChange = (page: number) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <section className="grid grid-cols-1 gap-12 lg:gap-18 md:grid-cols-2 md:my-16 my-8">
        {displayPosts.map((post: HomePost, index) => (
          <AnimationWrapper key={index} keyValue="Blog Post Preview">
            <BlogPostPreview post={post} />
          </AnimationWrapper>
        ))}
      </section>
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
