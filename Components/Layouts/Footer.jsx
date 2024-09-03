"use client";
import { assets } from "@/Assets/assets";
import Image from "next/image";
import SocialMediaShareSet from "./SocialMediaShareSet";

const Footer = () => {
  return (
    <div className="flex w-full justify-around flex-col gap-2 sm:gap-0 sm:flex-row bg-color1 py-5 items-center">
      <Image src={assets.logo_light} alt="footer logo" width={200} />
      <div className="flex flex-col items-center">
        <p className="text-sm text-white">
          Bütün Hakları Saklıdır Copyright mehmetaltann@gmail.com
        </p>
      </div>
      <div className="flex">
        <SocialMediaShareSet
          shareURL="http://localhost:3000/"
          title="Altans Blog"
        />
      </div>
    </div>
  );
};

export default Footer;
