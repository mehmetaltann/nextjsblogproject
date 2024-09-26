"use client";
import { deleteCategory } from "@/app/actions/actions";
import { toast } from "react-toastify";
import { memo } from "react";
import { CategoryType } from "@/lib/types/types";

const CategoryTableItem = ({ category }: { category: CategoryType }) => {
  const divStyle = {
    backgroundColor: "#" + category.color,
  };

  return (
    <tr className="bg-white border-b">
      <th
        scope="row"
        className="px-6 py-4 text-gray-900 whitespace-nowrap text-left font-semibold"
      >
        {category.name}
      </th>
      <th
        scope="row"
        className="p-4 font-medium text-gray-900 whitespace-nowrap text-left"
      >
        <div style={divStyle} className={`py-2 px-0.2 rounded-full`}></div>
      </th>
      <th
        scope="row"
        className="px-6 py-4 cursor-pointer text-center w-2"
        style={{ textAlign: "center" }}
      >
        <button
          className="py-1 px-4 rounded-3xl bg-color8 text-white text-sm"
          onClick={async () => {
            const { msg } = await deleteCategory(category._id);
            toast.success(msg);
          }}
        >
          Sil
        </button>
      </th>
    </tr>
  );
};

export default memo(CategoryTableItem);
