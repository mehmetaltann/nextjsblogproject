"use client";
import axios from "axios";
import SingleBlog from "@/Components/SingleBlog/SingleBlog";
import AnimationWrapper from "@/Components/Layouts/AnimationWrapper";
import { useEffect, useState } from "react";

const page = ({ params, type }) => {
  const [data, setData] = useState(null);
  const [similarPostsData, setSimilarPostsData] = useState(null);
  const [comments, setComments] = useState(null);

  const fetchBlogData = async () => {
    const response = await axios.get("/api/blog", {
      params: { id: params.id },
    });
    setData(response.data.blog);
    setSimilarPostsData(response.data.sameCategoryFilteredData);
  };

  const fetchCommentData = async () => {
    const response = await axios.get("/api/comment", {
      params: { id: params.id },
    });
    setComments(response.data);
  };

  useEffect(() => {
    fetchBlogData();
    fetchCommentData();
  }, []);

  return data ? (
    <AnimationWrapper
      keyValue={type}
      className="mb-10 mt-6 items-center w-full px-3 md:px-0 md:w-3/4 lg:w-2/4"
    >
      <SingleBlog
        data={data}
        comments={comments}
        fetchCommentData={fetchCommentData}
        similarPostsData={similarPostsData}
      />
    </AnimationWrapper>
  ) : (
    <></>
  );
};

export default page;
