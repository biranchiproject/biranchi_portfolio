import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Palette } from "lucide-react";
import { toast } from "sonner";
import { useSiteDesign } from "@/lib/siteDesign";

/** Mini mock of each design so the admin can see what the switch does. */
const DesignPreview = ({
  variant,
  active,
  disabled,
  onTurnOn,
}: {
  variant: "classic" | "texotic";
  active: boolean;
  disabled: boolean;
  onTurnOn: () => void;
}) => {
  const isClassic = variant === "classic";
  const accent = isClassic ? "#22c55e" : "#f5900d";

  return (
    <div
      className={`relative flex-1 rounded-2xl p-4 transition-all duration-500 ${
        active ? "ring-2 ring-offset-2 ring-offset-transparent " + (isClassic ? "ring-[#22c55e]" : "ring-[#f5900d]") : "opacity-60"
      }`}
      style={{ background: isClassic ? "#0a0a0a" : "#f5f8ef" }}
    >
      <div className="flex items-center justify-between">
        <span className={`text-sm font-bold ${isClassic ? "text-white" : "text-[#0a0a0a]"}`}>
          Biranchi<span style={{ color: isClassic ? "#22c55e" : "#f5900d" }}>.</span>
        </span>
        <span
          className="rounded-full px-2.5 py-0.5 text-[9px] font-bold"
          style={
            isClassic
              ? { background: "#22c55e", color: "#0a0a0a" }
              : { background: "#f5f8ef", color: "#0a0a0a", boxShadow: "0 2px 6px rgba(0,0,0,.15), inset 0 2px 1px #fff" }
          }
        >
          Contact
        </span>
      </div>
      <p
        className="mt-4 text-lg font-black leading-tight tracking-tight"
        style={{ color: isClassic ? "#22c55e" : "#0a0a0a", fontFamily: isClassic ? undefined : "Satoshi, Inter, sans-serif" }}
      >
        {isClassic ? "Dark · Neon" : "Cream · Clay"}
      </p>
      <div className="mt-3 flex gap-2">
        <span
          className="h-5 w-16 rounded-full"
          style={{ background: isClassic ? "#22c55e" : "#0a0a0a", boxShadow: isClassic ? "0 0 12px rgba(34,197,94,.6)" : "0 6px 10px -4px rgba(0,0,0,.5)" }}
        />
        <span
          className="h-5 w-14 rounded-full"
          style={
            isClassic
              ? { border: "1px solid #22c55e" }
              : { background: "#f5f8ef", boxShadow: "0 3px 8px rgba(0,0,0,.15), inset 0 2px 1px #fff" }
          }
        />
      </div>
      <p className={`mt-4 text-[10px] font-bold uppercase tracking-[0.18em] ${isClassic ? "text-white/50" : "text-[#71717a]"}`}>
        {isClassic ? "Classic design" : "Texotic design"}
      </p>
      <button
        onClick={onTurnOn}
        disabled={active || disabled}
        className="mt-3 w-full rounded-full py-1.5 text-xs font-bold transition-all duration-300 enabled:hover:scale-[1.02] disabled:cursor-default"
        style={
          active
            ? { background: "transparent", color: accent, border: `1px solid ${accent}` }
            : { background: accent, color: "#0a0a0a" }
        }
      >
        {active ? "● Live now" : "Turn on"}
      </button>
    </div>
  );
};

const AdminDesignToggle = () => {
  const { design, setClassicEnabled } = useSiteDesign();
  const [isSaving, setIsSaving] = useState(false);
  const classicOn = design === "classic";

  const saveDesign = async (classic: boolean) => {
    setIsSaving(true);
    try {
      await setClassicEnabled(classic);
      toast.success(classic ? "Classic design is live" : "Texotic design is live");
    } catch (error) {
      console.error("Save site design error:", error);
      const code = (error as { code?: string })?.code;
      toast.error(
        code === "PGRST205"
          ? "The site_settings table does not exist yet. Run section 4 of supabase_setup.sql in the Supabase SQL Editor."
          : `Could not save the design: ${(error as { message?: string })?.message ?? "unknown error"}`
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="rounded-2xl border border-dark-border bg-dark-surface p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <div className="md:w-64 flex-shrink-0">
          <h2 className="!text-xl font-bold flex items-center gap-2 text-foreground">
            <Palette className="w-5 h-5 text-neon-green" />
            Website Design
          </h2>
          <p className="text-xs text-gray-text mt-2 leading-relaxed">
            <strong className="text-foreground">ON</strong> shows the classic dark design.{" "}
            <strong className="text-foreground">OFF</strong> shows the new Texotic design. Visitors see the change
            on their next page load.
          </p>
        </div>

        <div className="flex flex-1 flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <DesignPreview variant="classic" active={classicOn} disabled={isSaving} onTurnOn={() => saveDesign(true)} />

          {/* The switch */}
          <button
            role="switch"
            aria-checked={classicOn}
            aria-label="Classic design"
            onClick={() => saveDesign(!classicOn)}
            disabled={isSaving}
            className="group relative mx-auto flex-shrink-0 h-[52px] w-[104px] rounded-full p-[5px] transition-all duration-500 disabled:cursor-wait"
            style={{
              background: classicOn
                ? "linear-gradient(135deg, #16a34a, #22c55e 55%, #4ade80)"
                : "linear-gradient(135deg, #f7e9b8, #f5f8ef 60%)",
              boxShadow: classicOn
                ? "inset 0 2px 6px rgba(0,0,0,.45), 0 0 24px rgba(34,197,94,.55), 0 0 0 1px rgba(34,197,94,.6)"
                : "inset 4px 4px 9px rgba(0,0,0,.13), inset -4px -4px 9px rgba(255,255,255,.95), 0 10px 24px -10px rgba(245,144,13,.7)",
            }}
          >
            <span
              className={`absolute top-1/2 -translate-y-1/2 text-[10px] font-black tracking-[0.15em] transition-all duration-500 ${
                classicOn ? "left-4 text-black/70" : "right-3.5 text-[#a16207]"
              }`}
            >
              {classicOn ? "ON" : "OFF"}
            </span>
            <motion.span
              layout
              transition={{ type: "spring", stiffness: 520, damping: 30 }}
              className={`relative z-10 flex h-[42px] w-[42px] items-center justify-center rounded-full ${classicOn ? "ml-auto" : ""}`}
              style={{
                background: classicOn ? "#0a0a0a" : "#ffffff",
                boxShadow: classicOn
                  ? "0 4px 12px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.2)"
                  : "0 1px 1px rgba(0,0,0,.08), 0 4px 8px rgba(0,0,0,.12), 0 12px 20px -6px rgba(0,0,0,.15), inset 0 3px 1px #fff",
              }}
            >
              {isSaving ? (
                <Loader2 className={`w-4 h-4 animate-spin ${classicOn ? "text-[#22c55e]" : "text-[#f5900d]"}`} />
              ) : (
                <span
                  className="h-2.5 w-2.5 rounded-full transition-colors duration-500"
                  style={{
                    background: classicOn ? "#22c55e" : "#f5900d",
                    boxShadow: classicOn ? "0 0 10px #22c55e" : "0 0 10px #f5900d",
                  }}
                />
              )}
            </motion.span>
          </button>

          <DesignPreview variant="texotic" active={!classicOn} disabled={isSaving} onTurnOn={() => saveDesign(false)} />
        </div>
      </div>
    </div>
  );
};

export default AdminDesignToggle;
