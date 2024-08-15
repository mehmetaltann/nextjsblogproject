"use client";

const CategoryTableItem = ({ name, mongoId, deleteHandler }) => {
  return (
    <tr className="bg-white border-b">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-left"
      >
        {name}
      </th>
      <td
        onClick={() => deleteHandler(mongoId)}
        className="px-6 py-4 cursor-pointer text-left"
      >
        X
      </td>
    </tr>
  );
};

export default CategoryTableItem;
