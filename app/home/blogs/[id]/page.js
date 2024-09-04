"use client";
import axios from "axios";
import SingleBlog from "@/Components/SingleBlog/SingleBlog";
import AnimationWrapper from "@/Components/Layouts/AnimationWrapper";
import { useEffect, useState, Suspense } from "react";
import { Loader } from "@/Components/Layouts/Loader";

const numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

const page = ({ params, type }) => {
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
    <Suspense fallback={<Loader />}>
      <AnimationWrapper
        keyValue={type}
        className="flex flex-col gap-3 mb-16 min-w-full mt-2"
      >
        <SingleBlog
          data={data}
          comments={comments}
          fetchCommentData={fetchCommentData}
          randomNumber={randomNumber}
        />
      </AnimationWrapper>
    </Suspense>
  ) : (
    <></>
  );
};

export default page;
