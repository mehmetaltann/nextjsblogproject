import Link from "next/link";
import {
  FaGithub,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";

const socials = [
  { icon: <FaLinkedinIn />, path: "https://www.linkedin.com/in/mehmetaltann" },
  { icon: <FaInstagram />, path: "https://www.instagram.com/_m.altan_" },
  { icon: <FaGithub />, path: "https://github.com/mehmetaltann" },
  { icon: <FaTwitter />, path: "https://x.com/maltan_" },
  { icon: <FaYoutube />, path: "https://www.youtube.com/@mehmet_altan" },
];

const AboutSocials = ({
  containerStyles,
  iconStyles,
}: {
  containerStyles: string;
  iconStyles: string;
}) => {
  return (
    <div className={containerStyles}>
      {socials.map((item, index) => {
        return (
          <Link key={index} href={item.path} className={iconStyles}>
            {item.icon}
          </Link>
        );
      })}
    </div>
  );
};

export default AboutSocials;
