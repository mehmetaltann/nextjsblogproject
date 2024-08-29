"use client";
import { createContext, useMemo, useState } from "react";

export const BlogContext = createContext("");

export const BlogContextProvider = (props) => {
  const [blogCont, setBlogCont] = useState(null);

  const value = useMemo(
    () => ({ blogCont, setBlogCont }),
    [blogCont, setBlogCont]
  );

  return (
    <BlogContext.Provider value={value}>{props.children}</BlogContext.Provider>
  );
};
