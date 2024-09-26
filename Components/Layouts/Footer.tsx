import SocialMediaShareSet from "./SocialMediaShareSet";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import { FC } from "react";

const BASE_URL = process.env.BASE_URL as string;

const Footer: FC = () => {
  return (
    <div className="w-full bg-color1 flex flex-col justify-around items-center md:flex-row gap-3 py-3 px-auto ">
      <Link href="/home">
        <CldImage
          src="https://res.cloudinary.com/duixszfkd/image/upload/v1725431523/logoLight.png"
          alt="footer_logo"
          priority={true}
          height={100}
          width={150}
          sizes="150vw"
        />
      </Link>
      <div className="flex flex-col items-center text-sm text-white opacity-80">
        <p>Bütün Hakları Saklıdır @2024</p>
        <span>mehmetaltann@gmail.com</span>
      </div>
      <div className="flex">
        <SocialMediaShareSet shareURL={BASE_URL} title="Altans Blog" />
      </div>
    </div>
  );
};

export default Footer;
