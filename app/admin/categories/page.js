import Main from "@/Components/Admin/Category/Main";
import { Loader } from "@/Components/Layouts/Loader";
import { Suspense } from "react";
import { fetchCategories } from "@/app/actions/fetchDatas";
import { unstable_cache } from "next/cache";

const cachedFetchCategoryData = unstable_cache(fetchCategories, [], {
  revalidate: 240,
  tags: ["categories"],
});

export default async function Category() {
  const { allCategories } = await cachedFetchCategoryData();

  return (
    <Suspense fallback={<Loader />}>
      <Main allCategories={allCategories} />
    </Suspense>
  );
}
