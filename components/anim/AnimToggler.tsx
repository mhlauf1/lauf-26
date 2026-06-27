"use client";

import { useState } from "react";
import { ANIM_THEMES, useAnimTheme } from "./AnimationProvider";

/**
 * Dev/auditioning control for the micro-animation system. Floats bottom-center,
 * styled to match the editorial chrome (warm paper, ink text, rust active).
 *
 * To remove from production: flip SHOW_ANIM_TOGGLER to false (or gate it on
 * `process.env.NODE_ENV !== "production"`). The reveals keep running on the
 * persisted/default theme either way.
 */
const SHOW_ANIM_TOGGLER = true;

export function AnimToggler() {
  const { theme, setTheme, reducedMotion } = useAnimTheme();
  const [open, setOpen] = useState(true);

  if (!SHOW_ANIM_TOGGLER) return null;

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-4 left-1/2 z-[100] -translate-x-1/2 rounded-full border border-line bg-paper/90 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted shadow-sm backdrop-blur transition-colors hover:text-ink"
        aria-label="Show animation controls"
      >
        Anim
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 left-1/2 z-[100] -translate-x-1/2">
      <div className="flex items-center gap-1.5 rounded-full border border-line bg-paper/90 p-1.5 pl-3.5 shadow-[0_8px_30px_rgba(20,20,20,0.08)] backdrop-blur">
        <span className="mr-1 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
          Anim
        </span>

        {ANIM_THEMES.map((t) => {
          const active = theme === t.key;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setTheme(t.key)}
              aria-pressed={active}
              className={`rounded-full px-3 py-1.5 font-sans text-[12px] font-medium transition-colors ${
                active
                  ? "bg-ink text-paper"
                  : "text-muted hover:bg-cream hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => setOpen(false)}
          className="ml-0.5 flex h-6 w-6 items-center justify-center rounded-full text-faint transition-colors hover:bg-cream hover:text-ink"
          aria-label="Hide animation controls"
        >
          ✕
        </button>
      </div>

      {reducedMotion && (
        <p className="mt-1.5 text-center font-mono text-[10px] tracking-[0.06em] text-faint">
          reduced-motion on — showing “off”
        </p>
      )}
    </div>
  );
}
