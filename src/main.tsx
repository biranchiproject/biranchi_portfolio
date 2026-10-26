import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./styles/texotic.css";
import { applyDesign, applyMotion, readCachedDesign, readCachedMotion } from "./lib/siteDesign";

// Paint the last known design immediately; SiteDesignProvider confirms it with Supabase.
applyDesign(readCachedDesign());
applyMotion(readCachedDesign(), readCachedMotion());

createRoot(document.getElementById("root")!).render(<App />);
