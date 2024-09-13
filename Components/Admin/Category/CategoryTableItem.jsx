import axios from "axios";

const CategoryTableItem = ({ name, mongoId, color, mutate }) => {
  const divStyle = {
    backgroundColor: "#" + color,
  };

  const handleDelete = async () => {
    const response = await axios.delete(`/api/category`, {
      params: {
        id: mongoId,
      },
    });
    mutate();
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
        className="p-4 font-medium text-gray-900 whitespace-nowrap text-left"
      >
        <div style={divStyle} className={`py-2 px-0.2 rounded-full`}></div>
      </th>
      <td
        onClick={handleDelete}
        className="px-6 py-4 cursor-pointer text-center"
      >
        X
      </td>
    </tr>
  );
};

export default CategoryTableItem;
