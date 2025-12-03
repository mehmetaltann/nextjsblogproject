"use client";
import Footer from "@/Components/Layouts/Footer";
import Navbar from "@/Components/Layouts/Header/Navbar";
import { ReactNode, FC } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <main className="mx-auto flex flex-col items-center justify-between w-full h-screen">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
};

export default Layout;
