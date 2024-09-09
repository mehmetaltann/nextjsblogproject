"use client";
import { createContext, useMemo, useState } from "react";

export const ClientContext = createContext("");

export const ClientContextProvider = (props) => {
  const [allPosts, setAllPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Tümü");

  const value = useMemo(
    () => ({
      allPosts,
      setAllPosts,
      selectedCategory,
      setSelectedCategory,
    }),
    [allPosts, setAllPosts, selectedCategory, setSelectedCategory]
  );

  return (
    <ClientContext.Provider value={value}>
      {props.children}
    </ClientContext.Provider>
  );
};
