"use client";
import Navbar from "@/Components/Layouts/Navbar";
import { AdminContextProvider } from "@/store/AdminContext";

const menus = [
  { id: 1, linkpage: "/admin/write", title: "Yeni Yazı" },
  { id: 2, linkpage: "/admin/blogList", title: "Blog Listesi" },
  {
    id: 3,
    linkpage: "/admin/subscription",
    title: "Takipçiler",
  },
  { id: 4, linkpage: "/admin/category", title: "Kategoriler" },
];

export default function Layout({ children }) {
  return (
    <AdminContextProvider>
      <div className="flex flex-col items-center w-full h-screen">
        <Navbar menus={menus} way="admin" />
        {children}
      </div>
    </AdminContextProvider>
  );
}
