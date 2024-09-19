import PostCard from "./PostCard";
import AnimationWrapper from "@/Components/Layouts/AnimationWrapper";

const PostList = ({ posts, type }) => {
  return (
    <AnimationWrapper keyValue={type}>
      {posts.map((item, index) => {
        return <PostCard key={index} data={item} />;
      })}
    </AnimationWrapper>
  );
};

export default PostList;
