import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useSiteDesign } from "@/lib/siteDesign";

const FEATURES = [
  "Giant BIRANCHI name that writes in and breaks apart on scroll",
  "Stacking “What I do” cards",
  "Scroll-speed marquee bands",
  "Sections & cards reveal on scroll",
  "3D card tilt + top progress bar",
];

/** Admin switch for the Texotic motion layer — separate from the design switch above it. */
const AdminAnimationToggle = () => {
  const { animationsEnabled, setAnimationsEnabled, isTexotic } = useSiteDesign();
  const [isSaving, setIsSaving] = useState(false);

  const save = async (enabled: boolean) => {
    setIsSaving(true);
    try {
      await setAnimationsEnabled(enabled);
      toast.success(enabled ? "Animations are ON" : "Animations are OFF");
    } catch (error) {
      console.error("Save animations error:", error);
      const code = (error as { code?: string })?.code;
      toast.error(
        code === "PGRST205"
          ? "The site_settings table does not exist yet. Run section 4 of supabase_setup.sql in the Supabase SQL Editor."
          : `Could not save: ${(error as { message?: string })?.message ?? "unknown error"}`
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="rounded-2xl border border-dark-border bg-dark-surface p-5 sm:p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <div className="md:w-64 flex-shrink-0">
          <h2 className="!text-xl font-bold flex items-center gap-2 text-foreground">
            <Sparkles className="w-5 h-5 text-neon-green" />
            Animations
          </h2>
          <p className="text-xs text-gray-text mt-2 leading-relaxed">
            Scroll animations for the <strong className="text-foreground">Texotic</strong> design.
            {!isTexotic && " They only show when the Texotic design is live."}
          </p>
        </div>

        <ul className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          {FEATURES.map((feature) => (
            <li
              key={feature}
              className={`flex items-start gap-2 rounded-xl px-3 py-2 transition-opacity duration-500 ${
                animationsEnabled ? "bg-neon-green/10 text-foreground" : "bg-dark-bg/50 text-gray-text opacity-60"
              }`}
            >
              <span className={`mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full ${animationsEnabled ? "bg-neon-green" : "bg-gray-text"}`} />
              {feature}
            </li>
          ))}
        </ul>

        <button
          role="switch"
          aria-checked={animationsEnabled}
          aria-label="Animations"
          onClick={() => save(!animationsEnabled)}
          disabled={isSaving}
          className="relative mx-auto md:mx-0 flex-shrink-0 h-[52px] w-[104px] rounded-full p-[5px] transition-all duration-500 disabled:cursor-wait"
          style={{
            background: animationsEnabled ? "linear-gradient(135deg, #f5900d, #f7c948)" : "#27272a",
            boxShadow: animationsEnabled
              ? "inset 0 2px 6px rgba(0,0,0,.25), 0 0 24px rgba(245,144,13,.55)"
              : "inset 0 2px 6px rgba(0,0,0,.6)",
          }}
        >
          <span
            className={`absolute top-1/2 -translate-y-1/2 text-[10px] font-black tracking-[0.15em] transition-all duration-500 ${
              animationsEnabled ? "left-4 text-black/70" : "right-3.5 text-white/50"
            }`}
          >
            {animationsEnabled ? "ON" : "OFF"}
          </span>
          <motion.span
            layout
            transition={{ type: "spring", stiffness: 520, damping: 30 }}
            className={`relative z-10 flex h-[42px] w-[42px] items-center justify-center rounded-full bg-white shadow-[0_4px_12px_rgba(0,0,0,.35)] ${
              animationsEnabled ? "ml-auto" : ""
            }`}
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin text-[#f5900d]" />
            ) : (
              <Sparkles className={`w-4 h-4 ${animationsEnabled ? "text-[#f5900d]" : "text-zinc-400"}`} />
            )}
          </motion.span>
        </button>
      </div>
    </div>
  );
};

export default AdminAnimationToggle;
