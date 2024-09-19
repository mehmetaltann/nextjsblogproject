"use server";
import CategoryModel from "@/lib/models/CategoryModel";
import CommentModel from "@/lib/models/CommentsModel";
import BlogModel from "@/lib/models/BlogModel";
import UserModel from "@/lib/models/UserModel";
import bcrypt from "bcryptjs";
import { mailOptions, transporter } from "@/lib/config/nodemailer";
const { revalidatePath } = require("next/cache");

export const addCategory = async (prevState, formData) => {
  try {
    const newData = {
      name: formData.get("catName"),
      color: formData.get("catColor"),
    };
    await CategoryModel.create(newData);
    revalidatePath("/admin/categories");
    return { msg: "Kategori Eklendi" };
  } catch (error) {
    return { msg: "Kategori Eklenemedi: " + error };
  }
};

export const deleteCategory = async (prevState, formData) => {
  try {
    const id = formData.get("id");
    await CategoryModel.findByIdAndDelete(id);
    revalidatePath("/admin/categories");
    return { msg: "Kategori Silindi" };
  } catch (error) {
    return { msg: "Kategori Silinemedi: " + error };
  }
};

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

export const sendMessage = async (prevState, formData) => {
  try {
    const newData = {
      email: formData.get("email"),
      title: formData.get("title"),
      message: formData.get("message"),
    };
    await transporter.sendMail({
      ...mailOptions,
      from: newData.email,
      subject: newData.title,
      text: `Gönderen: ${newData.email}\n\n${newData.message}`,
    });
    return { msg: "Mesajınız Gönderildi", success: true };
  } catch (error) {
    return { msg: "Mesajınız Gönderildi: " + error, success: false };
  }
};

export const addComment = async (formData) => {
  try {
    const { postTitle, postId } = formData;
    await transporter.sendMail({
      ...mailOptions,
      from: authorEmail,
      subject: "Blog Post Yorumu",
      text: `Gönderen: ${authorEmail}\nPost Konusu: ${postTitle}\n\nYorumu: ${content}`,
    });
    delete formData.postTitle;
    console.log(formData);
    await CommentModel.create(formData);
    revalidatePath(`/home/blog/${postId}`);
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
    revalidatePath(`/home/blog/${postId}`);
    return { msg: "Yorum Güncellendi", isSuccess: true };
  } catch (error) {
    return { msg: "Yorum Güncellenemedi: " + error, isSuccess: false };
  }
};

export const deleteComment = async (_id, postId) => {
  try {
    await CommentModel.findByIdAndDelete(_id);
    revalidatePath(`/home/blog/${postId}`);
    return { msg: "Yorum Silindi" };
  } catch (error) {
    return { msg: "Yorum Silinemedi: " + error };
  }
};
