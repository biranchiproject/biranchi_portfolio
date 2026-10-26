import { motion, useScroll, useSpring } from "framer-motion";
import { useSiteDesign } from "@/lib/siteDesign";

/** Thin amber bar along the top edge that fills as the page is scrolled. */
const ScrollProgress = () => {
  const { motionOn } = useSiteDesign();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  if (!motionOn) return null;

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-[#f5900d] via-[#f7c948] to-[#f5900d]"
      style={{ scaleX }}
    />
  );
};

export default ScrollProgress;
