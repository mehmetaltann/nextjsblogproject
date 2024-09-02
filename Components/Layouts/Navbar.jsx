"use client";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { assets } from "@/Assets/assets";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = ({ menus, way }) => {
  const [openProfile, setOpenProfile] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <main className="space-x-4 sticky top-0 bg-white/20 dark:bg-black/20 backdrop-blur-lg w-full md:w-3/4 z-[9999]">
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
          {menus.map(({ id, linkpage, title }) => (
            <Link
              key={id}
              href={linkpage}
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
            {menus.map(({ id, linkpage, title }) => (
              <Link key={id} href={linkpage} className="font-bold">
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

              {way === "home" ? (
                session ? (
                  <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                      <Link
                        href="/admin"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Yönetici Paneli
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => signOut()}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Çıkış Yap
                      </button>
                    </li>
                  </ul>
                ) : (
                  <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                      <button
                        onClick={() => signIn()}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Giriş Yap
                      </button>
                    </li>
                  </ul>
                )
              ) : (
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
              )}
            </div>
          )}
        </section>
      </nav>
    </main>
  );
};

export default Navbar;
