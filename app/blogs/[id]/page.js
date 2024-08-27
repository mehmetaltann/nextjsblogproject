"use client";
import axios from "axios";
import SinglePageContent from "@/Components/SinglePostComponents/SinglePageContent";
import SinglePageMenu from "@/Components/SinglePostComponents/SinglePageMenu";
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
    <div className="flex flex-col mb-4 md:mb-0 md:flex-row md:gap-[50px] w-2/3">
      <div className="flex-[5] flex flex-col gap-5 mb-16">
        <SinglePageContent
          data={data}
          comments={comments}
          fetchCommentData={fetchCommentData}
        />
      </div>
      <div className="flex-[2] flex flex-col gap-[20px]">
        <SinglePageMenu similarPostsData={similarPostsData} />
      </div>
    </div>
  ) : (
    <></>
  );
};

export default page;
