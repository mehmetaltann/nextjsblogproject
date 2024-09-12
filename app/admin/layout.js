"use client";
import AdminHeader from "@/Components/Admin/Header/AdminHeader";
import Navbar from "@/Components/Layouts/Navbar";
import { AdminContextProvider } from "@/store/AdminContext";
import { AiFillDashboard } from "react-icons/ai";
import { Icons } from "react-toastify";

export default function Layout({ children }) {
  return (
    <AdminContextProvider>
      <div className="flex flex-col h-screen lg:flex-row">
        <AdminHeader />
        <main className="bg-[#f9f9f9] flex-1 p-4 lg-p-6">{children}</main>
      </div>
    </AdminContextProvider>
  );
}