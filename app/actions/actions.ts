"use server";
import CategoryModel from "@/lib/models/CategoryModel";
import CommentModel from "@/lib/models/CommentsModel";
import BlogModel from "@/lib/models/BlogModel";
import UserModel from "@/lib/models/UserModel";
import InfoModel from "@/lib/models/InfoModel";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import dbConnect from "@/lib/config/dbConnect";
import { envEmail, transporter } from "@/lib/config/nodemailer";
import { revalidatePath } from "next/cache";
import { PostType } from "@/lib/types/types";

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

type filteredPostType = Omit<PostType, "date" | "updated_at" | "created_at">;

///////////////////////// CATEGORY ACTIONS ///////////////////////
export const addCategory = async (prevState: any, formData: any) => {
  try {
    const newData = {
      name: formData.get("catName"),
      color: formData.get("catColor"),
    };
    try {
      await dbConnect();
    } catch (error) {
      console.error(error);
      return [];
    }
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
    try {
      await dbConnect();
    } catch (error) {
      console.error(error);
      return [];
    }
    await CategoryModel.findByIdAndDelete(_id);
    revalidatePath("/admin/categories");
    revalidatePath("/admin/write");
    return { msg: "Kategori Silindi" };
  } catch (error) {
    return { msg: `Kategori Silinemedi: ${error}` };
  }
};

///////////////////////// POST ACTIONS ///////////////////////

export const addPost = async (formData: any) => {
  try {
    try {
      await dbConnect();
    } catch (error) {
      console.error(error);
      return [];
    }
    delete formData._id;
    console.log(formData);
    await BlogModel.create(formData);
    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath("/home");
    revalidatePath("/home/bloglist");
    return { msg: "Yazı Eklendi", isSuccess: true };
  } catch (error) {
    return { msg: `Yazı Eklenemedi: ${error}`, isSuccess: false };
  }
};

export const updatePost = async (formData: filteredPostType) => {
  try {
    const { title, _id } = formData;
    try {
      await dbConnect();
    } catch (error) {
      console.error(error);
      return [];
    }
    await BlogModel.findByIdAndUpdate({ _id }, formData, { new: true });
    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath("/home");
    revalidatePath("/home/bloglist");
    revalidatePath(`/home/blog/${title}`);
    return { msg: "Yazı Güncellendi" };
  } catch (error) {
    return { msg: `Yazı Güncellenemedi: ${error}` };
  }
};

export const deletePost = async (_id: string) => {
  try {
    try {
      await dbConnect();
    } catch (error) {
      console.error(error);
      return [];
    }
    await BlogModel.findByIdAndDelete(_id);
    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath("/home");
    revalidatePath("/home/bloglist");
    return { msg: "Blog Silindi" };
  } catch (error) {
    return { msg: `Blog Silinemedi: ${error}` };
  }
};

///////////////////////// USER ACTIONS ///////////////////////
export const userRegister = async (prevState: any, formData: any) => {
  try {
    const isim = formData.get("isim");
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      await dbConnect();
    } catch (error) {
      console.error(error);
      return [];
    }
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
    try {
      await dbConnect();
    } catch (error) {
      console.error(error);
      return [];
    }
    const { postTitle, authorEmail, content, parentCommentId } = formData;

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
      const { authorEmail: parentAuthor } = (await CommentModel.findById(
        parentCommentId
      )) as { authorEmail: string };

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
  postTitle: string
) => {
  try {
    try {
      await dbConnect();
    } catch (error) {
      console.error(error);
      return [];
    }
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
    try {
      await dbConnect();
    } catch (error) {
      console.error(error);
      return [];
    }
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
    try {
      await dbConnect();
    } catch (error) {
      console.error(error);
      return [];
    }
    await InfoModel.create(newData);
    revalidatePath("/admin/infos");
    return { msg: "Bilgi Eklendi" };
  } catch (error) {
    return { msg: `Bilgi Eklenemedi: ${error}` };
  }
};

export const deleteInfo = async (_id: string) => {
  try {
    try {
      await dbConnect();
    } catch (error) {
      console.error(error);
      return [];
    }
    await InfoModel.findByIdAndDelete(_id);
    revalidatePath("/admin/infos");
    return { msg: "Bilgi Silindi" };
  } catch (error) {
    return { msg: `Bilgi Silinemedi: ${error}` };
  }
};

export const updateInfo = async (formData: InfoData) => {
  try {
    try {
      await dbConnect();
    } catch (error) {
      console.error(error);
      return [];
    }
    const { _id, content, name } = formData;
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
    await dbConnect();
  } catch (error) {
    console.error(error);
    return [];
  }
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
      from: email,
      subject: title,
      html: htmlTemplate,
    });
    return { msg: "Mesajınız Gönderildi", success: true };
  } catch (error) {
    return { msg: "Mesajınız Gönderildi: " + error, success: false };
  }
};
