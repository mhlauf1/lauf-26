import type { Metadata } from "next";
import { Fraunces, Source_Serif_4, IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";
import SmoothScroll from "@/components/SmoothScroll";
import { SiteNav } from "@/components/sections/SiteNav";
import "./globals.css";

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
      <body>
        <SmoothScroll>
          <SiteNav />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
