import AddPostPanel from "@/Components/Admin/Write/AddPostPanel";
import { fetchCategories } from "@/app/actions/fetchDatas";
import { Loader } from "@/Components/Layouts/Loader";
import { Suspense } from "react";

export default async function Write() {
  const { allCategories } = await fetchCategories();

  return (
    <Suspense fallback={<Loader />}>
      <AddPostPanel allCategories={allCategories} />
    </Suspense>
  );
}
