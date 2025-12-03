import ManagePost from "@/Components/Admin/Dashboard/ManagePost";
import { Loader } from "@/Components/Layouts/Loader";
import { fetchPosts } from "../actions/fetchDatas";
import { PostType } from "@/lib/types/types";

export default async function Admin() {
  let allPosts: PostType[] = [];

  try {
    const fetchedPosts = (await fetchPosts()) as PostType[];
    if (fetchedPosts) {
      allPosts = fetchedPosts;
    }
  } catch (error) {
    console.error("Yönetici gönderileri çekilemedi:", error);
  }

  if (allPosts.length === 0) {
    return <Loader />;
  }

  return <ManagePost allPosts={allPosts} />;
}
