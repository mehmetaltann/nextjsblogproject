"use client";
import Link from "next/link";
import parse from "html-react-parser";
import { CldImage } from "next-cloudinary";
import { formatDate } from "date-fns";

const BlogPostPreview = ({
  title,
  description,
  cloudinaryImageId,
  id,
  date,
}) => {
  return (
    <div className="break-words">
      <Link href={"/home/blogs/" + id}>
        <div className="aspect-[16/9] relative">
          <CldImage
            src={cloudinaryImageId}
            alt={title}
            className="object-cover"
            priority={true}
            fill={true}
            sizes="100w"
          />
        </div>
      </Link>
      <div className="grid grid-cols-1 gap-3 md:col-span-2 mt-4">
        <h2 className="font-sans font-semibold tracking-tighter text-primary-txt text-2xl md:text-3xl">
          <Link href={"/home/blogs/" + id}>{title}</Link>
        </h2>
        <div className="prose lg:prose-lg italic tracking-tighter text-muted-foreground">
          {formatDate(date, "dd MMMM yyyy")}
        </div>
        <div className="prose lg:prose-lg leading-relaxed md:text-lg line-clamp-4 text-muted-foreground">
          {parse(description)}
        </div>
      </div>
    </div>
  );
};

export default BlogPostPreview;

/* 
<div className="text-sm text-muted-foreground">
          {post.tags.map((tag) => (
            <div key={tag.id} className="mr-2 inline-block">
              <Link href={`/tag/${tag.name}`}>#{tag.name}</Link>
            </div>
          ))}
        </div>

*/
