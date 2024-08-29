"use client";
import Link from "next/link";
import { CldImage } from "next-cloudinary";

const HomeBlogItem = ({ title, description, cloudinaryImageId, id }) => {
  return (
    <div className="post">
      <div className="img">
        <Link href={"/home/blogs/" + id}>
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
        <a href={"/home/blogs/" + id}>Devamı..</a>
      </div>
    </div>
  );
};

export default HomeBlogItem;
