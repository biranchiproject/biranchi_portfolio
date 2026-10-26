import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

const Star = () => (
  <svg viewBox="0 0 24 24" className="w-[0.6em] h-[0.6em] flex-shrink-0 fill-current" aria-hidden>
    <path d="M12 0c.8 6.4 5.6 11.2 12 12-6.4.8-11.2 5.6-12 12-.8-6.4-5.6-11.2-12-12C6.4 11.2 11.2 6.4 12 0z" />
  </svg>
);

/** One endless row; scrolling speeds it up, and scrolling up reverses it. */
const Row = ({ words, baseVelocity, className }: { words: string[]; baseVelocity: number; className: string }) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(velocity, [0, 1000], [0, 5], { clamp: false });
  const skewX = useTransform(velocity, [-2500, 2500], [10, -10]);
  const x = useTransform(baseX, (v) => `${wrap(-50, -25, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    let move = direction.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    move += direction.current * move * f;
    baseX.set(baseX.get() + move);
  });

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div className="flex w-max" style={{ x, skewX }}>
        {[0, 1, 2, 3].map((copy) => (
          <span key={copy} className="flex items-center gap-6 md:gap-10 pr-6 md:pr-10" aria-hidden={copy > 0}>
            {words.map((word) => (
              <span key={word} className="flex items-center gap-6 md:gap-10">
                {word}
                <Star />
              </span>
            ))}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

/** Two crossing bands whose speed and direction follow the scroll. */
const VelocityMarquee = () => (
  <section data-tx-noreveal aria-label="Skills" className="relative py-16 md:py-24 overflow-x-clip">
    <Row
      words={["Cybersecurity", "AI Agents", "Full-Stack", "Ethical Hacking", "Automation"]}
      baseVelocity={-2.5}
      className="tx-marquee-ink -rotate-2 py-4 md:py-5"
    />
    <Row
      words={["React", "Python", "Supabase", "Pen Testing", "Error-free Delivery"]}
      baseVelocity={2.5}
      className="tx-marquee-clay rotate-1 py-4 md:py-5 -mt-2"
    />
  </section>
);

export default VelocityMarquee;
