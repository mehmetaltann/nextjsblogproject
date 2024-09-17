"use client";
import Link from "next/link";
import NavItem from "./NavItem";
import { useWindowSize } from "@uidotdev/usehooks";
import { CldImage } from "next-cloudinary";
import { useEffect, useState } from "react";
import { RiMenuLine, RiCloseLine } from "react-icons/ri";
import { AiFillDashboard } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { FaUserAlt, FaSignOutAlt } from "react-icons/fa";
import { BsFillPencilFill } from "react-icons/bs";

const MENU_ITEMS = [
  {
    id: 1,
    link: "/admin",
    title: "Yazı Yönetimi",
    name: "dashboard",
    icon: <AiFillDashboard className="text-xl" />,
    type: "link",
  },
  {
    id: 2,
    link: "/admin/write",
    title: "Yeni Yazı",
    name: "newPost",
    icon: <BsFillPencilFill className="text-xl" />,
    type: "link",
  },
  {
    id: 3,
    link: "/admin/categories",
    title: "Kategoriler",
    name: "categories",
    icon: <BiCategoryAlt className="text-xl" />,
    type: "link",
  },
  {
    id: 4,
    link: "/admin/register",
    title: "Kullanıcı Kayıt",
    name: "user",
    icon: <FaUserAlt className="text-xl" />,
    type: "link",
  },
  {
    id: 5,
    link: "/home",
    title: "Çıkış Yap",
    name: "signOut",
    icon: <FaSignOutAlt className="text-xl" />,
    type: "link",
  },
];

const AdminHeader = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [activeNavName, setActiveNavName] = useState("dashboard");
  const windowSize = useWindowSize();
  const toggleMenuHandler = () => {
    setIsMenuActive((prevState) => !prevState);
  };

  useEffect(() => {
    if (windowSize.width < 1024) {
      setIsMenuActive(false);
    } else {
      setIsMenuActive(true);
    }
  }, [windowSize.width]);

  return (
    <header className="flex h-fit w-full items-center justify-between p-4 lg:h-full lg:max-w-[300px] lg:flex-col lg:items-start lg:justify-start lg:p-0">
      <Link href="/home">
        <CldImage
          src="https://res.cloudinary.com/duixszfkd/image/upload/v1725431523/logo.png"
          alt="admin_header_logo"
          priority={true}
          height={250}
          width={250}
          className="w-50 lg:hidden"
        />
      </Link>
      <div className="cursor-pointer z-50 lg:hidden">
        {isMenuActive ? (
          <RiCloseLine
            className="w-6 h-6 cursor-pointer"
            onClick={toggleMenuHandler}
          />
        ) : (
          <RiMenuLine
            className="w-6 h-6 cursor-pointer"
            onClick={toggleMenuHandler}
          />
        )}
      </div>
      {/* SIDEBAR CONTAINER */}
      {isMenuActive && (
        <div className="fixed inset-0 lg:static lg:h-full lg:w-full">
          {/* sidebar */}
          <div className="opacity-80 fixed top-0 bottom-0 left-0 z-10 w-3/4 overflow-y-auto bg-white p-4 lg:static lg:h-full lg:max-w-[300px] lg:p-6">
            <Link href="/home">
              <CldImage
                src="https://res.cloudinary.com/duixszfkd/image/upload/v1725431523/logo.png"
                alt="sidebar_logo"
                priority={true}
                height={250}
                width={250}
                className="w-50"
              />
            </Link>
            <h4 className="mt-10 font-bold text-color1">ANA MENÜ</h4>
            {/* menu icons */}
            <div className="mt-6 flex flex-col gap-y-[0.563rem]">
              {MENU_ITEMS.map((item) => (
                <NavItem
                  key={item.id}
                  link={item.link}
                  title={item.title}
                  icon={item.icon}
                  name={item.name}
                  activeNavName={activeNavName}
                  setActiveNavName={setActiveNavName}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default AdminHeader;
