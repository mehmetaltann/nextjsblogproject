import CategoryTableItem from "./CategoryTableItem";
import Pagination from "@/Components/Layouts/Pagination";
import { usePagination } from "@/lib/hooks/usePagination";
import { CategoryType } from "@/lib/types/types";

interface CategoryTableProps {
  allCategories: CategoryType[];
}

const CategoryTable = ({ allCategories }: CategoryTableProps) => {
  const { totalPages, displayPosts, onPageChange, currentPage } = usePagination(
    allCategories,
    15
  );

  return (
    <>
      <div className="relative rounded-lg overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-gray-700 bg-gray-50 text-base">
            <tr>
              <th scope="col" className="px-6 py-3 text-left">
                İsim
              </th>
              <th scope="col" className="p-2">
                Renk
              </th>
              <th scope="col" className="px-4 py-1 text-left">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody>
            {displayPosts?.map((category) => {
              return (
                <CategoryTableItem key={category._id} category={category} />
              );
            })}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
};

export default CategoryTable;
