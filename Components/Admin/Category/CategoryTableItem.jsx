"use client";
import { deleteCategory } from "@/app/actions/actions";
import { toast } from "react-toastify";
import { memo } from "react";

const CategoryTableItem = ({ name, mongoId, color }) => {
  const divStyle = {
    backgroundColor: "#" + color,
  };

  return (
    <tr className="bg-white border-b">
      <th
        scope="row"
        className="px-6 py-4 text-gray-900 whitespace-nowrap text-left font-semibold"
      >
        {name}
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
            const { msg } = await deleteCategory(mongoId);
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
