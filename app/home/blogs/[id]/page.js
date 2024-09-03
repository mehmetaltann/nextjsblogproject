"use client";
import axios from "axios";
import SingleBlog from "@/Components/SinglePage/SingleBlog";
import { useEffect, useState } from "react";

const numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

const page = ({ params }) => {
  const [data, setData] = useState(null);
  const [randomNumber, setRandomNumber] = useState("");
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
    setRandomNumber(
      numberArray[Math.floor(Math.random() * numberArray.length)]
    );
  }, []);

  return data ? (
    <div className="flex flex-col gap-3 mb-16 min-w-full mt-2">
      <SingleBlog
        data={data}
        comments={comments}
        fetchCommentData={fetchCommentData}
        randomNumber={randomNumber}
      />
    </div>
  ) : (
    <></>
  );
};

export default page;
