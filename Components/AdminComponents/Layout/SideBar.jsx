"use client";
import { assets } from "@/Assets/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SideBar = () => {
  return (
    <div className="flex flex-col bg-slate-100">
      <Link href="/" className="px-2 sm:pl-14 py-3 border border-black">
        <Image src={assets.logo} width={120} alt="sidebar_logo" />
      </Link>
      <div className="w-28 sm:w-80 h-[100vh] relative py-12 border border-black">
        <div className="w-[50%] sm:w-[80%] absolute right-0">
          <Link
            href="/admin/addProduct"
            className="flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]"
          >
            <Image src={assets.add_item} width={28} alt="sidebar_add_item" />
            <p className="flex">Blog Ekle</p>
          </Link>
          <Link
            href="/admin/blogList"
            className="mt-5 flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]"
          >
            <Image src={assets.list} width={28} alt="sidebar_add_item" />
            <p className="flex">Blog Listesi</p>
          </Link>
          <Link
            href="/admin/subscription"
            className="mt-5 flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]"
          >
            <Image src={assets.followers} width={28} alt="sidebar_add_item" />
            <p className="flex">Takipçiler</p>
          </Link>
          <Link
            href="/admin/category"
            className="mt-5 flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]"
          >
            <Image src={assets.category} width={28} alt="sidebar_add_item" />
            <p className="flex">Kategoriler</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
