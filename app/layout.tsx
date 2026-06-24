import type { Metadata } from "next";
import {
  Newsreader,
  Schibsted_Grotesk,
  Fraunces,
  IBM_Plex_Mono,
} from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

// Display serif — used Light (300) everywhere per the locked direction.
const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

// Body / UI sans.
const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-schibsted",
  weight: ["400", "500", "600", "700"],
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
      className={`${newsreader.variable} ${schibsted.variable} ${fraunces.variable} ${plex.variable}`}
    >
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
