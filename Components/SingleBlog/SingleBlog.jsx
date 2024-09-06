"use client";
import moment from "moment";
import Comments from "./Comments";
import SocialMediaShareSet from "../Layouts/SocialMediaShareSet";
import parse from "html-react-parser";
import { CldImage } from "next-cloudinary";

import "moment/locale/tr";

const SingleBlog = ({ data, comments, fetchCommentData, randomNumber }) => {
  const postDate = moment(data.date).format("Do MMMM YYYY");
  
  return (
    <div className="relative m-auto flex max-w-[820px] flex-col items-start">
      {/* Blog Başlık */}
      <h1 className="mb-8 text-3xl font-extrabold leading-tight tracking-tighter text-color1 md:text-4xl">
        {data.title}
      </h1>
      {/* Blog Resim */}
      <div className="mb-4 w-full overflow-hidden rounded-xl">
        <CldImage
          src={data.cloudinaryImageId}
          alt={data.title}
          width={960}
          height={720}
          className="aspect-video w-full object-cover"
          priority={true}
        />
      </div>
      {/* Yazar Bilgileri */}
      <div className="mb-4 md:flex">
        <div className="mb-4 flex flex-col">
          {/* Yazı Tarihi */}
          <span className="text-zinc-500">{postDate}</span>
        </div>
        <div className="flex gap-2 items-center justify-center md:absolute md:right-0">
          <div>
            {data.category.map((item, index) => {
              return (
                <span
                  className={`mb-1 mr-1 rounded-xl px-3 py-1 opacity-60 hover:opacity-100 text-color${randomNumber}`}
                  key={index}
                >
                  #{item.name}
                </span>
              );
            })}
          </div>
        </div>
      </div>
      {/*  Blog Yazısı */}
      <p className="space-y-4 text-zinc-700 mb-4">{parse(data.description)}</p>
      {/*  Paylaş Butonları */}
      <div className="mt-2">
        <SocialMediaShareSet
          shareURL={`http://localhost:3000/blogs/${data._id}`}
          title={data.title}
          size={24}
        />
      </div>
      {/*  Yorumlar */}
      <hr />
      <Comments
        postId={data._id}
        comments={comments}
        fetchCommentData={fetchCommentData}
        postTitle={data.title}
        className="mt-10"
      />
    </div>
  );
};

export default SingleBlog;
