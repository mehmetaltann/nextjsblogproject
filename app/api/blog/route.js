import BlogModel from "@/lib/models/BlogModel";
import { ConnectDb } from "@/lib/config/db";
const { NextResponse } = require("next/server");

export async function GET(request) {
  const blogId = request.nextUrl.searchParams.get("id");
  if (blogId) {
    await ConnectDb();
    const blog = await BlogModel.findById(blogId);
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
    return NextResponse.json({ blog, sameCategoryFilteredData });
  } else {
    await ConnectDb();
    const blogs = await BlogModel.find({});
    return NextResponse.json({ blogs });
  }
}

export async function POST(request) {
  const { title, description, author, cloudinaryImageId, category } =
    await request.json();
  const blogData = {
    title,
    description,
    category,
    author,
    cloudinaryImageId,
  };
  await ConnectDb();
  await BlogModel.create(blogData);
  return NextResponse.json({ success: true, msg: "Blog Yazısı Kaydedildi" });
}

export async function DELETE(request) {
  const id = await request.nextUrl.searchParams.get("id");
  await ConnectDb();
  await BlogModel.findByIdAndDelete(id);
  return NextResponse.json({ msg: "Blog Yazısı Silindi" });
}
