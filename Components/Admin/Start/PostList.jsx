"use client";
import PostListItem from "./PostListItem";

const PostList = ({ posts, deleteBlog }) => {
  return (
    <div className="flex flex-col gap-2">
      {posts.map((post) => {
        return (
          <PostListItem key={post._id} post={post} deleteBlog={deleteBlog} />
        );
      })}
    </div>
  );
};

export default PostList;
