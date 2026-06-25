/**
 * Single source of truth for Lauf's work.
 * Every showcase format reads from here, so swapping in a CMS (Sanity)
 * later means changing this file only — components don't care.
 */

export type Project = {
  slug: string;
  name: string;
  vertical: string;
  /** dot color for tag-pills / category chips (color lives in the work) */
  accent: string;
  /** witty serif one-liner used on sticker cards & covers */
  tagline: string;
  /** plain-language descriptor */
  blurb: string;
  services: string;
  image?: string;
  year?: string;
  status?: "live" | "shipped";
};

const IMG = "https://www.trybloom.ai/img";

export const projects: Project[] = [
  {
    slug: "embark",
    name: "Embark",
    vertical: "Pet Services",
    accent: "#e0742e",
    tagline: "Six brands. One codebase.",
    blurb: "A pet-services roll-up shipping every acquisition on one shared platform.",
    services: "Design · Build · Multi-brand system",
    image: `${IMG}/ae5811fb-fb81-4243-a1af-bd98f4162226`,
    year: "2025",
    status: "live",
  },
  {
    slug: "cadence",
    name: "Cadence Private Capital",
    vertical: "Private Equity",
    accent: "#2f6bd6",
    tagline: "Confidence, compounded.",
    blurb: "An institutional presence for the firm behind Embark.",
    services: "Design · Next.js",
    year: "2025",
    status: "live",
  },
  {
    slug: "the-body-biz",
    name: "The Body Biz",
    vertical: "Wellness",
    accent: "#c7417b",
    tagline: "Wix out. 3× faster checkout.",
    blurb: "Wix & Authorize.net replaced with Next.js + Stripe.",
    services: "Brand · Build",
    image: `${IMG}/4d28523f-838e-4df9-bdc5-7160f06f28c4`,
    year: "2025",
    status: "shipped",
  },
  {
    slug: "playbook",
    name: "Playbook",
    vertical: "PropTech · SaaS",
    accent: "#2f6bd6",
    tagline: "The tenant app people open.",
    blurb: "Web + mobile front end for a tenant-experience platform.",
    services: "Product · Build",
    image: `${IMG}/68e6cce9-eefd-4316-96d2-4d67e9beb031`,
    year: "2025",
    status: "shipped",
  },
  {
    slug: "brady-digital",
    name: "Brady Digital",
    vertical: "E-commerce",
    accent: "#e0742e",
    tagline: "Amazon, into a growth engine.",
    blurb: "Identity & site for an Amazon marketplace consultancy.",
    services: "Design · Art dir",
    year: "2024",
    status: "shipped",
  },
  {
    slug: "stoc-advisory",
    name: "STOC Advisory",
    vertical: "Advisory",
    accent: "#2f7d55",
    tagline: "Advice that looks the part.",
    blurb: "An advisory presence built to scale across future events.",
    services: "Design · Build",
    year: "2024",
    status: "live",
  },
  {
    slug: "striano-electric",
    name: "Striano Electric",
    vertical: "Trades",
    accent: "#d6a12f",
    tagline: "Trade work, taken seriously online.",
    blurb: "A sharp web presence for a New York electrical contractor.",
    services: "Design · Build",
    year: "2024",
    status: "live",
  },
];

/** Verticals for the hero tag-pills — proof of range, not a gate. */
export const verticals = [
  { label: "Private Equity", color: "#2f6bd6" },
  { label: "Pet Services", color: "#e0742e" },
  { label: "Wellness", color: "#c7417b" },
  { label: "SaaS", color: "#2f7d55" },
  { label: "Advisory", color: "#8b5cc7" },
  { label: "Trades", color: "#d6a12f" },
];

export const bySlug = (slug: string) => projects.find((p) => p.slug === slug);

/**
 * Studio reel — a curated set of real, text-free brand photos for the
 * under-hero infinite loop. Just good imagery (no captions). Mixed aspect
 * ratios drive varied card widths; intrinsic w/h keep them un-cropped.
 * Sourced from the Bloom brand libraries (Embark, The Body Biz, Playbook).
 */
export type ReelShot = { src: string; alt: string; w: number; h: number };

export const reel: ReelShot[] = [
  { src: `${IMG}/d3c5acd8-62ac-442c-85de-6f091489a647`, alt: "Embark — out-of-home billboard campaign", w: 2048, h: 1152 },
  { src: `${IMG}/4d28523f-838e-4df9-bdc5-7160f06f28c4`, alt: "The Body Biz — chalked hands on a barbell", w: 1632, h: 2048 },
  { src: `${IMG}/fa7fe8ea-ff54-45a1-8c36-b9284432744c`, alt: "Playbook — the tenant app in context", w: 1152, h: 2048 },
  { src: `${IMG}/178e318b-4d69-4499-8931-a1cc028180a9`, alt: "Embark — a groomer washing a dog in the salon", w: 1300, h: 867 },
  { src: `${IMG}/9dd48b5e-760a-4648-8686-4fa0b9a55853`, alt: "The Body Biz — services typographic poster", w: 1360, h: 2048 },
  { src: `${IMG}/317c7a9c-c185-47af-a783-3bc5e3af407d`, alt: "Playbook — a modern multi-level office lobby", w: 1632, h: 2048 },
  { src: `${IMG}/c4cd2535-2642-4342-beba-a7bc10644b86`, alt: "Embark — trimming a cat's claws at home", w: 1000, h: 667 },
  { src: `${IMG}/88b057a2-0fdb-4c20-b581-caaa58d602a8`, alt: "The Body Biz — a calm editorial portrait in natural light", w: 1632, h: 2048 },
  { src: `${IMG}/04e692fb-14b7-4ba8-9023-a5bab477648c`, alt: "Playbook — a rooftop yoga class above the city", w: 1632, h: 2048 },
  { src: `${IMG}/ae5811fb-fb81-4243-a1af-bd98f4162226`, alt: "Embark — bathing a corgi", w: 1000, h: 1000 },
  { src: `${IMG}/79d86a1b-a96d-444c-a0ed-c59ae4d537fd`, alt: "The Body Biz — brand stationery system", w: 2048, h: 1360 },
  { src: `${IMG}/12369673-5544-4690-aca0-39be08dbcfb4`, alt: "Playbook — an exposed-brick multi-level interior", w: 1346, h: 688 },
  { src: `${IMG}/0dd4210c-d736-4d23-8e13-a1ee6c398cd4`, alt: "Playbook — a plush co-working lounge", w: 1632, h: 2048 },
];
