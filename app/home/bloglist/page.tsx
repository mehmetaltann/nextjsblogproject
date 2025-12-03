import Main from "@/Components/BlogList/Main";
import { Loader } from "@/Components/Layouts/Loader";
import { fetchHomePosts } from "@/app/actions/fetchDatas";
import { HomePost } from "@/lib/types/types";

export const metadata = {
  title: "Blog Listesi",
};

export default async function BlogList() {
  let allPosts: HomePost[] = [];

  try {
    const fetchedPosts = (await fetchHomePosts()) as HomePost[];
    if (fetchedPosts) {
      allPosts = fetchedPosts;
    }
  } catch (error) {
    console.error("Blog gönderileri çekilemedi:", error);
  }

  if (allPosts.length === 0) {
    return <Loader />;
  }

  return <Main allPosts={allPosts} />;
}
