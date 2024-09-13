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

export async function PUT(request) {
  try {
    const { _id, content } = await request.json();
    await CommentModel.findByIdAndUpdate(
      { _id },
      {
        content,
      }
    );
    return NextResponse.json({ success: true, msg: "Yorum Güncellendi" });
  } catch (error) {
    return NextResponse.json({ success: false, msg: error });
  }
}

export async function POST(request) {
  try {
    const {
      authorName,
      authorEmail,
      content,
      postId,
      postTitle,
      parentCommentId,
    } = await request.json();

    const commentData = {
      authorName,
      authorEmail,
      content,
      postId,
      parentCommentId,
    };

    await CommentModel.create(commentData);

    await transporter.sendMail({
      ...mailOptions,
      from: authorEmail,
      subject: "Blog Post Yorumu",
      text: `Gönderen: ${authorEmail}\nPost Konusu: ${postTitle}\n\nYorumu: ${content}`,
    });

    return NextResponse.json({ msg: "Yorumunuz Kaydedildi", success: true });
  } catch (error) {
    return NextResponse.json({
      msg: "Bir Sorun var, Yorumunuz Kaydedilemedi",
      success: false,
    });
  }
}

export async function DELETE(request) {
  try {
    const id = await request.nextUrl.searchParams.get("id");
    await CommentModel.findByIdAndDelete(id);
    return NextResponse.json({ success: true, msg: "Yorum Silindi" });
  } catch (error) {
    return NextResponse.json({ success: false, msg: error });
  }
}
