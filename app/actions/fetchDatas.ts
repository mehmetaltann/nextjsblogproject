import CommentModel from "@/lib/models/CommentsModel";
import BlogModel from "@/lib/models/BlogModel";
import CategoryModel from "@/lib/models/CategoryModel";
import InfoModel from "@/lib/models/InfoModel";
import dbConnect from "@/lib/config/dbConnect";
import {
  CategoryType,
  CommentType,
  InfoType,
  PostType,
} from "@/lib/types/types";

interface Blog {
  _id: string;
  title: string;
  content: string;
  date: Date;
  category: Array<{ name: string }>;
}

export const fetchPosts = async () => {
  try {
    try {
      await dbConnect();
    } catch (error) {
      console.error(error);
      return [];
    }
    const posts = await BlogModel.find({}).sort({ date: -1 }).lean();
    const allPosts: PostType[] = JSON.parse(JSON.stringify(posts));
    return allPosts;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCategories = async () => {
  try {
    try {
      await dbConnect();
    } catch (error) {
      console.error(error);
      return [];
    }
    const categories = await CategoryModel.find({}).lean();
    const allCategories: CategoryType[] = JSON.parse(
      JSON.stringify(categories)
    );
    return allCategories;
  } catch (error) {
    console.log(error);
  }
};

export const fetchComment = async (id: string) => {
  try {
    try {
      await dbConnect();
    } catch (error) {
      console.error(error);
      return [];
    }
    const commentsData = await CommentModel.find({ postId: id }).lean();
    const comments: CommentType[] = JSON.parse(JSON.stringify(commentsData));
    return comments;
  } catch (error) {
    console.log(error);
  }
};

export const fetchBlog = async (id: string) => {
  try {
    try {
      await dbConnect();
    } catch (error) {
      console.error(error);
      return [];
    }
    const data = await BlogModel.findById(id).lean();
    const blog: PostType = JSON.parse(JSON.stringify(data));
    return blog;
  } catch (error) {
    console.log(error);
  }
};

export const fetchSimilarPosts = async (categoryArray: string[]) => {
  try {
    try {
      await dbConnect();
    } catch (error) {
      console.error(error);
      return [];
    }
    const sameCategoryBlogsData = await BlogModel.find({
      "category.name": {
        $in: categoryArray,
      },
    });
    const sameCategoryBlogs: PostType[] = sameCategoryBlogsData.map((item) =>
      JSON.parse(JSON.stringify(item))
    );
    return sameCategoryBlogs;
  } catch (error) {
    console.log(error);
  }
};

export const fetchInfos = async () => {
  try {
    try {
      await dbConnect();
    } catch (error) {
      console.error(error);
      return [];
    }
    const infos = await InfoModel.find({}).lean();
    const allInfos: InfoType[] = JSON.parse(JSON.stringify(infos));
    return allInfos;
  } catch (error) {
    console.log(error);
  }
};
