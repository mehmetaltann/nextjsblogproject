"use client";
import axios from "axios";
import SinglePageContent from "@/Components/SinglePostComponents/SinglePageContent";
import SinglePageMenu from "@/Components/SinglePostComponents/SinglePageMenu";
import { useEffect, useState } from "react";

const page = ({ params }) => {
  const [data, setData] = useState(null);
  const [comments, setComments] = useState(null);

  const fetchBlogData = async () => {
    const response = await axios.get("/api/blog", {
      params: { id: params.id },
    });
    setData(response.data);
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
    <div className="flex gap-[50px] w-2/3">
      <SinglePageContent
        data={data}
        comments={comments}
        fetchCommentData={fetchCommentData}
      />
      <SinglePageMenu />
    </div>
  ) : (
    <></>
  );
};

export default page;
