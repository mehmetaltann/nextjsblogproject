"use client";
import Footer from "@/Components/Layouts/Footer";
import axios from "axios";
import Header from "@/Components/Layouts/Header";
import Comments from "@/Components/BlogDetailComponents/Comments";
import SocialMediaShareSet from "@/Components/Layouts/SocialMediaShareSet";
import { CldImage } from "next-cloudinary";
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
    <>
      <Header />
      <div className="flex flex-col bg-gray-200 py-5 px-5 md:px-12 lg:px-28">
        <div className=" flex flex-col first-letter:mx-5 max-w-[1000px] md:mx-auto mb-10">
          <div>
            <CldImage
              src={data.cloudinaryImageId}
              alt="blog Image"
              width={1280}
              height={720}
              className="border-4 border-white"
            />
          </div>

          <div>
            <h1 className="text-center my-8 text-[26px] font-semibold">
              {data.title}
            </h1>
          </div>

          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: data.description }}
          ></div>

          <div className="my-5">
            <p className="text-black font-semibold my-4">Bu Yazıyı Paylaş</p>
            <SocialMediaShareSet
              shareURL={`http://localhost:3000/blogs/${params.id}`}
              title={data.title}
              size={36}
            />
          </div>
          <div>
            <Comments
              postId={params.id}
              postTitle={data.title}
              comments={comments}
              fetchCommentData={fetchCommentData}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <></>
  );
};

export default page;
