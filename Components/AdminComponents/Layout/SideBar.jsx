"use client";
import { assets } from "@/Assets/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const sidebarMenus = [
  { id: 1, linkpage: "write", src: "add_item", title: "Blog Ekle" },
  { id: 2, linkpage: "blogList", src: "list", title: "Blog Listesi" },
  { id: 3, linkpage: "subscription", src: "followers", title: "Takipçiler" },
  { id: 4, linkpage: "category", src: "category", title: "Kategoriler" },
];

const SideBar = () => {
  return (
    <div className="flex flex-col bg-primary">
      <Link href="/" className="px-2 sm:pl-14 py-3 border border-white">
        <Image src={assets.logo} width={120} alt="sidebar_logo" />
      </Link>
      <div className="w-28 sm:w-80 h-[100vh] relative py-12 border border-white">
        <div className="w-[50%] sm:w-[80%] absolute right-3">
          {sidebarMenus.map(({ id, linkpage, src, title }) => (
            <Link
              key={id}
              href={`/admin/${linkpage}`}
              className="mt-5 flex items-center border border-white gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#5B6057]"
            >
              <Image
                className="text-[#555]"
                src={assets[src]}
                width={28}
                alt="sidebar_add_item"
              />
              <p className="flex text-[#555]">{title}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
