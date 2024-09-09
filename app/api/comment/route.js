import CommentModel from "@/lib/models/CommentsModel";
import { NextResponse } from "next/server";
import { mailOptions, transporter } from "@/lib/config/nodemailer";

export async function GET(request) {
  try {
    const blogId = request.nextUrl.searchParams.get("id");
    const comments = await CommentModel.find({ postId: blogId });
    return NextResponse.json(comments);
  } catch (error) {
    return NextResponse.json({
      msg: "Bir Sorun var, Yorumunuz Kaydedildi",
      success: false,
    });
  }
}

export async function POST(request) {
  try {
    const { authorName, authorEmail, comment, postId, postTitle } =
      await request.json();
    const commentData = {
      authorName,
      authorEmail,
      comment,
      postId,
    };
    await CommentModel.create(commentData);
    await transporter.sendMail({
      ...mailOptions,
      from: authorEmail,
      subject: "Blog Post Yorumu",
      text: `Gönderen: ${authorEmail}\nPost Konusu: ${postTitle}\n\nYorumu: ${comment}`,
    });
    return NextResponse.json({ msg: "Yorumunuz Kaydedildi", success: true });
  } catch (error) {
    return NextResponse.json({
      msg: "Bir Sorun var, Yorumunuz Kaydedilemedi",
      success: false,
    });
  }
}
