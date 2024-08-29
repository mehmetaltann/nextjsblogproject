import Link from "next/link";
import React from "react";
import { CldImage } from "next-cloudinary";

const SinglePageMenu = ({ similarPostsData }) => {
  return (
    <>
      <h1 className="text-xl text-[#555]">Beğenebileceğiniz Diğer Yazılar</h1>
      {similarPostsData.map(({ _id, title, cloudinaryImageId }) => (
        <div className="flex flex-col gap-2.5" key={_id}>
          <Link href={"/home/blogs/" + _id}>
            <CldImage
              src={cloudinaryImageId}
              alt="similar Pages image"
              width={200}
              height={200}
              className="w-full h-[200px] object-cover rounded-md"
              priority={true}
            />
          </Link>
          <h2 className="text-[#555]">{title}</h2>
          <a
            href={"/home/blogs/" + _id}
            className="w-max cursor-pointer text-[teal] bg-[white] border px-[15px] py-[7.5px] border-[none] border-solid border-[teal] hover:border hover:bg-[$lightGreen] hover:text-[#555] hover:border-b-gray-50 hover:border-[white]"
          >
            Devamını Oku ...
          </a>
        </div>
      ))}
    </>
  );
};

export default SinglePageMenu;
