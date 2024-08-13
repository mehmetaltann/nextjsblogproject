import SideBar from "@/Components/AdminComponents/SideBar";
import AdminHeader from "@/Components/AdminComponents/AdminHeader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "../provider";

export default function Layout({ children }) {
  return (
    <>
      <div className="flex">
        <ToastContainer theme="dark" />
        <SideBar />
        <div className="flex flex-col w-full">
          <AdminHeader />
          {children}
        </div>
      </div>
    </>
  );
}
