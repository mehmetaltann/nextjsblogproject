import { PostType } from "@/lib/types/types";
import SimilarPostItem from "./SimilarPostItem";

interface SimilarPostsProps {
  similarposts: PostType[];
  displayCount?: number;
}

const SimilarPosts = ({
  similarposts,
  displayCount = 2,
}: SimilarPostsProps) => {
  if (!similarposts || similarposts.length === 0) return null;

  const postsToShow = similarposts.slice(0, displayCount);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {postsToShow.map((post) => (
        <SimilarPostItem key={post.slug} post={post} />
      ))}
    </div>
  );
};

export default SimilarPosts;
