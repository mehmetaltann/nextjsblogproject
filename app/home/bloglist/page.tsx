import Main from "@/Components/BlogList/Main";
import { Loader } from "@/Components/Layouts/Loader";
import { fetchHomePosts } from "@/app/actions/fetchDatas";
import { HomePost } from "@/lib/types/types";

export const metadata = {
  title: "Blog Listesi",
};

export default async function BlogList() {
  const allPosts = (await fetchHomePosts()) as HomePost[];

  return (
    <>
      {allPosts && allPosts.length > 0 ? (
        <Main allPosts={allPosts} />
      ) : (
        <Loader />
      )}
    </>
  );
}
