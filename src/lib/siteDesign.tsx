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
};

const SiteDesignContext = createContext<SiteDesignContextValue | null>(null);

export const SiteDesignProvider = ({ children }: { children: ReactNode }) => {
  const [design, setDesign] = useState<SiteDesign>(readCachedDesign);

  useEffect(() => {
    applyDesign(design);
  }, [design]);

  useEffect(() => {
    const fetchDesign = async () => {
      try {
        const { data, error } = await supabase
          .from("site_settings")
          .select("value")
          .eq("key", SETTING_KEY)
          .maybeSingle();
        if (error) throw error;
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

  // Texotic cards carry an amber glow that follows the pointer (see .tx-card in index.css).
  useEffect(() => {
    if (design !== "texotic") return;

    const handlePointerMove = (e: PointerEvent) => {
      const card = (e.target as HTMLElement | null)?.closest?.<HTMLElement>(".tx-card, .bg-gradient-card");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      card.style.setProperty("--my", `${e.clientY - rect.top}px`);
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
    <SiteDesignContext.Provider value={{ design, isTexotic: design === "texotic", setClassicEnabled, toggleDesign }}>
      {children}
    </SiteDesignContext.Provider>
  );
};

export const useSiteDesign = () => {
  const context = useContext(SiteDesignContext);
  if (!context) throw new Error("useSiteDesign must be used inside SiteDesignProvider");
  return context;
};
