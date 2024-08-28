import AdminNavbar from "@/Components/AdminComponents/Layout/AdminNavbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "../provider";

export default function Layout({ children }) {
  return (
    <>
      <div className="flex flex-col items-center w-full">
        <ToastContainer theme="dark" />
        <AdminNavbar />
        {children}
      </div>
    </>
  );
}
