"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

/**
 * Micro-animation themes. One global switch swaps every reveal + hover on the
 * page between distinct feels. Everything is driven off `<html data-anim="…">`
 * + CSS (see app/globals.css), so switching is a single attribute write — no
 * component re-render is needed for the visuals to change.
 */
export const ANIM_THEMES = [
  { key: "sleek", label: "Sleek" },
  { key: "crisp", label: "Crisp" },
  { key: "mask", label: "Mask" },
  { key: "off", label: "Off" },
] as const;

export type AnimTheme = (typeof ANIM_THEMES)[number]["key"];

const DEFAULT_THEME: AnimTheme = "crisp";
// Bump the key to reset everyone to the new default, ignoring stale choices.
const STORAGE_KEY = "lauf-anim-2";

const VALID = new Set(ANIM_THEMES.map((t) => t.key));
function isTheme(v: unknown): v is AnimTheme {
  return typeof v === "string" && VALID.has(v as AnimTheme);
}

type Ctx = {
  /** The user's chosen theme (persisted) — what the toggler highlights. */
  theme: AnimTheme;
  setTheme: (t: AnimTheme) => void;
  /** True when the OS asks for reduced motion; display is coerced to "off". */
  reducedMotion: boolean;
};

const AnimContext = createContext<Ctx | null>(null);

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<AnimTheme>(DEFAULT_THEME);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Hydrate the saved choice + watch the reduced-motion preference.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (isTheme(saved)) setThemeState(saved);
    } catch {
      /* localStorage unavailable — fall back to the default */
    }

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // The effective theme is what actually drives the CSS. Reduced motion wins.
  const effective: AnimTheme = reducedMotion ? "off" : theme;
  useEffect(() => {
    document.documentElement.dataset.anim = effective;
  }, [effective]);

  const setTheme = useCallback((t: AnimTheme) => {
    setThemeState(t);
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch {
      /* ignore persistence failures */
    }
  }, []);

  return (
    <AnimContext.Provider value={{ theme, setTheme, reducedMotion }}>
      {children}
    </AnimContext.Provider>
  );
}

export function useAnimTheme(): Ctx {
  const ctx = useContext(AnimContext);
  if (!ctx) {
    throw new Error("useAnimTheme must be used within <AnimationProvider>");
  }
  return ctx;
}
