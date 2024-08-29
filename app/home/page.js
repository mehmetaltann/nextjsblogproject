"use client";
import axios from "axios";
import CategorySelect from "@/Components/HomePageComponents/CategorySelect";
import HomeBlogList from "@/Components/HomePageComponents/HomeBlogList";
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
    <div className="flex flex-col items-center justify-between">
      <div className="w-full">
        <CategorySelect menu={menu} setMenu={setMenu} categories={categories} />
      </div>
      <HomeBlogList menu={menu} blogs={blogs} />
      <ToastContainer theme="dark" />
    </div>
  );
}
