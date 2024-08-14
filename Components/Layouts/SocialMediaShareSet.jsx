import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappIcon,
  XIcon,
  WhatsappShareButton,
} from "react-share";

const SocialMediaShareSet = ({ shareURL, title, size = 32 }) => {
  return (
    <div className="flex gap-2">
      <WhatsappShareButton
        url={shareURL}
        title={title}
        separator=":: "
        className="cursor-pointer"
      >
        <WhatsappIcon size={size} round />
      </WhatsappShareButton>
      <TwitterShareButton
        url={shareURL}
        title={title}
        className="Demo__some-network__share-button"
      >
        <XIcon size={size} round />
      </TwitterShareButton>

      <FacebookShareButton url={shareURL} className="cursor-pointer">
        <FacebookIcon size={size} round />
      </FacebookShareButton>

      <LinkedinShareButton url={shareURL} className="cursor-pointer">
        <LinkedinIcon size={size} round />
      </LinkedinShareButton>
      <TelegramShareButton
        url={shareURL}
        title={title}
        className="cursor-pointer"
      >
        <TelegramIcon size={size} round />
      </TelegramShareButton>
    </div>
  );
};

export default SocialMediaShareSet;
