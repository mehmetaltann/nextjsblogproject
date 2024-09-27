import SocialMediaShareSet from "./SocialMediaShareSet";
import Link from "next/link";
import { CldImage } from "next-cloudinary";

const site_url = process.env.NEXT_PUBLIC_BASE_URL as string;
console.log(site_url);

const Footer = () => {
  console.log(site_url);

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
      <Link
        href="/home/contact"
        className="flex flex-col items-center text-sm text-white opacity-80 cursor-pointer"
      >
        <p>Bütün Hakları Saklıdır @2024</p>
        <span>mehmetaltann@gmail.com</span>
      </Link>
      <div className="flex">
        <SocialMediaShareSet shareURL={site_url} title="Altans Blog" />
      </div>
    </div>
  );
};

export default Footer;
