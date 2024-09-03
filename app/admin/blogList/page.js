"use client";
import BlogsTable from "@/Components/AdminComponents/BlogsList/BlogsTable";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const page = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const response = await axios.get("/api/blog");
    setBlogs(response.data.blogs);
  };

  const deleteBlog = async (mongoId) => {
    const response = await axios.delete(`/api/blog`, {
      params: {
        id: mongoId,
      },
    });
    if (response.data.success) {
      toast.success(response.data.msg);
      fetchBlogs();
    } else {
      toast.error("İşlem Gerçekleşmedi");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <>
      <BlogsTable blogs={blogs} deleteBlog={deleteBlog} />
      <ToastContainer
        theme="dark"
        closeOnClick
        autoClose={2000}
        position="bottom-left"
      />
    </>
  );
};

export default page;
