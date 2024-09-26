import PostCard from "./PostCard";
import { PostType } from "@/lib/types/types";

interface PostListProps {
  posts: PostType[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div className="flex flex-col gap-4">
      {posts.map((item) => (
        <PostCard key={item._id} data={item} />
      ))}
    </div>
  );
};

export default PostList;
