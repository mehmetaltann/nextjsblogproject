"use client";

const CategoryTableItem = ({ name, mongoId, color, deleteHandler }) => {
  const divStyle = {
    "backgroundColor": "#" + color,
  };
  return (
    <tr className="bg-white border-b">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-left"
      >
        {name}
      </th>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-left"
      >
        <div style={divStyle} className={`py-2 px-0.2 rounded-full`}></div>
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
