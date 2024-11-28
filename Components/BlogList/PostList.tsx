import PostCard from "./PostCard";
import { HomePost } from "@/lib/types/types";

interface PostListProps {
  posts: HomePost[];
}

const PostList = ({ posts }: PostListProps) => {
  return (
    <div className="flex flex-col gap-4">
      {posts.map((item, index) => (
        <PostCard key={index} data={item} />
      ))}
    </div>
  );
};

export default PostList;
