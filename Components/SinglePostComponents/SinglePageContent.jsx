"use client";
import { useContext } from "react";
import moment from "moment";
import Image from "next/image";
import Comments from "./Comments";
import SocialMediaShareSet from "../Layouts/SocialMediaShareSet";
import Link from "next/link";
import { BlogContext } from "@/store/BlogContext";
import { CldImage } from "next-cloudinary";
import { assets } from "@/Assets/assets";
import { useSession } from "next-auth/react";
import "moment/locale/tr";

const SinglePageContent = ({ data, comments, fetchCommentData }) => {
  const postDate = moment(data.date).format("Do MMMM YYYY");
  const gecenZaman = moment(data.date).startOf("day").fromNow();
  const { data: session } = useSession();
  const { blogCont, setBlogCont } = useContext(BlogContext);

  return (
    <>
      <CldImage
        src={data.cloudinaryImageId}
        alt="blog Image"
        width={1200}
        height={720}
        className="w-full h-[500px] object-cover rounded-md"
      />
      <div className="flex items-center gap-2.5 text-sm">
        <Image
          src={assets.profile_icon}
          width={50}
          alt="profile_icon_side"
          id="avatarButton"
          type="button"
          className="w-[50px] h-[50px] object-cover rounded-[50%]"
        />

        <div>
          <span className="font-[bold]">Mehmet Altan</span>
          <p>
            <span className="font-semibold">{gecenZaman}</span> - {postDate}
          </p>
        </div>

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

        <div className="flex justify-center items-center  gap-2 ">
          {data.category.map((item, index) => {
            return (
              <div className="py-2 px-2 border rounded-xl " key={index}>
                {item.name}
              </div>
            );
          })}
        </div>
      </div>
      <h1 className="text-[42px] text-[#333]">{data.title}</h1>
      <p
        className="text-justify leading-[30px]"
        dangerouslySetInnerHTML={{ __html: data.description }}
      ></p>
      <SocialMediaShareSet
        shareURL={`http://localhost:3000/blogs/${data._id}`}
        title={data.title}
      />
      <Comments
        postId={data._id}
        comments={comments}
        fetchCommentData={fetchCommentData}
        postTitle={data.title}
      />
    </>
  );
};

export default SinglePageContent;
