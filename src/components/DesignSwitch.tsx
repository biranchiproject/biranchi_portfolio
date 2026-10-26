import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useSiteDesign } from "@/lib/siteDesign";

/**
 * Navbar on/off switch between the two designs (like the theme button on texotic.in).
 * ON = new Texotic design, OFF = classic dark design. Remembered per visitor.
 */
const DesignSwitch = ({ className = "" }: { className?: string }) => {
  const { isTexotic, toggleDesign } = useSiteDesign();

  return (
    <button
      role="switch"
      aria-checked={isTexotic}
      aria-label={isTexotic ? "Switch to classic design" : "Switch to new design"}
      title={isTexotic ? "New design: ON — switch to classic" : "New design: OFF — switch it on"}
      onClick={toggleDesign}
      className={`relative flex h-8 w-[60px] flex-shrink-0 items-center rounded-full p-[3px] transition-all duration-500 ${
        isTexotic
          ? "bg-[#f5f8ef] shadow-[inset_3px_3px_7px_rgba(0,0,0,0.13),inset_-3px_-3px_7px_rgba(255,255,255,0.95)]"
          : "bg-dark-surface border border-neon-green/40 shadow-[0_0_14px_rgba(34,197,94,0.25)]"
      } ${className}`}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 520, damping: 30 }}
        className={`flex h-[26px] w-[26px] items-center justify-center rounded-full ${
          isTexotic
            ? "ml-auto bg-white text-[#f5900d] shadow-[0_1px_1px_rgba(0,0,0,0.08),0_4px_8px_rgba(0,0,0,0.12),inset_0_2px_1px_#fff]"
            : "bg-neon-green text-dark-bg shadow-[0_0_10px_rgba(34,197,94,0.7)]"
        }`}
      >
        {isTexotic ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
      </motion.span>
    </button>
  );
};

export default DesignSwitch;
