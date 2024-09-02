"use client";
import axios from "axios";
import CategorySelect from "@/Components/HomePageComponents/CategorySelect";
import HomeBlogList from "@/Components/HomePageComponents/HomeBlogList";
import BlogPostPreview from "@/Components/HomePageComponents/BlogPostPreview";
import BlogPosts from "@/Components/HomePageComponents/BlogPosts";
import { useCallback, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [menu, setMenu] = useState("Tümü");
  const [categories, setCategories] = useState([]);
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const response = await axios.get("/api/blog");
    setBlogs(response.data.blogs);
  };

  const fetchCategories = useCallback(async () => {
    const response = await axios.get("/api/category");
    setCategories(response.data.categories);
  }, []);

  useEffect(() => {
    fetchCategories();
    fetchBlogs();
  }, []);

  return (
    <div className="w-2/3 mb-10">
      <BlogPosts menu={menu} blogs={blogs} />
    </div>
  );
}

/*  

<div className="w-full">
        <CategorySelect menu={menu} setMenu={setMenu} categories={categories} />
      </div>
*/
