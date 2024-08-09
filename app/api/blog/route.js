import BlogModel from "@/lib/models/BlogModel";
import { ConnectDb } from "@/lib/config/db";
import { writeFile } from "fs/promises";
const { NextResponse } = require("next/server");

const LoadDb = async () => {
  await ConnectDb();
};

LoadDb();

export async function GET(request) {
  const blogId = request.nextUrl.searchParams.get("id");
  if (blogId) {
    const blog = await BlogModel.findById(blogId);
    return NextResponse.json(blog);
  } else {
    const blogs = await BlogModel.find({});
    return NextResponse.json({ blogs });
  }
}

export async function POST(request) {
  const formData = await request.formData();
  const timeStamp = Date.now();
  const image = formData.get("image");
  const imageByteData = await image.arrayBuffer();
  const buffer = Buffer.from(imageByteData);
  const path = `./public/${timeStamp}_${image.name}`;
  await writeFile(path, buffer);
  const imgUrl = `/${timeStamp}_${image.name}`;

  const blogData = {
    title: `${formData.get("title")}`,
    description: `${formData.get("description")}`,
    category: `${formData.get("category")}`,
    author: `${formData.get("author")}`,
    authorImg: `${formData.get("authorImg")}`,
    image: `${imgUrl}`,
  };
  await BlogModel.create(blogData);
  console.log("Blog Yazısı Kaydedildi");
  return NextResponse.json({ success: true, msg: "Blog Yazısı Kaydedildi" });
}
