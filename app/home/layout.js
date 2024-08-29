"use client";
import Navbar from "@/Components/Layouts/Navbar";
import Footer from "@/Components/Layouts/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const menus = [
  { id: 1, linkpage: "/home/about", src: "add_item", title: "Hakkımızda" },
  { id: 2, linkpage: "/home/contact", src: "list", title: "İletişim" },
];

export default function Layout({ children }) {
  return (
    <div className="flex flex-col items-center justify-between w-full h-screen">
      <ToastContainer theme="dark" />
      <Navbar menus={menus} way="home" />
      {children}
      <Footer />
    </div>
  );
}
