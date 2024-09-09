"use client";
import PostList from "@/Components/BlogList/PostList";
import TagsTable from "@/Components/BlogList/TagsTable";
import AnimationWrapper from "@/Components/Layouts/AnimationWrapper";
import Pagination from "@/Components/Layouts/Pagination";
import axios from "axios";
import { useState, useContext, useEffect, useCallback } from "react";
import { ClientContext } from "@/store/ClientContext";
import { getAttCount } from "@/lib/utils/helpers";

const page = ({ type }) => {
  const { allPosts, setAllPosts, selectedCategory, setSelectedCategory } =
    useContext(ClientContext);

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  const fetchPosts = useCallback(async () => {
    const response = await axios.get("/api/blog");
    setAllPosts(response.data.blogs);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, []);

  //Category List
  const categoryCountObj = getAttCount(allPosts);

  const filteredPosts = allPosts.filter((item) =>
    selectedCategory === "Tümü"
      ? true
      : item.category.some((insItem) => insItem.name === selectedCategory)
  );

  //Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const displayPosts = filteredPosts.slice(startIndex, endIndex);
  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <AnimationWrapper
      keyValue={type}
      className="flex flex-col justify-center px-3 md:px-0 md:w-2/4 lg:min-w-[820px] w-full sm:flex-row mt-4 gap-4 md:gap-8"
    >
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
    </AnimationWrapper>
  );
};

export default page;
