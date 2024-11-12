import { motion } from "framer-motion";
import { CldImage } from "next-cloudinary";

const AboutPhoto = () => {
  return (
    <div className="w-full h-full relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 1, duration: 0.4, ease: "easeIn" },
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 1.4, duration: 0.4, ease: "easeInOut" },
          }}
          className="w-[298px] h-[298px] xl:w-[498px] xl:h-[498px] mix-blend-lighten"
        >
          <CldImage
            src="https://res.cloudinary.com/duixszfkd/image/upload/v1731390776/Contact/aboutPage_escvy5.jpg"
            alt="aboutpageimage"
            priority
            quality={100}
            fill
            className="object-contain"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutPhoto;
