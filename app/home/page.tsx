import BlogPosts from "@/Components/Home/BlogPosts";
import { Loader } from "@/Components/Layouts/Loader";
import { fetchHomePosts } from "../actions/fetchDatas";
import { HomePost } from "@/lib/types/types";

export default async function Home() {
  let allPosts: HomePost[] = [];

  try {
    const fetchedPosts = (await fetchHomePosts()) as HomePost[];
    if (fetchedPosts) {
      allPosts = fetchedPosts;
    }
  } catch (error) {
    console.error("Anasayfa gönderileri çekilemedi:", error);
  }

  return (
    <>
      {allPosts && allPosts.length > 0 ? (
        <div className="flex flex-col mx-4 md:mx-0 md:w-11/12 ld:w-10/12 2xl:w-2/3 mb-10">
          <BlogPosts allPosts={allPosts} />
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
