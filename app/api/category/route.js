import CategoryModel from "@/lib/models/CategoryModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { categoryName, categoryColor } = await request.json();
    const categoryData = { name: categoryName, color: categoryColor };
    await CategoryModel.create(categoryData);
    return NextResponse.json({ msg: "Kategori Kaydedildi", success: true });
  } catch (error) {
    return NextResponse.json({
      msg: "Bir Sorun var, Kategori Kaydedilemedi",
      success: false,
    });
  }
}

export async function GET(request) {
  try {
    const categories = await CategoryModel.find({});
    return NextResponse.json({ categories });
  } catch (error) {
    return NextResponse.json({
      msg: "Bir Sorun var, Kategoriler Getirilemedi",
      success: false,
    });
  }
}

export async function DELETE(request) {
  try {
    const id = await request.nextUrl.searchParams.get("id");
    await CategoryModel.findByIdAndDelete(id);
    return NextResponse.json({ msg: "Kategori Silindi", success: true });
  } catch (error) {
    return NextResponse.json({
      msg: "Bir Sorun var, Kategori Silinemedi",
      success: false,
    });
  }
}
