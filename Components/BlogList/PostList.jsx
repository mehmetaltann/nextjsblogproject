import PostCard from "./PostCard";

const PostList = ({ posts, type }) => {
  return (
    <div className="flex flex-col gap-4">
      {posts.map((item, index) => {
        return <PostCard key={index} data={item} />;
      })}
    </div>
  );
};

export default PostList;
