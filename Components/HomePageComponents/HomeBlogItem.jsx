"use client";
import Image from "next/image";
import Link from "next/link";
import { assets } from "@/Assets/assets";
import { CldImage } from "next-cloudinary";

const HomeBlogItem = ({
  title,
  description,
  category,
  cloudinaryImageId,
  id,
}) => {
  return (
    <div className="post">
      <div className="img">
        <Link href={"/blogs/" + id}>
          <CldImage
            src={cloudinaryImageId}
            alt="blog image"
            className="w-full max-h-[400px] object-cover"
            width={600}
            height={600}
            priority={true}
          />
        </Link>
      </div>
      <div className="content">
        <h1 className="text-3xl">{title}</h1>
        <p
          className="text-md"
          dangerouslySetInnerHTML={{ __html: description.slice(0, 120) }}
        ></p>
        <a href={"/blogs/" + id}>Devamı..</a>
      </div>
    </div>
  );
};

export default HomeBlogItem;
