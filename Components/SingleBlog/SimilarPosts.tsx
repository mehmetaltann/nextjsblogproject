import dynamic from "next/dynamic";
import { PostType } from "@/lib/types/types";

const SimilarPostItem = dynamic(() => import("./SimilarPostItem"), {
  ssr: false,
  loading: () => <p>Bekleyiniz ...</p>,
});

interface SimilarPostsProps {
  similarposts: PostType[];
  displayCount?: number;
}

const SimilarPosts = ({
  similarposts,
  displayCount = 2,
}: SimilarPostsProps) => {
  if (!similarposts || similarposts.length === 0) return <div></div>;

  const shuffled = [...similarposts].sort(() => 0.5 - Math.random());

  return (
    <div className="flex flex-col w-full md:flex-row gap-2">
      {shuffled.slice(0, displayCount).map((post) => (
        <SimilarPostItem key={post._id} post={post} />
      ))}
    </div>
  );
};

export default SimilarPosts;
