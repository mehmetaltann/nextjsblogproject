"use client";
import Comments from "./Comments";
import SocialMediaShareSet from "../Layouts/SocialMediaShareSet";
import parse from "html-react-parser";
import SimilarPosts from "./SimilarPosts";
import { CldImage } from "next-cloudinary";
import { getFormatDate } from "@/lib/utils/helpers";

const SingleBlog = ({ data, comments, fetchCommentData, similarPostsData }) => {
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
          <span className="text-zinc-500">{getFormatDate(data.date)}</span>
        </div>
        <div className="flex items-center justify-center md:absolute md:right-0">
          <div>
            {data.category.map((item, index) => {
              return (
                <span
                  className={`mb-1 mr-1 rounded-xl px-1 py-1 opacity-60 hover:opacity-100 text-color6`}
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
      {comments ? (
        <Comments
          postId={data._id}
          comments={comments}
          fetchCommentData={fetchCommentData}
          postTitle={data.title}
          className="mt-10 mb-2"
        />
      ) : (
        <div className=" text-[#333]">
          Bu gönderiye henüz hiç bir youm yapılmamıştır
        </div>
      )}

      {/*  Benzer Yazılar */}
      <hr />
      <div className="mt-2 font-semibold mb-2 text-lg">Benzer Yazılar</div>
      <SimilarPosts similarPostsData={similarPostsData} />
    </div>
  );
};

export default SingleBlog;
