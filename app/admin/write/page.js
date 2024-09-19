import AddPostPanel from "@/Components/Admin/Write/AddPostPanel";
import CategoryModel from "@/lib/models/CategoryModel";
import { Loader } from "@/Components/Layouts/Loader";
import { Suspense } from "react";

export default async function Write() {
  const categories = await CategoryModel.find({});
  const allCategories = JSON.parse(JSON.stringify(categories));

  return (
    <Suspense fallback={<Loader />}>
      <AddPostPanel allCategories={allCategories} />
    </Suspense>
  );
}
