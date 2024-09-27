"use client";
import Comments from "./Comments/Comments";
import SocialMediaShareSet from "../Layouts/SocialMediaShareSet";
import parse from "html-react-parser";
import SimilarPosts from "./SimilarPosts";
import AnimationWrapper from "@/Components/Layouts/AnimationWrapper";
import { CldImage } from "next-cloudinary";
import { getFormatDate } from "@/lib/utils/helpers";
import { CommentType, PostType } from "@/lib/types/types";

interface SingleBlogProps {
  blog: PostType;
  sameCategoryBlogs: PostType[];
  comments: CommentType[] | [];
}

const SingleBlog: React.FC<SingleBlogProps> = ({
  blog,
  sameCategoryBlogs,
  comments,
}) => {
  const filteredBlogsByCategory = sameCategoryBlogs.filter((item) => {
    return item.title !== blog.title;
  });

  return (
    <AnimationWrapper
      keyValue="singlePostPage"
      className="relative m-auto flex max-w-[820px] px-4 md:px-0 flex-col items-start my-8"
    >
      <h1 className="mb-8 text-3xl font-extrabold leading-tight tracking-tighter text-color1 md:text-4xl">
        {blog.title}
      </h1>
      <div className="mb-4 w-full overflow-hidden rounded-xl">
        <CldImage
          src={blog.cloudinaryImageId}
          alt={blog.title}
          width={960}
          height={720}
          className="aspect-video w-full object-cover"
          priority={true}
        />
      </div>
      <div className="mb-6 md:flex items-center">
        <div className="flex flex-col ">
          <span className="text-zinc-500">{getFormatDate(blog.date)}</span>
        </div>
        <div className="flex md:absolute mt-2 md:right-0  md:mt-0">
          <div>
            {blog.category.map((item, index) => (
              <span
                className={`mb-1 mr-1 rounded-xl px-1 py-1 opacity-60 hover:opacity-100 text-color6`}
                key={index}
              >
                #{item.name}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-4 text-zinc-700 mb-4">
        {parse(blog.description)}
      </div>
      <div className="mt-2 self-end">
        <SocialMediaShareSet
          shareURL={`http://localhost:3000/blogs/${blog._id}`}
          title={blog.title}
          size={20}
        />
      </div>
      <hr />
      <Comments postId={blog._id} postTitle={blog.title} comments={comments} />
      <div className="font-semibold text-xl py-4 opacity-80 text-color1">
        Benzer Yazılar
      </div>
      <SimilarPosts similarposts={filteredBlogsByCategory} />
    </AnimationWrapper>
  );
};

export default SingleBlog;
