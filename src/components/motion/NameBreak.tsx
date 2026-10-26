import { CSSProperties, useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";

const NAME = "BIRANCHI";

// Where each letter flies when the name breaks apart: [x vw, y vh, rotate deg].
const SCATTER: [number, number, number][] = [
  [-62, -38, -48],
  [-40, 44, 32],
  [-22, -52, 70],
  [-6, 58, -24],
  [10, -46, -64],
  [26, 50, 40],
  [44, -34, 56],
  [64, 40, -36],
];

const Letter = ({ char, index, progress }: { char: string; index: number; progress: MotionValue<number> }) => {
  const inStart = 0.02 + index * 0.028;
  const inEnd = inStart + 0.1;
  const [dx, dy, rot] = SCATTER[index % SCATTER.length];

  // "Write" in letter by letter, hold, then break apart.
  const opacity = useTransform(progress, [inStart, inEnd, 0.74, 0.92], [0, 1, 1, 0]);
  const y = useTransform(progress, [inStart, inEnd, 0.52, 0.9], ["14vh", "0vh", "0vh", `${dy}vh`]);
  const x = useTransform(progress, [0.52, 0.9], ["0vw", `${dx}vw`]);
  const rotate = useTransform(progress, [inStart, inEnd, 0.52, 0.9], [index % 2 ? 18 : -18, 0, 0, rot]);
  const scale = useTransform(progress, [inStart, inEnd, 0.52, 0.9], [1.35, 1, 1, 0.7]);
  const filter = useTransform(progress, [inStart, inEnd, 0.7, 0.9], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(6px)"]);

  return (
    <motion.span className="tx-namebreak-letter" style={{ opacity, x, y, rotate, scale, filter }}>
      {char}
    </motion.span>
  );
};

/**
 * Giant "BIRANCHI" pinned to the screen: scrolling writes it in letter by letter,
 * holds it with an amber fill sweep, then breaks the letters apart to reveal the tagline.
 */
const NameBreak = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: rawProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // A function transform keeps framer from handing opacity to a native ScrollTimeline,
  // which tracks the whole page instead of this section.
  const scrollYProgress = useTransform(rawProgress, (v) => v);

  const fill = useTransform(scrollYProgress, [0.3, 0.5], ["0%", "100%"]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const taglineOpacity = useTransform(scrollYProgress, [0.62, 0.82], [0, 1]);
  const taglineScale = useTransform(scrollYProgress, [0.62, 0.9], [0.82, 1]);
  const ringScale = useTransform(scrollYProgress, [0.5, 1], [0.2, 1.6]);
  const ringOpacity = useTransform(scrollYProgress, [0.5, 0.7, 1], [0, 0.9, 0]);

  return (
    <section ref={ref} data-tx-noreveal aria-label="Biranchi" className="relative h-[260vh] md:h-[300vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden flex items-center justify-center">
        <motion.span
          aria-hidden
          className="absolute w-[80vmin] h-[80vmin] rounded-full border-2 border-[#f5900d]/50"
          style={{ scale: ringScale, opacity: ringOpacity }}
        />

        <motion.h2
          className="tx-namebreak"
          aria-label={NAME}
          style={{ "--tx-fill": fill } as unknown as CSSProperties}
        >
          {NAME.split("").map((char, i) => (
            <Letter key={i} char={char} index={i} progress={scrollYProgress} />
          ))}
        </motion.h2>

        <motion.div
          className="absolute inset-x-0 px-6 text-center pointer-events-none"
          style={{ opacity: taglineOpacity, scale: taglineScale }}
        >
          <span className="tx-chip bg-[#f5f8ef]">Biranchi · Developer</span>
          <p className="tx-display mt-6 text-[clamp(2rem,7vw,5.5rem)] font-black leading-[1] tracking-[-0.05em] text-[#0a0a0a]">
            Secure. Intelligent.
            <br />
            <span className="text-[#f5900d]">Error-free.</span>
          </p>
        </motion.div>

        <motion.p
          className="absolute bottom-8 left-0 right-0 text-center text-xs font-semibold uppercase tracking-[0.25em] text-[#71717a]"
          style={{ opacity: hintOpacity }}
        >
          Keep scrolling
        </motion.p>
      </div>
    </section>
  );
};

export default NameBreak;
