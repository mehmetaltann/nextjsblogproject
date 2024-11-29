import Main from "@/Components/Admin/Category/Main";
import { Loader } from "@/Components/Layouts/Loader";
import { fetchCategories } from "@/app/actions/fetchDatas";
import { CategoryType } from "@/lib/types/types";

export default async function Category() {
  const allCategories = (await fetchCategories()) as CategoryType[];

  return (
    <>{allCategories ? <Main allCategories={allCategories} /> : <Loader />}</>
  );
}
