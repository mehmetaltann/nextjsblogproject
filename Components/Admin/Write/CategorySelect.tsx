import Select, { MultiValue } from "react-select";
import { AdminContext } from "@/store/AdminContext";
import { useContext, useEffect, useMemo } from "react";

interface CategoryOption {
  value: string;
  label: string;
}

interface CategorySelectProps {
  optionsData: CategoryOption[];
}

const CategorySelect = ({ optionsData }: CategorySelectProps) => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error(
      "useClientContext must be used within a ClientContextProvider"
    );
  }
  const { setCategories, options, setOptions, selectDefaultValue } = context;

  useEffect(() => {
    if (JSON.stringify(options) !== JSON.stringify(optionsData)) {
      setOptions(optionsData);
    }
  }, [optionsData, setOptions]);

  const handleChange = (selectedOptions: MultiValue<CategoryOption> | null) => {
    setCategories(
      selectedOptions
        ? selectedOptions.map((option) => ({ name: option.value }))
        : []
    );
  };

  return (
    <>
      {options && (
        <Select
          isMulti
          defaultValue={selectDefaultValue || []}
          instanceId="categoryType"
          placeholder="Kategori ..."
          options={options}
          className="z-40 basic-multi-select border text-lg text-opacity-60 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
          classNamePrefix="select"
          onChange={handleChange}
        />
      )}
    </>
  );
};

export default CategorySelect;
