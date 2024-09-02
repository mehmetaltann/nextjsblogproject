"use client";
import moment from "moment";
import Image from "next/image";
import Comments from "./Comments";
import SocialMediaShareSet from "../Layouts/SocialMediaShareSet";
import Link from "next/link";
import randomColor from "randomcolor";
import { useContext } from "react";
import { BlogContext } from "@/store/BlogContext";
import { CldImage } from "next-cloudinary";
import { assets } from "@/Assets/assets";
import { useSession } from "next-auth/react";
import "moment/locale/tr";

const SingleBlog = ({ data, comments, fetchCommentData }) => {
  const postDate = moment(data.date).format("Do MMMM YYYY");
  const gecenZaman = moment(data.date).startOf("day").fromNow();
  const { data: session } = useSession();
  const { setBlogCont } = useContext(BlogContext);

  return (
    <section className="m-auto grid items-center pb-8 md:container">
      <div className="relative m-auto flex max-w-[750px] flex-col items-start">
        {/* Başlık */}
        <h1 className="mb-6 text-3xl font-extrabold leading-tight tracking-tighter text-black dark:text-white md:text-4xl">
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
          />
        </div>
        {/* Yazar Bilgileri */}
        <div className="mb-4 md:flex">
          <div className="mb-4 flex flex-col">
            {/* Yazı Tarihi */}
            <span className="text-zinc-500 dark:text-zinc-400">{postDate}</span>
          </div>
          <div className="flex gap-2 items-center justify-center md:absolute md:right-0">
            <div>
              {data.category.map((item, index) => {
                var color = randomColor({ luminosity: "light" });
                const categoryBackgroundColor = `${color}`;
                return (
                  <span
                    style={{
                      borderColor: categoryBackgroundColor,
                      border: `1px solid ${color}`,
                    }}
                    className="mb-1 mr-1 rounded-xl px-3 py-1 text-black/70 dark:text-white/70"
                    key={index}
                  >
                    {item.name}
                  </span>
                );
              })}
            </div>
            <div>
              {/* Yazı Edit */}
              {session && (
                <div className="flex gap-2">
                  <Link
                    href={"/admin/write"}
                    onClick={async () => await setBlogCont(data)}
                  >
                    <Image
                      src={assets.edit}
                      width={20}
                      height={20}
                      alt="editbutton"
                      id="editbutton"
                      type="button"
                      className="cursor-pointer"
                    />
                  </Link>
                  <Link href={"/addProduct"}>
                    <Image
                      src={assets.deleteIcon}
                      width={20}
                      height={20}
                      alt="deletebutton"
                      id="deletebutton"
                      type="button"
                      className="cursor-pointer"
                    />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        {/*  Blog Yazısı */}
        <p
          className="space-y-4 text-zinc-700 mb-4 dark:text-zinc-300"
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></p>

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
    </section>
  );
};

export default SingleBlog;
