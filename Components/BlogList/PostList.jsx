import PostCard from "./PostCard";

const PostList = ({ posts }) => {
  return (
    <>
      {posts.map((item, index) => {
        return <PostCard key={index} data={item} />;
      })}
    </>
  );
};

export default PostList;
