"use client";
import Link from "next/link";
import parse from "html-react-parser";
import { ClientContext } from "@/store/ClientContext";
import { CldImage } from "next-cloudinary";
import { useContext } from "react";
import { getFormatDate } from "@/lib/utils/helpers";
import { HomePost } from "@/lib/types/types";

interface BlogPostPreviewProps {
  post: HomePost;
}

const BlogPostPreview = ({ post }: BlogPostPreviewProps) => {
  const context = useContext(ClientContext);
  if (!context) throw new Error("ClientContext gerekli");

  const { setSelectedCategory } = context;

  return (
    <article className="group flex flex-col gap-4 sm:gap-5 transition md:hover:-translate-y-1 md:transition-transform duration-300">
      
      {/* IMAGE */}
      <Link href={`/home/blog/${post.slug}`} className="block">
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl bg-gray-100">
          <CldImage
            src={post.cloudinaryImageId}
            alt={post.title}
            fill
            className="object-cover md:transition-transform md:duration-500 md:ease-out md:group-hover:scale-[1.05]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </Link>

      {/* CONTENT */}
      <div className="space-y-2 sm:space-y-3">
        
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight text-zinc-900">
          <Link
            href={`/home/blog/${post.slug}`}
            className="transition-colors hover:text-color1"
          >
            {post.title}
          </Link>
        </h2>

        <p className="text-xs sm:text-sm text-muted-foreground">
          {getFormatDate(post.date)}
        </p>

        <div className="text-sm sm:text-base text-muted-foreground leading-relaxed line-clamp-3 sm:line-clamp-4">
          {parse(post.description)}
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm pt-1">
          {post.category.map((cat) => (
            <Link
              key={cat.name}
              href="/home/bloglist"
              onClick={() => setSelectedCategory(cat.name)}
              className="text-muted-foreground transition-colors hover:text-color1"
            >
              #{cat.name}
            </Link>
          ))}
        </div>

      </div>
    </article>
  );
};

export default BlogPostPreview;
