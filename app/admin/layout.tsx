import React, { ReactNode } from "react";
import AdminHeader from "@/Components/Admin/Header/AdminHeader";
import { AdminContextProvider } from "@/store/AdminContext";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <AdminContextProvider>
      <div className="flex flex-col lg:flex-row">
        <AdminHeader />
        <main className="bg-[#f9f9f9] flex-1 p-4 lg:p-6 h-screen">
          {children}
        </main>
      </div>
    </AdminContextProvider>
  );
};

export default Layout;
