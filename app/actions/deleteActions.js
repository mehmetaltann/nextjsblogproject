"use server";
import CategoryModel from "@/lib/models/CategoryModel";
import { revalidatePath } from "next/cache";

export async function deleteCategory(mongoId) {
  try {
    await CategoryModel.findByIdAndDelete(mongoId);
    revalidatePath("/admin/category");
  } catch (error) {
    console.log(error);
  }
}
