import Link from "next/link";
import clsx from "clsx";
import useOnclickOutside from "react-cool-onclickoutside";
import SearchInput from "../ui/SearchInput";
import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { RiMenuLine, RiCloseLine } from "react-icons/ri";
import { CldImage } from "next-cloudinary";
import { FaLinkedin } from "react-icons/fa";
import { usePathname } from "next/navigation";

interface MenuItem {
  id: number;
  linkpage: string;
  title: string;
}

const menus: MenuItem[] = [
  { id: 1, linkpage: "/home", title: "Anasayfa" },
  { id: 2, linkpage: "/home/about", title: "Hakkımızda" },
  { id: 3, linkpage: "/home/bloglist", title: "Blog Listesi" },
  { id: 4, linkpage: "/home/contact", title: "İletişim" },
];

const Navbar: React.FC = () => {
  const [openProfile, setOpenProfile] = useState<boolean>(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState<boolean>(false);
  const { data: session } = useSession();
  const pathname = usePathname();

  const ref = useOnclickOutside(() => {
    setOpenProfile(false);
  });

  // Logo boyutları koşullu
  const LogoSize = pathname === "/home" ? 500 : 450;

  // Profile ikon boyutu koşullu
  const profileIconDesktop = pathname === "/home" ? 100 : 70;
  const profileIconMObile = pathname === "/home" ? 90 : 60;

  // RiMenuLine ikon boyutu koşullu
  const mobileMargin = pathname !== "/home" ? "mx-4" : "";

  // useEffect ile sayfa yolu değiştiğinde menüyü kapat
  useEffect(() => {
    if (isSideMenuOpen) {
      setIsSideMenuOpen(false);
    }
  }, [pathname]);

  return (
    <main className="space-x-4 sticky top-0 bg-white/20 backdrop-blur-lg w-full xl:w-3/4 z-[9999]">
      <nav
        className={clsx(
          "flex justify-between md:px-12 items-center pt-4 gap-4",
          pathname === "/home" && "flex-col md:flex-row px-4",
          mobileMargin
        )}
      >
        <div className="flex items-center gap-8 w-full justify-between md:w-auto">
          {/* Logo ve Menü Butonu */}
          <section className="flex items-center gap-2 w-full md:w-auto">
            <RiMenuLine
              className={`text-4xl ms-2 cursor-pointer md:hidden`}
              onClick={() => setIsSideMenuOpen(true)}
            />
            <Link href="/" className="text-4xl font-mono">
              <CldImage
                src="https://res.cloudinary.com/duixszfkd/image/upload/v1725431523/logo.png"
                alt="navbar_logo"
                priority={true}
                height={LogoSize}
                width={LogoSize}
                className="hidden sm:block"
              />
              {/* Mobilde küçük logo */}
              <CldImage
                src="https://res.cloudinary.com/duixszfkd/image/upload/v1725431523/logo.png"
                alt="navbar_logo"
                priority={true}
                height={LogoSize / 1.75}
                width={LogoSize / 1.75}
                className="sm:hidden"
              />
            </Link>
          </section>

          {/* Mobilde Arama Butonu ve Profil Butonu */}
          <section className="flex items-center gap-4 md:hidden">
            {pathname === "/home" && <SearchInput />}
            <button
              type="button"
              className="flex bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
              id="user-menu-button"
              onClick={() => {
                setOpenProfile((prev) => !prev);
              }}
            >
              <CldImage
                src="https://res.cloudinary.com/duixszfkd/image/upload/v1725431524/profile_icon.png"
                alt="profil_logo"
                priority={true}
                height={profileIconMObile}
                width={profileIconMObile}
                className="cursor-pointer rounded-full"
              />
            </button>
          </section>
        </div>

        {/* Masaüstü Menü (Sol tarafa hizalanmış) */}
        <div className="hidden md:flex items-center ms-4 gap-6 w-full justify-start">
          {menus.map(({ id, linkpage, title }) => (
            <Link
              key={id}
              href={linkpage}
              className="text-color1 hover:text-color5 lg:text-lg xl:text-xl font-semibold opacity-75 min-w-[90px] lg:min-w-[100px] first-letter:hover:opacity-100"
            >
              <p>{title}</p>
            </Link>
          ))}
        </div>

        {/* Mobil Menü */}
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

        {/* Profil Butonu ve Arama Butonu - Masaüstü */}
        <section className="hidden md:flex items-center gap-4">
          {pathname === "/home" && <SearchInput />}
          <button
            type="button"
            className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
            id="user-menu-button"
            onClick={() => {
              setOpenProfile((prev) => !prev);
            }}
          >
            <CldImage
              src="https://res.cloudinary.com/duixszfkd/image/upload/v1725431524/profile_icon.png"
              alt="profil_logo"
              priority={true}
              height={profileIconDesktop}
              width={profileIconDesktop}
              className="cursor-pointer rounded-full"
            />
          </button>
        </section>
      </nav>

      {/* Profil açılır menüsü */}
      {openProfile && (
        <div
          ref={ref}
          className="absolute mt-18 right-4 text-base list-none text-color1 bg-white divide-y divide-gray-100 rounded-lg shadow"
        >
          <Link
            href="https://www.linkedin.com/in/mehmetaltann/"
            className="flex px-4 py-3 justify-center items-center gap-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={30} className="cursor-pointer" />
            <div>
              <span className="block text-sm font-semibold text-gray-900">
                Mehmet ALTAN
              </span>
              <span className="block text-sm text-gray-500 truncate">
                mehmetaltann@gmail.com
              </span>
            </div>
          </Link>

          {session ? (
            <div className="flex flex-col justify-center items-start">
              <Link
                href={"/admin"}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Yönetici Paneli
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/", redirect: true })}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Çıkış Yap
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn()}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
            >
              Giriş Yap
            </button>
          )}
        </div>
      )}
    </main>
  );
};

export default Navbar;
