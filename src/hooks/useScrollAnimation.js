import { useInView } from "framer-motion";
import { useRef } from "react";

export const useScrollAnimation = (options = { once: true, amount: 0.2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, options);

  return {
    ref,
    variants: {
      hidden: { opacity: 0, y: 50 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.6,
          ease: "easeOut"
        }
      }
    },
    initial: "hidden",
    animate: isInView ? "visible" : "hidden"
  };
};
