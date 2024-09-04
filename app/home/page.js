"use client";
import axios from "axios";
import BlogPosts from "@/Components/Home/BlogPosts";
import { BlogContext } from "@/store/BlogContext";
import { useEffect, useState, useContext } from "react";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const { allBlogs, setAllBlogs } = useContext(BlogContext);

  const fetchCategories = async () => {
    const response = await axios.get("/api/category");
    setCategories(response.data.categories);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="w-2/3 mb-10">
      <BlogPosts blogs={allBlogs} />
    </div>
  );
}
