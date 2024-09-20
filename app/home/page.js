import BlogPosts from "@/Components/Home/BlogPosts";
import { Loader } from "@/Components/Layouts/Loader";
import { Suspense } from "react";
import { fetchPosts } from "../actions/fetchDatas";

export default async function Home() {
  const { allPosts } = await fetchPosts();

  return (
    <Suspense fallback={<Loader />}>
      <div className="flex flex-col mx-4 md:mx-0 md:w-5/6 lg:w-3/4 xl:w-2/3 mb-10">
        <BlogPosts allPosts={allPosts} />
      </div>
    </Suspense>
  );
}
