import ManagePost from "@/Components/Admin/Dashboard/ManagePost";
import BlogModel from "@/lib/models/BlogModel";
import { Loader } from "@/Components/Layouts/Loader";
import { Suspense } from "react";

export default async function Admin() {
  const posts = await BlogModel.find({}).sort({ date: -1 });
  const allPosts = JSON.parse(JSON.stringify(posts));

  return (
    <Suspense fallback={<Loader />}>
      <ManagePost allPosts={allPosts} />
    </Suspense>
  );
}
