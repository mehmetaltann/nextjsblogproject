import Main from "@/Components/Admin/Category/Main";
import { Loader } from "@/Components/Layouts/Loader";
import { fetchCategories } from "@/app/actions/fetchDatas";
import { CategoryType } from "@/lib/types/types";

export default async function Category() {
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

  return <Main allCategories={allCategories} />;
}
