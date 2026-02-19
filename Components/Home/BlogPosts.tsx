"use client";
import BlogPostPreview from "./BlogPostPreview";
import AnimationWrapper from "@/Components/Layouts/AnimationWrapper";
import Pagination from "@/Components/Layouts/Pagination";
import { useContext, useMemo, useState, useEffect } from "react";
import { ClientContext } from "@/store/ClientContext";
import { HomePost } from "@/lib/types/types";

interface BlogPostsProps {
  allPosts: HomePost[];
}

const POSTS_PER_PAGE = 8;

const BlogPosts = ({ allPosts }: BlogPostsProps) => {
  const context = useContext(ClientContext);
  if (!context)
    throw new Error("ClientContext gerekli");

  const { searchItem } = context;
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    if (!searchItem) return allPosts;

    return allPosts.filter((post) =>
      post.title.toLowerCase().includes(searchItem.toLowerCase())
    );
  }, [searchItem, allPosts]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchItem]);

  const totalPages = Math.ceil(filteredData.length / POSTS_PER_PAGE);

  const safePage = Math.min(currentPage, totalPages || 1);

  const displayPosts = useMemo(() => {
    const start = (safePage - 1) * POSTS_PER_PAGE;
    return filteredData.slice(start, start + POSTS_PER_PAGE);
  }, [filteredData, safePage]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [safePage]);

  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 my-10">
        {displayPosts.map((post: HomePost) => (
          <AnimationWrapper
            key={post.slug}
            keyValue={post.slug}
          >
            <BlogPostPreview post={post} />
          </AnimationWrapper>
        ))}
      </section>

      {totalPages > 1 && (
        <div className="flex justify-center my-10">
          <Pagination
            totalPages={totalPages}
            currentPage={safePage}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </>
  );
};

export default BlogPosts;
