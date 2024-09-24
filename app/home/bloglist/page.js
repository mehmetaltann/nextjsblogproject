import Main from "@/Components/BlogList/Main";
import { Loader } from "@/Components/Layouts/Loader";
import { Suspense } from "react";
import { fetchPosts } from "@/app/actions/fetchDatas";

export const metadata = {
  title: "Blog Listesi",
};

export default async function BlogList() {
  const { allPosts } = await fetchPosts();

  return (
    <Suspense fallback={<Loader />}>
      <Main allPosts={allPosts} />
    </Suspense>
  );
}
