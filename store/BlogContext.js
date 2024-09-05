"use client";
import { createContext, useMemo, useState } from "react";

export const BlogContext = createContext("");

export const BlogContextProvider = (props) => {
  const [blogCont, setBlogCont] = useState(null);
  const [allBlogs, setAllBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Tümü");

  const value = useMemo(
    () => ({
      blogCont,
      setBlogCont,
      allBlogs,
      setAllBlogs,
      selectedCategory,
      setSelectedCategory,
    }),
    [
      blogCont,
      setBlogCont,
      allBlogs,
      setAllBlogs,
      selectedCategory,
      setSelectedCategory,
    ]
  );

  return (
    <BlogContext.Provider value={value}>{props.children}</BlogContext.Provider>
  );
};
