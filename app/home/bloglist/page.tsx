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
        <div className="flex flex-col mx-4 md:mx-0 md:w-11/12 ld:w-10/11 2xl:w-2/3 mb-10">
          <Main allPosts={allPosts} />
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
