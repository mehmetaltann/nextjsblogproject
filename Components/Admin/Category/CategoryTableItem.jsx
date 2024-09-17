import { useCategory } from "@/app/hooks/useCategory";
import DeleteButton from "@/Components/ui/DeleteButton";

const CategoryTableItem = ({ name, mongoId, color }) => {
  const divStyle = {
    backgroundColor: "#" + color,
  };

  const { deleteCategory } = useCategory();

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
        style={{ "text-align": "center" }}
      >
        <DeleteButton deleteHandler={deleteCategory} id={mongoId} />
      </th>
    </tr>
  );
};

export default CategoryTableItem;
