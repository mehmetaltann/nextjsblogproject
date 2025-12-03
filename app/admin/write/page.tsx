import AddPostPanel from "@/Components/Admin/Write/AddPostPanel";
import { fetchCategories } from "@/app/actions/fetchDatas";
import { Loader } from "@/Components/Layouts/Loader";
import { CategoryType } from "@/lib/types/types";

export default async function Write() {
  let allCategories: CategoryType[] = [];

  try {
    const fetchedCategories = (await fetchCategories()) as CategoryType[];
    if (fetchedCategories) {
      allCategories = fetchedCategories;
    }
  } catch (error) {
    console.error("Kategoriler çekilemedi:", error);
  }

  if (allCategories.length === 0) {
    return <Loader />;
  }
  return <AddPostPanel allCategories={allCategories} />;
}
