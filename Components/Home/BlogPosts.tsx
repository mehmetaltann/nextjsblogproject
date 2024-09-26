"use client";
import BlogPostPreview from "./BlogPostPreview";
import AnimationWrapper from "@/Components/Layouts/AnimationWrapper";
import Pagination from "@/Components/Layouts/Pagination";
import { usePagination } from "@/lib/hooks/usePagination";
import { useContext, useEffect, useState, useMemo } from "react";
import { ClientContext } from "@/store/ClientContext";
import { PostType } from "@/lib/types/types";

interface BlogPostsProps {
  allPosts: PostType[];
}

const BlogPosts: React.FC<BlogPostsProps> = ({ allPosts }) => {
  const context = useContext(ClientContext);
  if (!context)
    throw new Error(
      "useClientContext must be used within a ClientContextProvider"
    );

  const { searchItem } = context;

  const [filteredData, setFilteredData] = useState<PostType[]>(allPosts);

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

  const handlePageChange = (page: number) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {displayPosts.length === 0 ? (
        <p>Sonuç bulunamadı.</p>
      ) : (
        <section className="grid grid-cols-1 gap-12 lg:gap-18 md:grid-cols-2 md:my-16 my-8">
          {displayPosts.map((post: PostType) => (
            <AnimationWrapper key={post._id} keyValue="Blog Post Preview">
              <BlogPostPreview post={post} />
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
