"use client";

import Comments from "./Comments/Comments";
import SocialMediaShareSet from "../Layouts/SocialMediaShareSet";
import parse from "html-react-parser";
import SimilarPosts from "./SimilarPosts";
import { CldImage } from "next-cloudinary";
import { getFormatDate } from "@/lib/utils/helpers";
import { CommentType, PostType } from "@/lib/types/types";

interface SingleBlogProps {
  blog: PostType;
  sameCategoryBlogs: PostType[];
  siteUrl: string;
  comments: CommentType[];
}

const SingleBlog = ({
  blog,
  sameCategoryBlogs,
  comments,
  siteUrl,
}: SingleBlogProps) => {
  const filteredBlogs = sameCategoryBlogs.filter(
    (item) => item._id !== blog._id,
  );

  const normalizedHtml = blog.description
    .replace(/,\s*"/g, '"')
    .replace(/,\s*>/g, ">")
    .replace(/width=['"]100%['"],?/g, 'width="100%"');

  return (
    <div className="w-full px-4 py-6">
      <div className="mx-auto max-w-3xl w-full">
        <header className="mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight text-zinc-900">
            {blog.title}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span>{getFormatDate(blog.date)}</span>

            <span className="h-1 w-1 rounded-full bg-zinc-400" />

            {blog.category.map((item) => (
              <span
                key={item.name}
                className="hover:text-zinc-900 transition-colors"
              >
                #{item.name}
              </span>
            ))}
          </div>
        </header>

        {blog.cloudinaryImageId && (
          <div
            className="mb-6 w-full overflow-hidden rounded-xl
                  max-h-[320px] sm:max-h-[380px] md:max-h-[460px] lg:max-h-[520px]"
          >
            <CldImage
              src={blog.cloudinaryImageId}
              alt={blog.title}
              width={1200}
              height={800}
              className="w-full h-auto object-cover"
              sizes="(max-width: 768px) 100vw, 900px"
              priority
            />
          </div>
        )}

        <article
          className="
                      prose prose-sm sm:prose-base lg:prose-lg
                      prose-zinc mt-8 max-w-none
                      prose-headings:font-semibold
                      prose-p:leading-relaxed
                      prose-a:text-color1
                      prose-a:no-underline hover:prose-a:underline
                      prose-img:rounded-xl
                      prose-img:max-w-full
                      prose-pre:overflow-x-auto
                      prose-code:break-words
                      break-words
                    "
          dangerouslySetInnerHTML={{ __html: normalizedHtml }}
        />
        <div className="mt-8 pt-6 border-t border-zinc-200 flex justify-center">
          <SocialMediaShareSet
            shareURL={`${siteUrl}/home/blog/${blog.slug}`}
            title={blog.title}
            size={20}
          />
        </div>

        <section className="mx-auto w-full max-w-3xl px-4 mt-8">
          <Comments
            postId={blog._id}
            postTitle={blog.slug}
            comments={comments}
          />
        </section>
      </div>

      {filteredBlogs.length > 0 && (
        <section className="mx-auto w-full max-w-4xl px-4 mt-6 pt-10 border-t border-zinc-200">
          <SimilarPosts similarposts={filteredBlogs} />
        </section>
      )}
    </div>
  );
};

export default SingleBlog;
