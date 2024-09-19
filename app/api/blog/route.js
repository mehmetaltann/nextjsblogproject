import BlogModel from "@/lib/models/BlogModel";
const { NextResponse } = require("next/server");

export async function GET(request) {
  const blogId = request.nextUrl.searchParams.get("id");
  try {
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
  } catch (error) {
    return NextResponse.json({ success: false, msg: error });
  }
}

export async function POST(request) {
  try {
    const { title, description, author, cloudinaryImageId, category, isHome } =
      await request.json();
    const blogData = {
      title,
      description,
      category,
      author,
      cloudinaryImageId,
      isHome,
    };
    await BlogModel.create(blogData);
    return NextResponse.json({ success: true, msg: "Blog Yazısı Kaydedildi" });
  } catch (error) {
    return NextResponse.json({ success: false, msg: error });
  }
}

export async function PUT(request) {
  try {
    const {
      _id,
      title,
      description,
      author,
      cloudinaryImageId,
      category,
      isHome,
    } = await request.json();
    const filter = { _id };
    const update = {
      _id,
      title,
      description,
      category,
      author,
      cloudinaryImageId,
      isHome,
    };
    await BlogModel.findByIdAndUpdate(filter, update, {
      new: true,
    });
    return NextResponse.json({ success: true, msg: "Blog Yazısı Güncellendi" });
  } catch (error) {
    return NextResponse.json({ success: false, msg: error });
  }
}

export async function DELETE(request) {
  try {
    const id = await request.nextUrl.searchParams.get("id");
    await BlogModel.findByIdAndDelete(id);
    return NextResponse.json({ success: true, msg: "Blog Yazısı Silindi" });
  } catch (error) {
    return NextResponse.json({ success: false, msg: error });
  }
}
