"use client";
import axios from "axios";
import BlogPosts from "@/Components/Home/BlogPosts";
import Pagination from "@/Components/Layouts/Pagination";
import { usePagination } from "@/store/usePagination";
import { ClientContext } from "@/store/ClientContext";
import { useEffect, useContext, useCallback, useState, Suspense } from "react";
import { unstable_noStore } from "next/cache";
import { Loader } from "@/Components/Layouts/Loader";

export default function Home() {
  unstable_noStore();
  //data
  const { allPosts, setAllPosts } = useContext(ClientContext);

  const fetchBlogs = useCallback(async () => {
    const response = await axios.get("/api/blog");
    setAllPosts(response.data.blogs);
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const filteredPosts = allPosts.filter((item) => item.isHome && item);

  //Pagination
  const { totalPages, displayPosts, onPageChange, currentPage } = usePagination(
    filteredPosts,
    4
  );

  return (
    <div className="flex flex-col w-2/3 mb-10">
      <Suspense fallback={Loader}>
        <BlogPosts blogs={displayPosts} />
      </Suspense>

      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}
