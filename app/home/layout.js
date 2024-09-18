"use client";
import Navbar from "@/Components/Layouts/Navbar";
import Footer from "@/Components/Layouts/Footer";

export default function Layout({ children }) {
  return (
    <div className="mx-auto flex flex-col items-center justify-between w-full h-screen">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
