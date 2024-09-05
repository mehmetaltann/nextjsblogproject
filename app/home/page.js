"use client";
import axios from "axios";
import BlogPosts from "@/Components/Home/BlogPosts";
import Pagination from "@/Components/Layouts/Pagination";
import { BlogContext } from "@/store/BlogContext";
import { useEffect, useContext, useCallback, useState } from "react";

export default function Home() {
  //data
  const { allBlogs, setAllBlogs } = useContext(BlogContext);

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;

  const fetchBlogs = useCallback(async () => {
    const response = await axios.get("/api/blog");
    setAllBlogs(response.data.blogs);
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, []);

  //Pagination
  const totalPages = Math.ceil(allBlogs.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const displayPosts = allBlogs.slice(startIndex, endIndex);
  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col w-2/3 mb-10">
      <BlogPosts blogs={displayPosts} />
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
