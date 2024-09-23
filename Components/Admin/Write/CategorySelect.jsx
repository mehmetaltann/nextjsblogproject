"use client";
import Select from "react-select";
import { AdminContext } from "@/store/AdminContext";
import { useContext, useEffect } from "react";

const CategorySelect = ({ optionsData }) => {
  const { setCategories, options, setOptions, selectDefaultValue } =
    useContext(AdminContext);

  useEffect(() => {
    setOptions(optionsData);
  }, [optionsData]);

  return (
    <>
      {options && (
        <Select
          isMulti
          defaultValue={selectDefaultValue || []}
          valueField="value"
          instanceId="categoryType"
          placeholder="Kategori ..."
          options={options}
          className="z-40 basic-multi-select border text-lg text-opacity-60 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
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
