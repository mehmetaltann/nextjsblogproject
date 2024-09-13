"use server";
import CategoryModel from "@/lib/models/CategoryModel";
import BlogModel from "@/lib/models/BlogModel";

export async function sanitizeData(data) {
  return JSON.parse(JSON.stringify(data));
}

export const getCategories = async () => {
  try {
    const response = await CategoryModel.find({});
    return sanitizeData(response);
  } catch (error) {
    console.log(error);
  }
};


export const getSimilarPosts = async (id) => {
  try {
    const blog = await BlogModel.findById(id);
    const categoryArray = blog.category.map(function (obj) {
      return obj.name;
    });
    const sameCategoryData = await BlogModel.find({
      "category.name": {
        $in: categoryArray,
      },
    });
    const sameCategoryFilteredData = sameCategoryData.filter((item) => {
      return item.title !== blog.title;
    });
    return sanitizeData(sameCategoryFilteredData);
  } catch (error) {
    console.log(error);
  }
};
