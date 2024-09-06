import Select from "react-select";
import axios from "axios";
import { AdminContext } from "@/store/AdminContext";
import { useContext, useEffect } from "react";

const CategorySelect = () => {
  const { categories, setCategories, options, setOptions, selectDefaultValue } =
    useContext(AdminContext);

  const fetchCategories = async () => {
    const response = await axios.get("/api/category");
    const data = response.data.categories.map((o) => {
      return { label: o.name, value: o.name };
    });
    setOptions(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      {options && (
        <Select
          isMulti
          defaultValue={selectDefaultValue}
          valueField="value"
          instanceId="categoryType"
          placeholder="Kategori ..."
          options={options}
          className="basic-multi-select bg-gray-50 border text-xl border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
          classNamePrefix="select"
          onChange={(value) =>
            setCategories(
              value.map((o) => {
                return { name: o.value };
              })
            )
          }
        />
      )}
    </>
  );
};

export default CategorySelect;
