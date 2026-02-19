"use server";

import CategoryModel from "@/lib/models/CategoryModel";
import CommentModel from "@/lib/models/CommentsModel";
import BlogModel from "@/lib/models/BlogModel";
import UserModel from "@/lib/models/UserModel";
import InfoModel from "@/lib/models/InfoModel";
import bcrypt from "bcryptjs";
import fs from "fs/promises";
import path from "path";
import dbConnect from "@/lib/config/dbConnect";
import { transporter } from "@/lib/config/nodemailer";
import { revalidatePath } from "next/cache";
import { PostType } from "@/lib/types/types";
import { slugify } from "@/lib/utils/helpers";

const adminEmail = process.env.EMAIL as string;

const readTemplate = async (fileName: string) => {
  const filePath = path.join(process.cwd(), "lib/templates", fileName);
  return await fs.readFile(filePath, "utf8");
};

interface AddPostPayload {
  title: string;
  description: string;
  isHome: boolean;
  author: string;
  cloudinaryImageId: string;
  category: { name: string }[];
}

interface CommentData {
  postTitle: string;
  postId: string;
  authorEmail: string;
  content: string;
  parentCommentId?: string | null;
}

interface InfoData {
  _id: string;
  content: string;
  name: string;
}

type filteredPostType = Omit<PostType, "date" | "updatedAt" | "createdAt">;

///////////////////////// CATEGORY ACTIONS ///////////////////////
export const addCategory = async (prevState: any, formData: any) => {
  try {
    const newData = {
      name: formData.get("catName"),
      color: formData.get("catColor"),
    };
    await dbConnect();
    await CategoryModel.create(newData);
    revalidatePath("/admin/categories");
    revalidatePath("/admin/write");
    return { msg: "Kategori Eklendi" };
  } catch (error) {
    return { msg: `Kategori Eklenemedi: ${error}` };
  }
};

export const deleteCategory = async (_id: string) => {
  try {
    await dbConnect();
    await CategoryModel.findByIdAndDelete(_id);
    revalidatePath("/admin/categories");
    revalidatePath("/admin/write");
    return { msg: "Kategori Silindi" };
  } catch (error) {
    return { msg: `Kategori Silinemedi: ${error}` };
  }
};

///////////////////////// POST ACTIONS ///////////////////////

export const addPost = async (data: AddPostPayload) => {
  try {
    await dbConnect();

    if (!data.title || !data.description) {
      return { msg: "Başlık veya içerik eksik!", isSuccess: false };
    }
    const newSlug = slugify(data.title);
    await BlogModel.create({
      ...data,
      slug: newSlug,
    });

    revalidatePath("/");
    revalidatePath("/home");
    revalidatePath("/home/bloglist");
    revalidatePath("/admin");

    return { msg: "Yazı Eklendi", isSuccess: true };
  } catch (error) {
    console.error("AddPost Error:", error);
    return { msg: "Yazı Eklenemedi!", isSuccess: false };
  }
};

export const updatePost = async (
  formData: Partial<PostType> & { _id: string },
) => {
  try {
    await dbConnect();

    const { _id, ...rest } = formData;

    const oldPost = await BlogModel.findById(_id).lean();
    if (!oldPost) return { msg: "Post bulunamadı!", isSuccess: false };
    let newSlug = oldPost.slug;

    const updateData: Partial<PostType> = {
      ...rest,
      updatedAt: new Date(),
    };

    if (rest.title && rest.title !== oldPost.title) {
      newSlug = slugify(rest.title);
      updateData.slug = newSlug;
    }

    await BlogModel.findByIdAndUpdate(_id, updateData, {
      new: true,
      runValidators: true,
    });

    revalidatePath("/");
    revalidatePath("/home");
    revalidatePath("/admin");
    revalidatePath("/home/bloglist");
    revalidatePath(`/home/blog/${oldPost.slug}`);
    revalidatePath(`/home/blog/${newSlug}`);

    return { msg: "Yazı Güncellendi" };
  } catch (error) {
    return { msg: `Yazı Güncellenemedi: ${error}` };
  }
};

export const deletePost = async (id: string) => {
  try {
    await dbConnect();
    const post = await BlogModel.findById(id);
    if (!post) return { msg: "Post bulunamadı!" };

    const oldSlug = post.slug;
    await BlogModel.findByIdAndDelete(id);
    revalidatePath("/");
    revalidatePath("/home");
    revalidatePath("/admin");
    revalidatePath("/home/bloglist");
    revalidatePath(`/home/blog/${oldSlug}`);

    return { msg: "Yazı Silindi" };
  } catch (error) {
    return { msg: `Yazı Silinemedi: ${error}` };
  }
};
///////////////////////// USER ACTIONS ///////////////////////
export const userRegister = async (prevState: any, formData: any) => {
  try {
    const isim = formData.get("isim");
    const email = formData.get("email");
    const password = formData.get("password");
    await dbConnect();
    const user = await UserModel.findOne({ email }).select("_id");
    if (user) {
      return { msg: "Bu kullanıcı kayıtlıdır", isSuccess: false };
    } else {
      const hashedPassword = await bcrypt.hash(password!, 10);
      const userData = { isim, email, password: hashedPassword };
      await UserModel.create(userData);
      return { msg: "Kullanıcı Kaydedildi", isSuccess: true };
    }
  } catch (error) {
    return { msg: `Bu kullanıcı kayıtlıdır: ${error}`, isSuccess: false };
  }
};

///////////////////////// COMMENT ACTIONS ///////////////////////

export const addComment = async (formData: CommentData) => {
  try {
    await dbConnect();
    const { postTitle, authorEmail, content, parentCommentId } = formData;

    if (!parentCommentId) {
      let html = await readTemplate("newCommentEmailTemp.html");

      html = html
        .replace("{{postTitle}}", postTitle)
        .replace("{{authorEmail}}", authorEmail)
        .replace("{{content}}", content);

      await transporter.sendMail({
        to: adminEmail,
        from: authorEmail,
        subject: postTitle,
        html,
      });
    } else {
      let html = await readTemplate("commentReplyEmailTemp.html");

      const parent = await CommentModel.findById(parentCommentId)
        .select("authorEmail")
        .lean();

      if (!parent) {
        return { msg: "Üst yorum bulunamadı", isSuccess: false };
      }

      html = html
        .replace("{{postTitle}}", postTitle)
        .replace("{{authorEmail}}", authorEmail)
        .replace("{{content}}", content)
        .replace("{{parentAuthor}}", parent.authorEmail);

      await transporter.sendMail({
        to: [parent.authorEmail, adminEmail],
        from: authorEmail,
        subject: postTitle,
        html,
      });
    }

    delete (formData as any).postTitle;

    await CommentModel.create(formData);
    revalidatePath(`/home/blog/${postTitle}`);

    return { msg: "Yorum Eklendi", isSuccess: true };
  } catch (error) {
    return { msg: `Yorum Eklenemedi: ${error}`, isSuccess: false };
  }
};

export const updateComment = async (
  formData: {
    content: string;
    _id: string;
  },
  postTitle: string,
) => {
  try {
    await dbConnect();
    const { content, _id } = formData;
    await CommentModel.findByIdAndUpdate(_id, { content });
    revalidatePath(`/home/blog/${postTitle}`);
    return { msg: "Yorum Güncellendi", isSuccess: true };
  } catch (error) {
    return { msg: `Yorum Güncellenemedi: ${error}`, isSuccess: false };
  }
};

export const deleteComment = async (_id: string, postTitle: string) => {
  try {
    await dbConnect();
    await CommentModel.findByIdAndDelete(_id);
    revalidatePath(`/home/blog/${postTitle}`);
    return { msg: "Yorum Silindi" };
  } catch (error) {
    return { msg: `Yorum Silinemedi: ${error}` };
  }
};

///////////////////////// INFO ACTIONS ///////////////////////

export const addInfo = async (prevState: any, formData: any) => {
  try {
    const newData = {
      name: formData.get("isim"),
      content: formData.get("content"),
    };
    await dbConnect();
    await InfoModel.create(newData);
    revalidatePath("/admin/infos");
    return { msg: "Bilgi Eklendi" };
  } catch (error) {
    return { msg: `Bilgi Eklenemedi: ${error}` };
  }
};

export const deleteInfo = async (_id: string) => {
  try {
    await dbConnect();
    await InfoModel.findByIdAndDelete(_id);
    revalidatePath("/admin/infos");
    return { msg: "Bilgi Silindi" };
  } catch (error) {
    return { msg: `Bilgi Silinemedi: ${error}` };
  }
};

export const updateInfo = async (formData: InfoData) => {
  try {
    const { _id, content, name } = formData;
    await dbConnect();
    await InfoModel.findByIdAndUpdate(_id, { content, name });
    revalidatePath("/admin/infos");
    revalidatePath("/home/about");
    revalidatePath("/admin/contact");
    return { msg: "Bilgi Güncellendi", isSuccess: true };
  } catch (error) {
    return { msg: `Bilgi Güncellenemedi: ${error}`, isSuccess: false };
  }
};

///////////////////////// OTHER ACTIONS ///////////////////////

export const sendMessage = async (prevState: any, formData: any) => {
  try {
    let html = await readTemplate("contactEmailTemp.html");

    const email = formData.get("email");
    const title = formData.get("title");
    const message = formData.get("message");

    html = html
      .replace("{{senderEmail}}", email)
      .replace("{{subject}}", title)
      .replace("{{message}}", message);

    await transporter.sendMail({
      to: adminEmail,
      from: email,
      subject: title,
      html,
    });

    return { msg: "Mesajınız Gönderildi", success: true };
  } catch (error) {
    return { msg: "Mesaj gönderilemedi: " + error, success: false };
  }
};
