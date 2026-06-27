import type { Metadata } from "next";
import { Fraunces, Source_Serif_4, IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";
import SmoothScroll from "@/components/SmoothScroll";
import { SiteNav } from "@/components/sections/SiteNav";
import { AnimationProvider } from "@/components/anim/AnimationProvider";
import { AnimToggler } from "@/components/anim/AnimToggler";
import "./globals.css";

// Sets the active animation theme on <html> before first paint so reveals
// don't flash visible-then-hidden during hydration. Mirrors the logic in
// AnimationProvider; reduced-motion wins. Without JS, no theme is set and all
// content stays fully visible.
const ANIM_BOOT = `(function(){try{var t=localStorage.getItem("lauf-anim-2");var ok=["sleek","crisp","mask","off"].indexOf(t)>-1;if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){t="off"}else if(!ok){t="crisp"}document.documentElement.dataset.anim=t}catch(e){document.documentElement.dataset.anim="crisp"}})();`;

// Display sans — General Sans (Fontshare, ITF Free Font License, self-hosted).
// The hero headline's sans bookend lines — set Regular (400), not bold.
const generalSans = localFont({
  variable: "--font-general",
  display: "swap",
  src: [
    { path: "./fonts/GeneralSans-Light.woff2", weight: "300", style: "normal" },
    { path: "./fonts/GeneralSans-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/GeneralSans-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/GeneralSans-Semibold.woff2", weight: "600", style: "normal" },
    { path: "./fonts/GeneralSans-Bold.woff2", weight: "700", style: "normal" },
  ],
});

// Display serif — the site's serif voice. Swap this one loader to audition a
// different Google serif; the --font-display-serif variable stays the same so
// nothing else needs to change.
const displaySerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-display-serif",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

// Warm accent serif — the star mark `*` and rare italic flourishes.
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

// Utility mono — split-flap board, ticket-style labels.
const plex = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lauf — Design & Development",
  description:
    "A two-person design and development studio. We design and build the whole thing — for people serious about how they show up online.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${plex.variable} ${generalSans.variable} ${displaySerif.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: ANIM_BOOT }} />
      </head>
      <body>
        <AnimationProvider>
          <SmoothScroll>
            <SiteNav />
            {children}
          </SmoothScroll>
          <AnimToggler />
        </AnimationProvider>
      </body>
    </html>
  );
}
