import ManagePost from "@/Components/Admin/Dashboard/ManagePost";
import { Loader } from "@/Components/Layouts/Loader";
import { Suspense } from "react";
import { fetchPosts } from "../actions/fetchDatas";

export default async function Admin() {
  const { allPosts } = await fetchPosts();

  return (
    <Suspense fallback={<Loader />}>
      <ManagePost allPosts={allPosts} />
    </Suspense>
  );
}
