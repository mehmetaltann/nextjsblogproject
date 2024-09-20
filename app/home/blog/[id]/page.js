import SingleBlog from "@/Components/SingleBlog/SingleBlog";
import { Loader } from "@/Components/Layouts/Loader";
import { Suspense } from "react";
import { unstable_cache } from "next/cache";
import {
  fetchComment,
  fetchBlogAndSimilarPosts,
} from "@/app/actions/fetchDatas";

const cachedFetchCommentData = unstable_cache(fetchComment, (id) => [id], {
  revalidate: 120,
  tags: ["comments"],
});

export default async function Blog({ params }) {
  const { id } = params;
  const { blog, sameCategoryBlogs } = await fetchBlogAndSimilarPosts(id);
  const comments = await cachedFetchCommentData(id);

  return (
    <Suspense fallback={<Loader />}>
      <SingleBlog
        blog={blog}
        sameCategoryBlogs={sameCategoryBlogs}
        comments={comments}
      />
    </Suspense>
  );
}
