import PostCard from "./PostCard";
import { HomePost } from "@/lib/types/types";

interface PostListProps {
  posts: HomePost[];
}

const PostList = ({ posts }: PostListProps) => {
  return (
    <div className="flex flex-col gap-6">
      {posts.map((item) => (
        <PostCard key={item.slug} data={item} />
      ))}
    </div>
  );
};

export default PostList;
