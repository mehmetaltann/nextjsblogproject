"use client";
import { createContext, useMemo, useState } from "react";

export const ClientContext = createContext("");

export const ClientContextProvider = (props) => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Tümü");

  const value = useMemo(
    () => ({
      allBlogs,
      setAllBlogs,
      selectedCategory,
      setSelectedCategory,
    }),
    [allBlogs, setAllBlogs, selectedCategory, setSelectedCategory]
  );

  return (
    <ClientContext.Provider value={value}>
      {props.children}
    </ClientContext.Provider>
  );
};
