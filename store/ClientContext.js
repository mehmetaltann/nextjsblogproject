"use client";
import { createContext, useMemo, useState } from "react";

export const ClientContext = createContext("");

export const ClientContextProvider = (props) => {
  const [allPosts, setAllPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [searchItem, setSearchItem] = useState("");

  const value = useMemo(
    () => ({
      allPosts,
      setAllPosts,
      selectedCategory,
      setSelectedCategory,
      searchItem,
      setSearchItem,
    }),
    [
      allPosts,
      setAllPosts,
      selectedCategory,
      setSelectedCategory,
      searchItem,
      setSearchItem,
    ]
  );

  return (
    <ClientContext.Provider value={value}>
      {props.children}
    </ClientContext.Provider>
  );
};
