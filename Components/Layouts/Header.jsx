"use client";
import Image from "next/image";
import Link from "next/link";
import { assets } from "@/Assets/assets";

const Header = () => {
  return (
    <div className="w-full py-5 px-5 md:px-12 lg:px-28">
      <div className="flex justify-between items-center">
        <Link href="/">
          <Image
            src={assets.logo}
            width={180}
            alt="logo"
            className="w-[130px] sm:w-auto"
          />
        </Link>
        <div className="flex justify-center items-center gap-3 pr-9">
          <Link
            href="/about"
            className="font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-grey"
          >
            Hakkımda
          </Link>
          <Link
            href="/contact"
            className="font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-grey"
          >
            İletişim
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
