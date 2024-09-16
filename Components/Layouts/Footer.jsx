import SocialMediaShareSet from "./SocialMediaShareSet";
import { CldImage } from "next-cloudinary";

const Footer = () => {
  return (
    <div className="w-full bg-color1 flex flex-col justify-around items-center md:flex-row gap-3 py-3 px-auto ">
      <CldImage
        src="https://res.cloudinary.com/duixszfkd/image/upload/v1725431523/logoLight.png"
        alt="footer_logo"
        priority={true}
        height={100}
        width={150}
        sizes="150vw"
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
