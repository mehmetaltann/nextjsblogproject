"use client";
import { assets } from "@/Assets/assets";
import { useState } from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const AdminHeader = () => {
  const [openProfile, setOpenProfile] = useState(false);

  return (
    <div className="flex items-center justify-between w-full py-3 max-h-[60px] px-12 border-b border-black">
      <h3 className="font-medium"> Yönetici Paneli </h3>
      <div
        className="flex justify-around items-center gap-2"
        onClick={() => {
          setOpenProfile((prev) => !prev);
        }}
      >
        <Image
          src={assets.profile_icon}
          width={40}
          alt="profile_icon_side"
          id="avatarButton"
          type="button"
          className="cursor-pointer"
        />
      </div>

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
                onClick={() => signOut({ callbackUrl: 'http://localhost:3000' })}
                className="text-sm text-gray-400 font-semibold tracking-tight"
              >
                Çıkış Yap
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminHeader;
