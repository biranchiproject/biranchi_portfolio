import { useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { Bot, Code2, PackageCheck, ShieldCheck, LucideIcon } from "lucide-react";

type Service = {
  icon: LucideIcon;
  title: string;
  text: string;
  tags: string[];
  tone: "ink" | "amber" | "clay" | "white";
};

const SERVICES: Service[] = [
  {
    icon: ShieldCheck,
    title: "Cybersecurity",
    text: "Web application security, network analysis and ethical hacking — finding the weak spots before anyone else does.",
    tags: ["Pen testing", "OWASP", "Network analysis"],
    tone: "ink",
  },
  {
    icon: Bot,
    title: "AI Agents",
    text: "Intelligent agents and automation tools that take repetitive work off your plate and run on their own.",
    tags: ["LLM agents", "Automation", "Python"],
    tone: "amber",
  },
  {
    icon: Code2,
    title: "Full-Stack Development",
    text: "Fast, modern web apps from database to interface — built security-first and ready to scale.",
    tags: ["React", "TypeScript", "Supabase"],
    tone: "clay",
  },
  {
    icon: PackageCheck,
    title: "Error-free Delivery",
    text: "Every build is tested until it runs clean, then handed over with source, hosting and a full walkthrough.",
    tags: ["Testing", "Handover", "Support"],
    tone: "white",
  },
];

const TONES: Record<Service["tone"], string> = {
  ink: "bg-[#0a0a0a] text-[#f5f8ef]",
  amber: "bg-gradient-to-br from-[#f5900d] to-[#f7c948] text-[#0a0a0a]",
  clay: "bg-[#ece9d4] text-[#0a0a0a]",
  white: "bg-white text-[#0a0a0a]",
};

const Card = ({
  service,
  index,
  total,
  progress,
}: {
  service: Service;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) => {
  // Each card shrinks a little as the cards after it slide over it.
  const scale = useTransform(progress, [index / total, 1], [1, 1 - (total - index) * 0.045]);
  const Icon = service.icon;
  const dark = service.tone === "ink";

  return (
    <div className="sticky h-[78svh] md:h-[72vh] flex items-start" style={{ top: `calc(11svh + ${index * 18}px)` }}>
      <motion.article
        style={{ scale }}
        className={`relative w-full h-[62svh] min-h-[400px] md:h-[60vh] origin-top rounded-[28px] md:rounded-[40px] p-6 sm:p-8 md:p-12 overflow-hidden flex flex-col shadow-[0_-10px_40px_-12px_rgba(0,0,0,0.25)] ${TONES[service.tone]}`}
      >
        <span
          aria-hidden
          className={`absolute -right-4 -bottom-10 md:-bottom-16 tx-display font-black leading-none text-[38vw] md:text-[18rem] ${
            dark ? "text-white/[0.06]" : "text-black/[0.06]"
          }`}
        >
          0{index + 1}
        </span>

        <div className="flex items-center justify-between">
          <span
            className={`flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-2xl ${
              dark ? "bg-white/10 text-[#f5900d]" : "bg-black/[0.07] text-[#0a0a0a]"
            }`}
          >
            <Icon className="h-6 w-6" />
          </span>
          <span className={`text-sm font-bold tracking-[0.2em] ${dark ? "text-white/50" : "text-black/50"}`}>
            0{index + 1} / 0{total}
          </span>
        </div>

        <h3 className="mt-auto text-[clamp(2rem,6vw,4.5rem)] font-black leading-[0.95] tracking-[-0.045em]">
          {service.title}
        </h3>
        <p className={`mt-4 max-w-xl text-base md:text-lg leading-relaxed ${dark ? "text-white/70" : "text-black/65"}`}>
          {service.text}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold ${
                dark ? "bg-white/10 text-white/85" : "bg-black/[0.07] text-black/75"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.article>
    </div>
  );
};

/** "What I do" — full-width cards that pin and stack on top of each other while scrolling. */
const StackCards = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: rawProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // Function transform: keeps framer from swapping in a page-wide native ScrollTimeline.
  const scrollYProgress = useTransform(rawProgress, (v) => v);

  return (
    <section data-tx-noreveal aria-labelledby="tx-what-i-do" className="relative pt-16 md:pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center">
          <span className="tx-chip">What I do</span>
          <h2 id="tx-what-i-do" className="mt-6 text-[clamp(2.5rem,7vw,5rem)] leading-[1.02] pb-2">
            Four things, done properly.
          </h2>
        </div>

        <div ref={ref} className="relative mt-10 md:mt-16 pb-[8svh]">
          {SERVICES.map((service, i) => (
            <Card key={service.title} service={service} index={i} total={SERVICES.length} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StackCards;
