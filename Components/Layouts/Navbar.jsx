"use client";
import Link from "next/link";
import clsx from "clsx";
import useOnclickOutside from "react-cool-onclickoutside";
import SearchInput from "../ui/SearchInput";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { RiMenuLine, RiCloseLine } from "react-icons/ri";
import { CldImage } from "next-cloudinary";
import { usePathname } from "next/navigation";

const menus = [
  { id: 1, linkpage: "/home/about", title: "Hakkımızda" },
  { id: 2, linkpage: "/home/bloglist", title: "Blog Listesi" },
  { id: 3, linkpage: "/home/contact", title: "İletişim" },
];

const Navbar = () => {
  const [openProfile, setOpenProfile] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();

  const ref = useOnclickOutside(() => {
    setOpenProfile(false);
  });

  return (
    <main className="space-x-4 sticky top-0 bg-white/20 backdrop-blur-lg w-full xl:w-3/4 z-[9999]">
      <nav
        className={clsx(
          "flex justify-between md:px-12 items-center pt-4 gap-4",
          pathname === "/home" && "flex-col md:flex-row px-4"
        )}
      >
        <div className="flex items-center gap-8">
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
              className="hidden md:block text-color1 hover:text-color5 lg:text-lg font-semibold opacity-75 min-w-[90px] lg:min-w-[100px] first-letter:hover:opacity-100"
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
        <section className="flex items-center gap-4">
          {pathname === "/home" && <SearchInput />}
          <button
            type="button"
            className="flex text-sm bg-gray-800 rounded-full me-5 md:me-0 focus:ring-4 focus:ring-gray-300 "
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
            <div
              ref={ref}
              className="absolute mt-48 right-4 text-base list-none text-color1 bg-white divide-y divide-gray-100 rounded-lg shadow"
            >
              <div className="px-4 py-3">
                <span className="block text-sm font-semibold text-gray-900 ">
                  Mehmet ALTAN
                </span>
                <span className="block text-sm  text-gray-500 truncate ">
                  mehmetaltann@gmail.com
                </span>
              </div>
              {session ? (
                <div className="flex flex-col justify-center items-start">
                  <Link
                    href={"/admin"}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Yönetici Paneli
                  </Link>
                  <button
                    onClick={() =>
                      signOut({ callbackUrl: "/", redirect: true })
                    }
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Çıkış Yap
                  </button>{" "}
                </div>
              ) : (
                <button
                  onClick={() => signIn()}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                >
                  Giriş Yap
                </button>
              )}
            </div>
          )}
        </section>
      </nav>
    </main>
  );
};

export default Navbar;
