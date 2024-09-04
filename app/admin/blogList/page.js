"use client";
import BlogsTable from "@/Components/Admin/BlogsList/BlogsTable";
import axios from "axios";
import AnimationWrapper from "@/Components/Layouts/AnimationWrapper";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const page = ({ type }) => {
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
    <AnimationWrapper keyValue={type}>
      <BlogsTable blogs={blogs} deleteBlog={deleteBlog} />
      <ToastContainer
        theme="dark"
        closeOnClick
        autoClose={2000}
        position="bottom-left"
      />
    </AnimationWrapper>
  );
};

export default page;
