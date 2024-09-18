"use client";
import BlogPosts from "@/Components/Home/BlogPosts";

export default function Home() {
  return (
    <div className="flex flex-col mx-4 md:mx-0 md:w-5/6 lg:w-3/4 xl:w-2/3 mb-10">
      <BlogPosts />
    </div>
  );
}
