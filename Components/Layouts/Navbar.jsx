"use client";
import Link from "next/link";
import clsx from "clsx";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { RiMenuLine, RiCloseLine } from "react-icons/ri";
import { CldImage } from "next-cloudinary";

const Navbar = ({ menus, way }) => {
  const [openProfile, setOpenProfile] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <main className="space-x-4 sticky top-0 bg-white/20 backdrop-blur-lg w-full md:w-3/4 z-[9999]">
      <nav className="flex justify-between px-12 items-center py-4">
        <div className="flex items-center gap-8 ">
          <section className="flex items-center gap-4">
            <RiMenuLine
              className="text-3xl cursor-pointer md:hidden "
              onClick={() => setIsSideMenuOpen(true)}
            />
            <Link href="/" className="text-4xl font-mono">
              <CldImage
                src="https://res.cloudinary.com/duixszfkd/image/upload/v1725431523/logo.png"
                alt="navbar_logo"
                priority={true}
                height={250}
                width={250}
              />
            </Link>
          </section>
          {menus.map(({ id, linkpage, title }) => (
            <Link
              key={id}
              href={linkpage}
              className="hidden md:block text-color1 hover:text-color5 text-lg font-semibold opacity-55 hover:opacity-100"
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
            <RiCloseLine
              className="text-3xl mt-0 mb-8 cursor-pointer"
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
            <CldImage
              src="https://res.cloudinary.com/duixszfkd/image/upload/v1725431524/profile_icon.png"
              alt="profil_logo"
              priority={true}
              height={50}
              width={50}
              className="cursor-pointer rounded-full"
            />
          </button>
          {openProfile && (
            <div className="absolute mt-16 right-4 text-base list-none text-color1 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
              <div className="px-4 py-3">
                <span className="block text-sm font-semibold text-gray-900 dark:text-white">
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
