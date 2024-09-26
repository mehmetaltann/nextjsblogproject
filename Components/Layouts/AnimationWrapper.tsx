import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimationWrapperProps {
  children: ReactNode;
  keyValue: string;
  className?: string;
  initial?: object;
  animate?: object;
  transition?: object;
}

const AnimationWrapper: React.FC<AnimationWrapperProps> = ({
  children,
  keyValue,
  className,
  initial = { y: 20, opacity: 0 },
  animate = { y: 0, opacity: 1 },
  transition = { ease: "easeInOut", duration: 0.75 },
}) => {
  return (
    <AnimatePresence>
      <motion.div
        key={keyValue}
        initial={initial}
        animate={animate}
        transition={transition}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimationWrapper;
