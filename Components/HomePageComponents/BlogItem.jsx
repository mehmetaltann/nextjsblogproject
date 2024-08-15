"use client";
import Image from "next/image";
import Link from "next/link";
import { assets } from "@/Assets/assets";
import { CldImage } from "next-cloudinary";

const BlogItem = ({ title, description, category, cloudinaryImageId, id }) => {
  return (
    <div
      className="max-w-[330px] sm:max-w-[300px]
     bg-white border border-black hover:shadow-[-7px_7px_0px_#000000]"
    >
      <Link href={"/blogs/" + id}>
        <CldImage
          src={cloudinaryImageId}
          alt="blog image"
          width={400}
          height={400}
          className="border-b border-black"
          priority={true}
        />
      </Link>
      {category.map((item,index) => {
        return (
          <p
            key={index}
            className="ml-5 mt-5 px-1 inline-block bg-black text-white text-sm"
          >
            {item.name}
          </p>
        );
      })}
      <div className="p-5">
        <h5 className="mb-2 text-lg font-medium tracking-tight text-gray-900">
          {title}
        </h5>
        <p
          className="mb-3 text-sm tracking-tight text-gray-700"
          dangerouslySetInnerHTML={{ __html: description.slice(0, 120) }}
        ></p>
        <Link
          href={"/blogs/" + id}
          className="inline-flex items-center py-2 font-semibold text-center"
        >
          Devamı
          <Image
            src={assets.arrow}
            alt="devamı oku"
            width={12}
            className="ml-4"
          />
        </Link>
      </div>
    </div>
  );
};

export default BlogItem;
