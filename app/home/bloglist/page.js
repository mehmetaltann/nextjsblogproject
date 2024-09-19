import BlogModel from "@/lib/models/BlogModel";
import Main from "@/Components/BlogList/Main";
import { Loader } from "@/Components/Layouts/Loader";
import { Suspense } from "react";

export default async function BlogList() {
  const posts = await BlogModel.find({}).sort({ date: -1 });
  const allPosts = JSON.parse(JSON.stringify(posts));

  return (
    <Suspense fallback={<Loader />}>
      <Main allPosts={allPosts} />
    </Suspense>
  );
}
