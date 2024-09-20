import CommentModel from "@/lib/models/CommentsModel";
import BlogModel from "@/lib/models/BlogModel";
import CategoryModel from "@/lib/models/CategoryModel";


export const fetchPosts = async () => {
  try {
    const posts = await BlogModel.find({}).sort({ date: -1 });
    const allPosts = JSON.parse(JSON.stringify(posts));
    return { allPosts };
  } catch (error) {
    console.log(error);
  }
};

export const fetchCategories = async () => {
  try {
    const categories = await CategoryModel.find({});
    const allCategories = JSON.parse(JSON.stringify(categories));
    return { allCategories };
  } catch (error) {
    console.log(error);
  }
};

export const fetchComment = async (id) => {
  try {
    const commentsData = await CommentModel.find({ postId: id });
    const comments = JSON.parse(JSON.stringify(commentsData));
    return comments;
  } catch (error) {
    console.log(error);
  }
};

export const fetchBlog = async (id) => {
  try {
    const data = await BlogModel.findById(id);
    const blog = JSON.parse(JSON.stringify(data));
    return blog;
  } catch (error) {
    console.log(error);
  }
};

export const fetchBlogAndSimilarPosts = async (id) => {
  try {
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
    return { blog, sameCategoryBlogs };
  } catch (error) {
    console.log(error);
  }
};
