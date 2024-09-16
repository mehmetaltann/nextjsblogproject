"use client";
import Link from "next/link";
import NavItem from "./NavItem";
import NavItemCollapse from "./NavItemCollapse";
import { useWindowSize } from "@uidotdev/usehooks";
import { CldImage } from "next-cloudinary";
import { useEffect, useState } from "react";
import { RiMenuLine, RiCloseLine } from "react-icons/ri";
import { FaComments } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { AiFillDashboard } from "react-icons/ai";

const MENU_ITEMS = [
  {
    id: 1,
    link: "/admin",
    title: "Dashboard",
    name: "dashboard",
    icon: <AiFillDashboard className="text-xl" />,
    type: "link",
  },
  {
    id: 2,
    link: "/admin/comments",
    title: "Yorumlar",
    name: "comments",
    icon: <FaComments className="text-xl" />,
    type: "link",
  },
  {
    id: 3,
    content: [
      { title: "Post Editör", link: "/admin/posts/write" },
      { title: "Post Yönetimi", link: "/admin/posts/manage" },
    ],
    title: "Yazılar",
    name: "posts",
    icon: <MdDashboard className="text-xl" />,
    type: "collapse",
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
              {MENU_ITEMS.map((item) =>
                item.type === "link" ? (
                  <NavItem
                    key={item.id}
                    link={item.link}
                    title={item.title}
                    icon={item.icon}
                    name={item.name}
                    activeNavName={activeNavName}
                    setActiveNavName={setActiveNavName}
                  />
                ) : (
                  <NavItemCollapse
                    key={item.id}
                    content={item.content}
                    title={item.title}
                    icon={item.icon}
                    name={item.name}
                    activeNavName={activeNavName}
                    setActiveNavName={setActiveNavName}
                  />
                )
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default AdminHeader;
