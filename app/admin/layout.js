"use client";
import Navbar from "@/Components/Layouts/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const menus = [
  { id: 1, linkpage: "/admin/write", src: "add_item", title: "Blog Ekle" },
  { id: 2, linkpage: "/admin/blogList", src: "list", title: "Blog Listesi" },
  {
    id: 3,
    linkpage: "/admin/subscription",
    src: "followers",
    title: "Takipçiler",
  },
  { id: 4, linkpage: "/admin/category", src: "category", title: "Kategoriler" },
];

export default function Layout({ children }) {
  return (
    <div className="flex flex-col items-center w-full h-screen">
      <ToastContainer theme="dark" />
      <Navbar menus={menus} way="admin" />
      {children}
    </div>
  );
}
