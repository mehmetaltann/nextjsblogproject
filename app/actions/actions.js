"use server";
import CategoryModel from "@/lib/models/CategoryModel";
import CommentModel from "@/lib/models/CommentsModel";
import BlogModel from "@/lib/models/BlogModel";
import UserModel from "@/lib/models/UserModel";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import { envEmail, transporter } from "@/lib/config/nodemailer";
import { connectToMongoDB } from "@/lib/config/db";
const { revalidatePath, revalidateTag } = require("next/cache");

///////////////////////// CATEGORY ACTIONS ///////////////////////

export const addCategory = async (prevState, formData) => {
  try {
    connectToMongoDB();
    const newData = {
      name: formData.get("catName"),
      color: formData.get("catColor"),
    };
    await CategoryModel.create(newData);
    revalidateTag("categories");
    return { msg: "Kategori Eklendi" };
  } catch (error) {
    return { msg: "Kategori Eklenemedi: " + error };
  }
};

export const deleteCategory = async (_id) => {
  try {
    await CategoryModel.findByIdAndDelete(_id);
    revalidateTag("categories");
    return { msg: "Kategori Silindi" };
  } catch (error) {
    return { msg: "Kategori Silinemedi: " + error };
  }
};

///////////////////////// POST ACTIONS ///////////////////////

export const addPost = async (formData) => {
  try {
    await BlogModel.create(formData);
    revalidatePath("/admin/posts");
    return { msg: "Yazı Eklendi", isSuccess: true };
  } catch (error) {
    return { msg: "Yazı Eklenemedi: " + error, isSuccess: false };
  }
};

export const updatePost = async (formData) => {
  try {
    const { _id } = formData;
    await BlogModel.findByIdAndUpdate({ _id }, formData, {
      new: true,
    });
    revalidatePath("/admin/posts");
    return { msg: "Yazı Güncellendi" };
  } catch (error) {
    return { msg: "Yazı Güncellenemedi: " + error };
  }
};

export const deletePost = async (_id) => {
  try {
    await BlogModel.findByIdAndDelete(_id);
    revalidatePath(`/admin/posts`);
    return { msg: "Blog Silindi" };
  } catch (error) {
    return { msg: "Blog Silinemedi: " + error };
  }
};

///////////////////////// USER ACTIONS ///////////////////////

export const userRegister = async (prevState, formData) => {
  try {
    const isim = formData.get("isim");
    const email = formData.get("email");
    const password = formData.get("password");
    const user = await UserModel.findOne({ email }).select("_id");
    if (user) {
      return { msg: "Bu kullanıcı kayıtlıdır", isSuccess: false };
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const userData = {
        isim,
        email,
        password: hashedPassword,
      };
      await UserModel.create(userData);
      return { msg: "Kullanıcı Kaydedildi", isSuccess: true };
    }
  } catch (error) {
    return { msg: "Bu kullanıcı kayıtlıdır: " + error, isSuccess: false };
  }
};

///////////////////////// OTHER ACTIONS ///////////////////////

export const sendMessage = async (prevState, formData) => {
  const templatePath = path.join(
    process.cwd(),
    "templates",
    "contactEmailTemp.html"
  );
  let htmlTemplate = fs.readFileSync(templatePath, "utf8");
  try {
    const email = formData.get("email");
    const title = formData.get("title");
    const message = formData.get("message");

    htmlTemplate = htmlTemplate
      .replace("{{senderEmail}}", email)
      .replace("{{subject}}", title)
      .replace("{{message}}", message);

    await transporter.sendMail({
      to: envEmail,
      from: authorEmail,
      subject: postTitle,
      html: htmlTemplate,
    });
    return { msg: "Mesajınız Gönderildi", success: true };
  } catch (error) {
    return { msg: "Mesajınız Gönderildi: " + error, success: false };
  }
};

/* text: `Gönderen: ${newData.email}\n\n${newData.message}`*/

///////////////////////// COMMENT ACTIONS ///////////////////////

export const addComment = async (formData) => {
  try {
    const { postTitle, postId, authorEmail, content, parentCommentId } =
      formData;
    if (!parentCommentId) {
      const templatePathNewComment = path.join(
        process.cwd(),
        "lib/templates",
        "newCommentEmailTemp.html"
      );
      let htmlTemplateNewComment = fs.readFileSync(
        templatePathNewComment,
        "utf8"
      );
      htmlTemplateNewComment = htmlTemplateNewComment
        .replace("{{postTitle}}", postTitle)
        .replace("{{authorEmail}}", authorEmail)
        .replace("{{content}}", content);

      await transporter.sendMail({
        to: envEmail,
        from: authorEmail,
        subject: postTitle,
        html: htmlTemplateNewComment,
      });
    } else {
      const commentReplyEmailTemp = path.join(
        process.cwd(),
        "lib/templates",
        "commentReplyEmailTemp.html"
      );
      let htmlTemplateReplyComment = fs.readFileSync(
        commentReplyEmailTemp,
        "utf8"
      );
      const { authorEmail: parentAuthor } =
        await CommentModel.findById(parentCommentId);

      htmlTemplateReplyComment = htmlTemplateReplyComment
        .replace("{{postTitle}}", postTitle)
        .replace("{{authorEmail}}", authorEmail)
        .replace("{{content}}", content)
        .replace("{{parentAuthor}}", parentAuthor);

      await transporter.sendMail({
        to: [parentAuthor, envEmail],
        from: authorEmail,
        subject: postTitle,
        html: htmlTemplateReplyComment,
      });
    }
    delete formData.postTitle;
    await CommentModel.create(formData);
    revalidateTag("comments");
    return { msg: "Yorum Eklendi", isSuccess: true };
  } catch (error) {
    return { msg: "Yorum Eklenemedi: " + error, isSuccess: false };
  }
};

export const updateComment = async (formData) => {
  try {
    const { content, _id, postId } = formData;
    await CommentModel.findByIdAndUpdate(
      { _id },
      {
        content,
      }
    );
    revalidateTag("comments");
    return { msg: "Yorum Güncellendi", isSuccess: true };
  } catch (error) {
    return { msg: "Yorum Güncellenemedi: " + error, isSuccess: false };
  }
};

export const deleteComment = async (_id, postId) => {
  try {
    await CommentModel.findByIdAndDelete(_id);
    revalidateTag("comments");
    return { msg: "Yorum Silindi" };
  } catch (error) {
    return { msg: "Yorum Silinemedi: " + error };
  }
};
