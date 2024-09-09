"use client";
import { createContext, useMemo, useState } from "react";

export const AdminContext = createContext("");

export const AdminContextProvider = (props) => {
  const [selectDefaultValue, setSelectDefaultValue] = useState();
  const [options, setOptions] = useState([]);
  const [isNewPost, setIsNewPost] = useState(true);
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [postId, setPostId] = useState("");
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
      postId,
      setPostId,
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
      postId,
      setPostId,
    ]
  );

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};
