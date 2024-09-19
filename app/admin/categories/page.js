import CategoryModel from "@/lib/models/CategoryModel";
import Main from "@/Components/Admin/Category/Main";
import { Loader } from "@/Components/Layouts/Loader";
import { Suspense } from "react";

export default async function Category() {
  const categories = await CategoryModel.find({});
  const allCategories = JSON.parse(JSON.stringify(categories));

  return (
    <Suspense fallback={<Loader />}>
      <Main allCategories={allCategories} />
    </Suspense>
  );
}
