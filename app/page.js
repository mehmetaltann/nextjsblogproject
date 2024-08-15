"use client";
import Footer from "@/Components/Layouts/Footer";
import Header from "@/Components/Layouts/Header";
import BlogList from "@/Components/HomePageComponents/BlogList";
import CategorySelect from "@/Components/HomePageComponents/CategorySelect";
import axios from "axios";
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

  console.log(categories);

  return (
    <>
      <div className="flex flex-col justify-between h-screen">
        <div>
          <Header />
          <CategorySelect
            menu={menu}
            setMenu={setMenu}
            categories={categories}
          />
        </div>
        <BlogList menu={menu} blogs={blogs} />
        <ToastContainer theme="dark" />
        <Footer />
      </div>
    </>
  );
}
