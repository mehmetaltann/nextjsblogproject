import {
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  FaWhatsapp,
  FaLinkedin,
  FaFacebook,
  FaXTwitter,
  FaTelegram,
} from "react-icons/fa6";
import IconButton from "../ui/IconButton";

interface SocialMediaShareSetProps {
  shareURL: string;
  title: string;
  size?: number;
}

const SocialMediaShareSet: React.FC<SocialMediaShareSetProps> = ({
  shareURL,
  title,
  size = 20,
}) => {
  console.log(shareURL)
  return (
    <div className="flex  gap-2">
      <WhatsappShareButton
        url={shareURL}
        title={title}
        separator=": "
        className="cursor-pointer"
      >
        <IconButton text="Whatsapp" color="bg-[#25D366]">
          <FaWhatsapp size={size} />
        </IconButton>
      </WhatsappShareButton>
      <TwitterShareButton
        url={shareURL}
        title={title}
        className="cursor-pointer"
      >
        <IconButton text="Twitter" color="bg-black">
          <FaXTwitter size={size} />
        </IconButton>
      </TwitterShareButton>

      <FacebookShareButton url={shareURL} className="cursor-pointer">
        <IconButton text="Facebook" color="bg-[#4267B2]">
          <FaFacebook size={size} />
        </IconButton>
      </FacebookShareButton>

      <LinkedinShareButton url={shareURL} className="cursor-pointer">
        <IconButton text="LinkedIn" color="bg-[#0a66c2]">
          <FaLinkedin size={size} />
        </IconButton>
      </LinkedinShareButton>
      <TelegramShareButton
        url={shareURL}
        title={title}
        className="cursor-pointer"
      >
        <IconButton text="Telegram" color="bg-[#2AABEE]">
          <FaTelegram size={size} />
        </IconButton>
      </TelegramShareButton>
    </div>
  );
};

export default SocialMediaShareSet;
