import CommentModel from "@/lib/models/CommentsModel";
import BlogModel from "@/lib/models/BlogModel";
import CategoryModel from "@/lib/models/CategoryModel";
import InfoModel from "@/lib/models/InfoModel";
import dbConnect from "@/lib/config/dbConnect";
import {
  CategoryType,
  CommentType,
  HomePost,
  InfoType,
  PostTitle,
  PostType,
} from "@/lib/types/types";

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

export const fetchBlog = async (title: string) => {
  try {
    try {
      await dbConnect();
    } catch (error) {
      console.error(error);
      return [];
    }
    const data = await BlogModel.findOne({ title: decodeURI(title) });
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

export const fetchInfos = async (searchType: string) => {
  const filteringdata = searchType === "All" ? { $exists: true } : searchType;
  try {
    try {
      await dbConnect();
    } catch (error) {
      console.error(error);
      return [];
    }
    const infos = await InfoModel.aggregate([
      {
        $match: {
          name: filteringdata,
        },
      },
    ]);
    const allInfos: InfoType[] = JSON.parse(JSON.stringify(infos));
    return allInfos;
  } catch (error) {
    console.log(error);
  }
};

export const fetchHomePosts = async () => {
  try {
    try {
      await dbConnect();
    } catch (error) {
      console.error(error);
      return [];
    }

    const posts: HomePost[] = await BlogModel.aggregate([
      {
        $match: {
          isHome: true,
        },
      },
      {
        $sort: {
          date: -1,
        },
      },
      {
        $project: {
          _id: 0,
          title: 1,
          category: 1,
          date: 1,
          cloudinaryImageId: 1,
          description: { $substr: ["$description", 0, 600] },
        },
      },
    ]);
    return posts;
  } catch (error) {
    console.log(error);
  }
};

export const fetchPostTitles = async () => {
  try {
    await dbConnect();
    const postTitles: PostTitle[] = await BlogModel.aggregate([
      {
        $project: {
          _id: 0,
          title: 1,
        },
      },
    ]);
    return postTitles;
  } catch (error) {
    console.log(error);
  }
};
