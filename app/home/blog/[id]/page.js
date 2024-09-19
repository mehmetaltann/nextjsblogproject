import SingleBlog from "@/Components/SingleBlog/SingleBlog";
import BlogModel from "@/lib/models/BlogModel";
import CommentModel from "@/lib/models/CommentsModel";
import { Loader } from "@/Components/Layouts/Loader";
import { Suspense } from "react";

export default async function Blog({ params }) {
  const { id } = params;
  const data = await BlogModel.findById(id);
  const blog = JSON.parse(JSON.stringify(data));
  const categoryArray = blog.category.map(function (obj) {
    return obj.name;
  });
  const sameCategoryBlogsData = await BlogModel.find({
    "category.name": {
      $in: categoryArray,
    },
  });
  const sameCategoryBlogs = sameCategoryBlogsData.map((item) =>
    JSON.parse(JSON.stringify(item))
  );
  const commentsData = await CommentModel.find({ postId: id });
  const comments = JSON.parse(JSON.stringify(commentsData));

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
