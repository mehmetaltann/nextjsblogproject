import ManagePost from "@/Components/Admin/Dashboard/ManagePost";
import { Loader } from "@/Components/Layouts/Loader";
import { Suspense } from "react";
import { fetchPosts } from "../actions/fetchDatas";
import { PostType } from "@/lib/types/types";

export default async function Admin() {
  const allPosts = (await fetchPosts()) as PostType[];

  if (!allPosts) return <Loader />;

  return (
    <Suspense fallback={<Loader />}>
      <ManagePost allPosts={allPosts} />
    </Suspense>
  );
}
