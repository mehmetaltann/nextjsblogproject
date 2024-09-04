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
        height={100}
        width={200}
      />
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
