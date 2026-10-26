import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

/**
 * Which design the public site renders:
 *  - "classic": the original dark / neon-green design
 *  - "texotic": the light clay design (cream, ink, amber)
 *
 * The admin dashboard flips it and it is stored in the `site_settings` table, so every
 * visitor sees the same design. The last known value is cached in localStorage so the
 * page paints in the right design before Supabase answers.
 */
export type SiteDesign = "classic" | "texotic";

const STORAGE_KEY = "site-design";
const SETTING_KEY = "classic_design";
const THEME_CLASS = "theme-texotic";

const PREVIEW_KEY = "site-design-preview";

// Texotic motion layer (big scroll name, stacking cards, marquee, reveals) — its own admin switch.
const MOTION_STORAGE_KEY = "site-motion";
const MOTION_SETTING_KEY = "texotic_animations";
const MOTION_PREVIEW_KEY = "site-motion-preview";
const MOTION_CLASS = "tx-anim";
const VISITOR_KEY = "site-design-visitor";

const isDesign = (value: string | null): value is SiteDesign => value === "texotic" || value === "classic";

/**
 * Preview link: ?design=texotic or ?design=classic shows that design in this tab only,
 * whatever the admin switch says. ?design=off clears the preview.
 */
const readPreviewDesign = (): SiteDesign | null => {
  try {
    const param = new URLSearchParams(window.location.search).get("design");
    if (param === "texotic" || param === "classic") sessionStorage.setItem(PREVIEW_KEY, param);
    else if (param === "off") sessionStorage.removeItem(PREVIEW_KEY);
    const preview = sessionStorage.getItem(PREVIEW_KEY);
    return isDesign(preview) ? preview : null;
  } catch {
    return null;
  }
};

/** The visitor's own pick from the navbar switch, else a preview link. Beats the admin default. */
const readOverrideDesign = (): SiteDesign | null => {
  const preview = readPreviewDesign();
  if (preview) return preview;
  try {
    const visitor = localStorage.getItem(VISITOR_KEY);
    return isDesign(visitor) ? visitor : null;
  } catch {
    return null;
  }
};

export const readCachedDesign = (): SiteDesign => {
  const override = readOverrideDesign();
  if (override) return override;
  try {
    return localStorage.getItem(STORAGE_KEY) === "texotic" ? "texotic" : "classic";
  } catch {
    return "classic";
  }
};

/** ?animations=on|off previews the motion layer in this tab only. */
const readMotionPreview = (): boolean | null => {
  try {
    const param = new URLSearchParams(window.location.search).get("animations");
    if (param === "on" || param === "off") sessionStorage.setItem(MOTION_PREVIEW_KEY, param);
    const preview = sessionStorage.getItem(MOTION_PREVIEW_KEY);
    return preview === "on" ? true : preview === "off" ? false : null;
  } catch {
    return null;
  }
};

/** Defaults to on: the motion layer is part of the new design unless the admin turns it off. */
export const readCachedMotion = (): boolean => {
  const preview = readMotionPreview();
  if (preview !== null) return preview;
  try {
    return localStorage.getItem(MOTION_STORAGE_KEY) !== "off";
  } catch {
    return true;
  }
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export const applyMotion = (design: SiteDesign, enabled: boolean) => {
  document.documentElement.classList.toggle(MOTION_CLASS, design === "texotic" && enabled && !prefersReducedMotion());
  if (readMotionPreview() !== null) return;
  try {
    localStorage.setItem(MOTION_STORAGE_KEY, enabled ? "on" : "off");
  } catch {
    // Storage blocked — the class is still applied for this visit.
  }
};

export const applyDesign = (design: SiteDesign) => {
  document.documentElement.classList.toggle(THEME_CLASS, design === "texotic");
  // A preview or visitor pick must not overwrite the cached admin setting.
  if (readOverrideDesign()) return;
  try {
    localStorage.setItem(STORAGE_KEY, design);
  } catch {
    // Storage blocked (private mode) — the class is still applied for this visit.
  }
};

type SiteDesignContextValue = {
  design: SiteDesign;
  isTexotic: boolean;
  /** Admin only: true shows the classic design, false shows the Texotic design. */
  setClassicEnabled: (enabled: boolean) => Promise<void>;
  /** Navbar switch: flips the design for this visitor only. */
  toggleDesign: () => void;
  /** Admin setting: the Texotic motion layer is switched on. */
  animationsEnabled: boolean;
  /** True when the motion layer should actually render (Texotic + switched on + motion allowed). */
  motionOn: boolean;
  /** Admin only: turns the Texotic motion layer on or off for every visitor. */
  setAnimationsEnabled: (enabled: boolean) => Promise<void>;
};

const SiteDesignContext = createContext<SiteDesignContextValue | null>(null);

export const SiteDesignProvider = ({ children }: { children: ReactNode }) => {
  const [design, setDesign] = useState<SiteDesign>(readCachedDesign);
  const [animationsEnabled, setAnimations] = useState<boolean>(readCachedMotion);
  const motionOn = design === "texotic" && animationsEnabled && !prefersReducedMotion();

  useEffect(() => {
    applyDesign(design);
  }, [design]);

  useEffect(() => {
    applyMotion(design, animationsEnabled);
  }, [design, animationsEnabled]);

  useEffect(() => {
    const fetchDesign = async () => {
      try {
        const { data, error } = await supabase
          .from("site_settings")
          .select("value")
          .eq("key", SETTING_KEY)
          .maybeSingle();
        if (error) throw error;

        const { data: motion } = await supabase
          .from("site_settings")
          .select("value")
          .eq("key", MOTION_SETTING_KEY)
          .maybeSingle();
        if (motion && readMotionPreview() === null) setAnimations(motion.value !== false);

        if (readOverrideDesign()) return;
        // No row yet (or table not created) keeps the classic design.
        if (data) setDesign(data.value === false ? "texotic" : "classic");
      } catch (error) {
        console.error("Fetch site design error:", error);
      }
    };

    fetchDesign();
    window.addEventListener("focus", fetchDesign);
    return () => window.removeEventListener("focus", fetchDesign);
  }, []);

  // Texotic cards carry an amber glow that follows the pointer (see .tx-card in texotic.css).
  // With the motion layer on they also tilt toward the pointer (--rx / --ry).
  useEffect(() => {
    if (design !== "texotic") return;

    const handlePointerMove = (e: PointerEvent) => {
      const card = (e.target as HTMLElement | null)?.closest?.<HTMLElement>(".tx-card, .bg-gradient-card");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mx", `${x}px`);
      card.style.setProperty("--my", `${y}px`);
      card.style.setProperty("--ry", `${((x / rect.width - 0.5) * 7).toFixed(2)}deg`);
      card.style.setProperty("--rx", `${((0.5 - y / rect.height) * 7).toFixed(2)}deg`);
    };

    document.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => document.removeEventListener("pointermove", handlePointerMove);
  }, [design]);

  const setClassicEnabled = useCallback(async (enabled: boolean) => {
    const { error } = await supabase
      .from("site_settings")
      .upsert({ key: SETTING_KEY, value: enabled, updated_at: new Date().toISOString() });
    if (error) throw error;
    // The admin should see exactly what visitors get, so drop any personal override.
    try {
      localStorage.removeItem(VISITOR_KEY);
      sessionStorage.removeItem(PREVIEW_KEY);
    } catch {
      // Storage blocked — nothing to clear.
    }
    setDesign(enabled ? "classic" : "texotic");
  }, []);

  // Scroll reveal: sections and cards fade / rise in as they enter the viewport.
  // Elements are only hidden once JS has marked them "pending", so nothing stays hidden if this fails.
  useEffect(() => {
    if (!motionOn || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.txReveal = "in";
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 }
    );

    const scan = () => {
      const targets = document.querySelectorAll<HTMLElement>(
        "main > section:not(#home), main section .tx-card, main section .bg-gradient-card"
      );
      const perParent = new Map<Element | null, number>();
      targets.forEach((el) => {
        if (el.dataset.txReveal || el.closest("[data-tx-noreveal]")) return;
        const index = perParent.get(el.parentElement) ?? 0;
        perParent.set(el.parentElement, index + 1);
        el.style.setProperty("--tx-i", String(Math.min(index, 6)));
        el.dataset.txReveal = "pending";
        io.observe(el);
      });
    };

    scan();
    let frame = 0;
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(scan);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(frame);
      mo.disconnect();
      io.disconnect();
      document.querySelectorAll<HTMLElement>("[data-tx-reveal]").forEach((el) => {
        delete el.dataset.txReveal;
      });
    };
  }, [motionOn]);

  const setAnimationsEnabled = useCallback(async (enabled: boolean) => {
    const { error } = await supabase
      .from("site_settings")
      .upsert({ key: MOTION_SETTING_KEY, value: enabled, updated_at: new Date().toISOString() });
    if (error) throw error;
    try {
      sessionStorage.removeItem(MOTION_PREVIEW_KEY);
    } catch {
      // Storage blocked — nothing to clear.
    }
    setAnimations(enabled);
  }, []);

  const toggleDesign = useCallback(() => {
    setDesign((current) => {
      const next: SiteDesign = current === "texotic" ? "classic" : "texotic";
      try {
        sessionStorage.removeItem(PREVIEW_KEY);
        localStorage.setItem(VISITOR_KEY, next);
      } catch {
        // Storage blocked — the switch still works for this page view.
      }
      return next;
    });
  }, []);

  return (
    <SiteDesignContext.Provider value={{
        design,
        isTexotic: design === "texotic",
        setClassicEnabled,
        toggleDesign,
        animationsEnabled,
        motionOn,
        setAnimationsEnabled,
      }}>
      {children}
    </SiteDesignContext.Provider>
  );
};

export const useSiteDesign = () => {
  const context = useContext(SiteDesignContext);
  if (!context) throw new Error("useSiteDesign must be used inside SiteDesignProvider");
  return context;
};
