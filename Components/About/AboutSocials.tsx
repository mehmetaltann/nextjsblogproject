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

interface AboutSocialsProps {
  containerStyles: string;
  iconStyles: string;
}

const AboutSocials = ({ containerStyles, iconStyles }: AboutSocialsProps) => {
  return (
    <div className={containerStyles}>
      {socials.map((item, index) => (
        <a
          key={index}
          href={item.path}
          target="_blank"
          rel="noopener noreferrer"
          className={iconStyles}
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
};

export default AboutSocials;
