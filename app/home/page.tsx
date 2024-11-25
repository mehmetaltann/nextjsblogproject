import BlogPosts from "@/Components/Home/BlogPosts";
import { Loader } from "@/Components/Layouts/Loader";
import { Suspense } from "react";
import { fetchPosts } from "../actions/fetchDatas";
import { PostType } from "@/lib/types/types";

const Home = async (): Promise<JSX.Element> => {
  const allPosts = (await fetchPosts()) as PostType[];

  if (!allPosts) return <Loader />;

  const filteredPosts = allPosts.filter((item) => item.isHome);

  return (
    <Suspense fallback={<Loader />}>
      <div className="flex flex-col mx-4 md:mx-0 md:w-5/6 lg:w-3/4 xl:w-2/3 mb-10">
        <BlogPosts filteredPosts={filteredPosts} />
      </div>
    </Suspense>
  );
};

export default Home;
