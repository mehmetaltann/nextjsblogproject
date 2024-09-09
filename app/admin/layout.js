"use client";
import Navbar from "@/Components/Layouts/Navbar";
import { AdminContextProvider } from "@/store/AdminContext";

const menus = [
  {
    id: 1,
    linkpage: "/admin",
    title: "Yönetici Ana Sayfa",
  },
  {
    id: 2,
    linkpage: "/admin/write",
    title: "Yeni Yazı",
  },
  {
    id: 3,
    linkpage: "/admin/category",
    title: "Kategoriler",
  },
  {
    id: 4,
    linkpage: "/admin/register",
    title: "Kullanıcı Kayıt",
  },
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
