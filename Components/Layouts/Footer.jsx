"use client";
import SocialMediaShareSet from "./SocialMediaShareSet";
import { CldImage } from "next-cloudinary";

const Footer = () => {
  return (
    <div className="flex w-full justify-around mx-auto flex-col gap-2 sm:gap-0 sm:flex-row bg-color1 py-5 items-center">
      <CldImage
        src="https://res.cloudinary.com/duixszfkd/image/upload/v1725431523/logo_light.png"
        alt="footer_logo"
        priority={true}
        height={50}
        width={100}
        style={{ width: "auto", height: "auto" }}
      />
      <div className="flex flex-col items-center text-sm text-white">
        <p>Bütün Hakları Saklıdır @2024</p>
        <span>mehmetaltann@gmail.com</span>
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
