import { assets } from "@/Assets/assets";
import { ToastContainer } from "react-toastify";
import SideBar from "@/Components/AdminComponents/SideBar";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";
import LoginForm from "@/Components/AuthComponents/LoginForm";
import RegisterForm from "@/Components/AuthComponents/RegisterForm";

export default function Layout({ children }) {
  return (
    <>
      <div className="flex">
        <ToastContainer theme="dark" />
        <LoginForm />
        <RegisterForm/>
        <SideBar />
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between w-full py-3 max-h-[60px] px-12 border-b border-black">
            <h3 className="font-medium"> Yönetici Paneli </h3>
            <Image
              src={assets.profile_icon}
              width={40}
              alt="profile_icon_side"
            />
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
