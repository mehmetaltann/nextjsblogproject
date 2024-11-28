import ManagePost from "@/Components/Admin/Dashboard/ManagePost";
import { Loader } from "@/Components/Layouts/Loader";
import { fetchPosts } from "../actions/fetchDatas";
import { PostType } from "@/lib/types/types";

export default async function Admin() {
  const allPosts = (await fetchPosts()) as PostType[];

  return (
    <>
      {allPosts && allPosts.length > 0 ? (
        <ManagePost allPosts={allPosts} />
      ) : (
        <Loader />
      )}
    </>
  );
}
