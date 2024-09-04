"use client";
import Navbar from "@/Components/Layouts/Navbar";
import Footer from "@/Components/Layouts/Footer";

const menus = [
  { id: 1, linkpage: "/home/about", title: "Hakkımızda" },
  { id: 2, linkpage: "/home/bloglist", title: "Blog Listesi" },
  { id: 3, linkpage: "/home/contact", title: "İletişim" },
];

export default function Layout({ children }) {
  return (
    <div className="mx-auto flex flex-col items-center justify-between w-full h-screen">
      <Navbar menus={menus} way="home" />
      {children}
      <Footer />
    </div>
  );
}
