"use server";
import CategoryModel from "@/lib/models/CategoryModel";
import { revalidatePath } from "next/cache";

export async function addCategory(formData) {
  await CategoryModel.create({
    name: formData.get("catName"),
    color: formData.get("catColor"),
  });

  revalidatePath("/admin/category");
}
