"use client";
import axios from "axios";
import SingleBlog from "@/Components/SinglePage/SingleBlog";
import { useEffect, useState } from "react";

const page = ({ params }) => {
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
    <div className="flex flex-col gap-3 mb-16 w-2/3 mt-2">
      <SingleBlog
        data={data}
        comments={comments}
        fetchCommentData={fetchCommentData}
      />
    </div>
  ) : (
    <></>
  );
};

export default page;
