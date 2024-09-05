"use client";
import PostCard from "./PostCard";

const PostList = ({ posts }) => {
  return (
    <div className="flex-[5] flex flex-col gap-5 sm:min-w-[400px] md:min-w-[600px] max-w-[600px] pb-6">
      {posts.map((item, index) => {
        return <PostCard key={index} data={item} />;
      })}
    </div>
  );
};

export default PostList;
