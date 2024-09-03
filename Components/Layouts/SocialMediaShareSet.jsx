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
import IconButton from "./IconButton";

const SocialMediaShareSet = ({ shareURL, title, size = 32 }) => {
  return (
    <div className="flex gap-2">
      <WhatsappShareButton
        url={shareURL}
        title={title}
        separator=":: "
        className="cursor-pointer"
      >
        <IconButton text="Whatsapp" color="bg-[#25D366]">
          <FaWhatsapp size={20} />
        </IconButton>
      </WhatsappShareButton>
      <TwitterShareButton
        url={shareURL}
        title={title}
        className="Demo__some-network__share-button"
      >
        <IconButton text="Twitter" color="bg-black">
          <FaXTwitter size={20} />
        </IconButton>
      </TwitterShareButton>

      <FacebookShareButton url={shareURL} className="cursor-pointer">
        <IconButton text="Facebook" color="bg-[#4267B2]">
          <FaFacebook size={20} />
        </IconButton>
      </FacebookShareButton>

      <LinkedinShareButton url={shareURL} className="cursor-pointer">
        <IconButton text="LinkedIn" color="bg-[#0a66c2]">
          <FaLinkedin size={20} />
        </IconButton>
      </LinkedinShareButton>
      <TelegramShareButton
        url={shareURL}
        title={title}
        className="cursor-pointer"
      >
        <IconButton text="Telegram" color="bg-[#2AABEE]">
          <FaTelegram size={20} />
        </IconButton>
      </TelegramShareButton>
    </div>
  );
};

export default SocialMediaShareSet;
