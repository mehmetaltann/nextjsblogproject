import AddPostPanel from "@/Components/Admin/Write/AddPostPanel";
import { fetchCategories } from "@/app/actions/fetchDatas";
import { Loader } from "@/Components/Layouts/Loader";
import { CategoryType } from "@/lib/types/types";

export default async function Write() {
  const allCategories = (await fetchCategories()) as CategoryType[];

  return (
    <>
      {allCategories ? (
        <AddPostPanel allCategories={allCategories} />
      ) : (
        <Loader />
      )}
    </>
  );
}
