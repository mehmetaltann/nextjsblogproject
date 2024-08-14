import CommentModel from "@/lib/models/CommentsModel";
import { ConnectDb } from "@/lib/config/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  const blogId = request.nextUrl.searchParams.get("id");
  const comments = await CommentModel.find({ postId: blogId });
  return NextResponse.json(comments);
}

export async function POST(request) {
  const { authorName, authorEmail, comment, postId } = await request.json();
  const commentData = {
    authorName,
    authorEmail,
    comment,
    postId,
  };
  await ConnectDb();
  await CommentModel.create(commentData);
  return NextResponse.json({ msg: "Yorumunuz Kaydedildi", success: true });
}
