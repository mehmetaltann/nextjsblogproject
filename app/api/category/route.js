import CategoryModel from "@/lib/models/CategoryModel";
import { ConnectDb } from "@/lib/config/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { categoryName, categoryColor } = await request.json();
  const categoryData = { name: categoryName, color: categoryColor };
  console.log(categoryData);
  await ConnectDb();
  await CategoryModel.create(categoryData);
  return NextResponse.json({ msg: "Kategori Kaydedildi", success: true });
}

export async function GET(request) {
  await ConnectDb();
  const categories = await CategoryModel.find({});
  return NextResponse.json({ categories });
}

export async function DELETE(request) {
  await ConnectDb();
  const id = await request.nextUrl.searchParams.get("id");
  await CategoryModel.findByIdAndDelete(id);
  return NextResponse.json({ msg: "Kategori Silindi", success: true });
}
