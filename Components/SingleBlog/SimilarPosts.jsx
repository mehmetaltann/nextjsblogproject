import SimilarPostItem from "./SimilarPostItem";

const SimilarPosts = ({ similarPostsData }) => {
  const shuffled = similarPostsData.sort(() => 0.5 - Math.random());

  return (
    <div className="flex flex-col w-full md:flex-row gap-2">
      {shuffled.slice(0, 2).map((post) => (
        <SimilarPostItem key={post._id} post={post} />
      ))}
    </div>
  );
};

export default SimilarPosts;
