import Main from "@/Components/BlogList/Main";
import { Loader } from "@/Components/Layouts/Loader";
import { fetchPosts } from "@/app/actions/fetchDatas";
import { PostType } from "@/lib/types/types";

export const metadata = {
  title: "Blog Listesi",
};

export default async function BlogList() {
  const allPosts = (await fetchPosts()) as PostType[];

  if (!allPosts) return <Loader />;

  return <>{allPosts.length > 0 ? <Main allPosts={allPosts} /> : <Loader />}</>;
}
