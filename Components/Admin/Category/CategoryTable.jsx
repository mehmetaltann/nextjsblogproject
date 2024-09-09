"use client";

import CategoryTableItem from "./CategoryTableItem";

const CategoryTable = ({ categories, deleteCategory }) => {
  return (
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
            <th scope="col" className="px-4 py-1">
              İşlemler
            </th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((item, index) => {
            return (
              <CategoryTableItem
                key={index}
                name={item.name}
                mongoId={item._id}
                color={item.color}
                deleteHandler={deleteCategory}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;