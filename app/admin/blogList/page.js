"use client";
import BlogTableItem from "@/Components/AdminComponents/Blogs/BlogTableItem";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <div className="relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-sm text-gray-700 text-left uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="hidden sm:block px-6 py-3">
                Yazar
              </th>
              <th scope="col" className="px-6 py-3">
                Başlık
              </th>
              <th scope="col" className="px-6 py-3">
                Tarih
              </th>
              <th scope="col" className="px-6 py-3">
                İşlem
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.map(({ title, _id, date }) => {
              return (
                <BlogTableItem
                  key={_id}
                  mongoId={_id}
                  title={title}
                  date={date}
                  deleteBlog={deleteBlog}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
