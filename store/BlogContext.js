"use client";
import axios from "axios";
import { createContext, useEffect, useMemo, useState } from "react";

export const BlogContext = createContext("");

export const BlogContextProvider = (props) => {
  const [blogCont, setBlogCont] = useState(null);
  const [allBlogs, setAllBlogs] = useState([]);

  const fetchBlogs = async () => {
    const response = await axios.get("/api/blog");
    setAllBlogs(response.data.blogs);
  };

  useEffect(() => {
    fetchBlogs();
  }, [props]);

  const value = useMemo(
    () => ({ blogCont, setBlogCont, allBlogs, setAllBlogs }),
    [blogCont, setBlogCont, allBlogs, setAllBlogs]
  );

  return (
    <BlogContext.Provider value={value}>{props.children}</BlogContext.Provider>
  );
};
