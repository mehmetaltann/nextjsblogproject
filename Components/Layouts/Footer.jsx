import { assets } from "@/Assets/assets";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="flex justify-around flex-col gap-2 sm:gap-0 sm:flex-row bg-black py-5 items-center">
      <Image src={assets.logo_light} alt="footer logo" width={120} />
      <div className="flex flex-col items-center">
        <p className="text-sm text-white">
          Bütün Hakları Saklıdır Copyright mehmetaltann@gmail.com
        </p>{" "}
        <Link href="/login" className="text-red-400">Giriş</Link>
      </div>

      <div className="flex">
        <Image src={assets.facebook_icon} alt="facebook logo" width={40} />
        <Image src={assets.twitter_icon} alt="twitter logo" width={40} />
        <Image src={assets.googleplus_icon} alt="google logo" width={40} />
      </div>
    </div>
  );
};

export default Footer;
