import BlogPosts from "@/Components/Home/BlogPosts";
import BlogModel from "@/lib/models/BlogModel";
import { Loader } from "@/Components/Layouts/Loader";
import { Suspense } from "react";

export default async function Home() {
  const posts = await BlogModel.find({}).sort({ date: -1 });
  const allPosts = JSON.parse(JSON.stringify(posts));

  return (
    <Suspense fallback={<Loader />}>
      <div className="flex flex-col mx-4 md:mx-0 md:w-5/6 lg:w-3/4 xl:w-2/3 mb-10">
        <BlogPosts allPosts={allPosts} />
      </div>
    </Suspense>
  );
}
