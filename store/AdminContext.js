"use client";
import { createContext, useMemo, useState } from "react";

export const AdminContext = createContext("");

export const AdminContextProvider = (props) => {
  const [options, setOptions] = useState([]);
  const [isNewPost, setIsNewPost] = useState(true);
  const [selectDefaultValue, setSelectDefaultValue] = useState({
    label: "",
    value: "",
  });
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isHome, setIsHome] = useState(false);
  const [cloudinaryImageId, setCloudinaryImageId] = useState(null);

  const value = useMemo(
    () => ({
      categories,
      isHome,
      cloudinaryImageId,
      setCloudinaryImageId,
      setIsHome,
      setCategories,
      title,
      setTitle,
      description,
      setDescription,
      options,
      setOptions,
      selectDefaultValue,
      setSelectDefaultValue,
      isNewPost,
      setIsNewPost,
    }),
    [
      categories,
      isHome,
      cloudinaryImageId,
      setCloudinaryImageId,
      setIsHome,
      setCategories,
      title,
      setTitle,
      description,
      selectDefaultValue,
      setSelectDefaultValue,
      setDescription,
      options,
      setOptions,
      isNewPost,
      setIsNewPost,
    ]
  );

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};
