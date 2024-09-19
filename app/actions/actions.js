"use server";
import CategoryModel from "@/lib/models/CategoryModel";
import BlogModel from "@/lib/models/BlogModel";
import UserModel from "@/lib/models/UserModel";
import bcrypt from "bcryptjs";
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

export const userCheck = async (email) => {
  try {
    let isToBe = false;
    const user = await UserModel.findOne({ email }).select("_id");
    if (user) isToBe = true;
    return { isToBe };
  } catch (error) {
    return { msg: error };
  }
};

export const userRegister = async (formData) => {
  try {
    const { isim, email, password } = formData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = {
      isim,
      email,
      password: hashedPassword,
    };
    await UserModel.create(userData);
    return { msg: "Kullanıcı Kaydedildi", isSuccess: true };
  } catch (error) {
    return { msg: "Bu kullanıcı kayıtlıdır: " + error };
  }
};
