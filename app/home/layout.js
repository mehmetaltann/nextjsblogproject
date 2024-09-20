"use client";
import Navbar from "@/Components/Layouts/Navbar";
import dynamic from "next/dynamic";

const DynamicFooter = dynamic(() => import("../../Components/Layouts/Footer"), {
  ssr: false,
});

export default function Layout({ children }) {
  return (
    <div className="mx-auto flex flex-col items-center justify-between w-full h-screen">
      <Navbar />
      {children}
      <DynamicFooter />
    </div>
  );
}
