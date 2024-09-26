"use client";
import Footer from "@/Components/Layouts/Footer";
import Navbar from "@/Components/Layouts/Navbar";
import { ReactNode, FC } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="mx-auto flex flex-col items-center justify-between w-full h-screen">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
