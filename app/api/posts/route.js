import BlogModel from "@/lib/models/BlogModel";
const { NextResponse } = require("next/server");

export async function GET(request) {
  try {
    const posts = await BlogModel.find({}).sort({ date: -1 });
    return NextResponse.json({ posts });
  } catch (error) {
    return NextResponse.json({ success: false, msg: error });
  }
}
