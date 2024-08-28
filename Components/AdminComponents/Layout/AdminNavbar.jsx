"use client";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { assets } from "@/Assets/assets";
import { useState } from "react";
import { signOut } from "next-auth/react";

const sidebarMenus = [
  { id: 1, linkpage: "write", src: "add_item", title: "Blog Ekle" },
  { id: 2, linkpage: "blogList", src: "list", title: "Blog Listesi" },
  { id: 3, linkpage: "subscription", src: "followers", title: "Takipçiler" },
  { id: 4, linkpage: "category", src: "category", title: "Kategoriler" },
];

const AdminNavbar = () => {
  const [openProfile, setOpenProfile] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  return (
    <main className="w-full lg:px-24">
      <nav className="flex justify-between px-12 items-center py-4">
        <div className="flex items-center gap-8 ">
          <section className="flex items-center gap-4">
            <Image
              className="text-3xl cursor-pointer md:hidden"
              src={assets.menuIcon}
              width={30}
              alt="navbar_open"
              onClick={() => setIsSideMenuOpen(true)}
            />
            <Link href="/" className="text-4xl font-mono">
              <Image src={assets.logo} width={120} alt="navbar_logo" />
            </Link>
          </section>
          {sidebarMenus.map(({ id, linkpage, title }) => (
            <Link
              key={id}
              href={`/admin/${linkpage}`}
              className="hidden  md:block text-gray-400 hover:text-black"
            >
              <p>{title}</p>
            </Link>
          ))}
        </div>
        <div
          className={clsx(
            "z-50 fixed h-full w-screen md:hidden bg-black/50 backdrop-blur-sm top-0 right-0 -translate-x-full transition-all",
            isSideMenuOpen && "translate-x-0"
          )}
        >
          <section className="text-black bg-white flex flex-col w-56 absolute left-0 top-0 h-screen p-8 gap-8">
            <Image
              className="text-3xl mt-0 mb-8 cursor-pointer"
              src={assets.closeIcon}
              width={30}
              alt="navbar_close"
              onClick={() => setIsSideMenuOpen(false)}
            />
            {sidebarMenus.map(({ id, linkpage, title }) => (
              <Link key={id} href={`/admin/${linkpage}`} className="font-bold">
                <p>{title}</p>
              </Link>
            ))}
          </section>
        </div>
        <section className="flex flex-col items-center gap-4">
          <button
            type="button"
            className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            onClick={() => {
              setOpenProfile((prev) => !prev);
            }}
          >
            <Image
              src={assets.profile_icon}
              width={50}
              height={50}
              alt="profile_icon_side"
              id="avatarButton"
              type="button"
              className="cursor-pointer rounded-full"
            />
          </button>
          {openProfile && (
            <div className="absolute mt-16 right-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">
                  Mehmet ALTAN
                </span>
                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                  mehmetaltann@gmail.com
                </span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <Link
                    href="/admin/register"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Kullanıcı Kayıt
                  </Link>
                </li>

                <li>
                  <Link
                    onClick={() =>
                      signOut({ callbackUrl: "http://localhost:3000" })
                    }
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Çıkış Yap
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </section>
      </nav>
      <hr />
    </main>
  );
};

export default AdminNavbar;

/* ,

{openProfile && (
            <div className="flex flex-col dropDownProfile">
              <ul className="flex flex-col gap-4">
                <li>
                  <Link
                    href="/admin/register"
                    className="text-sm text-gray-400 font-semibold tracking-tight"
                  >
                    Kullanıcı Kayıt
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() =>
                      signOut({ callbackUrl: "http://localhost:3000" })
                    }
                    className="text-sm text-gray-400 font-semibold tracking-tight"
                  >
                    Çıkış Yap
                  </button>
                </li>
              </ul>
            </div>
          )}

*/
