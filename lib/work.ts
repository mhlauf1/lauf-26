/**
 * Single source of truth for Lauf's work.
 * Every showcase format reads from here, so swapping in a CMS (Sanity)
 * later means changing this file only — components don't care.
 */

export type CaseStat = { value: string; label: string };

/** Client quote shown on the flagship band + case page. */
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

/**
 * Long-form case content for /work/[slug]. Every field is optional so the
 * template degrades gracefully — a project with no `caseStudy` still renders
 * a clean header + cover from the base fields above.
 */
export type CaseStudy = {
  /** larger lede on the case page (one or two sentences) */
  intro?: string;
  /** the situation we walked into */
  problem?: string;
  /** how we approached it */
  approach?: string;
  /** what shipped / the result */
  outcome?: string;
  /** headline figures shown as a serif stat row */
  stats?: CaseStat[];
  /** extra image URLs beyond the cover, for the case gallery */
  gallery?: string[];
  /** tech the project was built on */
  stack?: string[];
  /** live site, if public */
  liveUrl?: string;
};

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
  testimonials?: Testimonial[];
  caseStudy?: CaseStudy;
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
    image: `${IMG}/339666df-2f15-4113-b9f3-c48f71c6d838`,
    year: "2025",
    status: "live",
    testimonials: [
      {
        quote:
          "Lauf gave us one system to run every brand we acquire. What used to take weeks of agency back-and-forth now ships in days — and every new salon looks like it belongs from day one.",
        name: "Jordan Reyes",
        role: "COO, Embark Pet Services",
      },
      {
        quote:
          "They didn't just design a site, they handed us a platform our team can actually run. Onboarding a new location is a content task now, not a project.",
        name: "Mara Whitfield",
        role: "Head of Brand, Embark",
      },
      {
        quote:
          "The handoff was the cleanest we've had. Clear system, no loose ends — it felt like working with an in-house team, not an agency.",
        name: "Devin Okafor",
        role: "Operations Lead, Embark",
      },
    ],
    caseStudy: {
      intro:
        "A pet-services roll-up that was acquiring grooming salons faster than its websites could keep up. We built the system that ships every new acquisition on one shared platform.",
      problem:
        "Each acquired salon arrived with its own dated website, its own host, and its own logins. Six brands meant six codebases to patch, six places for hours and pricing to drift out of date, and weeks of agency time for every new location. Growth was outrunning the web.",
      approach:
        "We designed one multi-brand system: a shared Next.js front end driven by Sanity, where every brand is a theme — its own logo, palette, and voice — over the same components and content model. Launching a new salon is now a content task, not a rebuild. Booking, locations, and services all read from one source of truth.",
      outcome:
        "New acquisitions go live in days instead of weeks. One platform, six brands, a single team maintaining all of it — and headroom for the next ten salons without touching the architecture.",
      stats: [
        { value: "6", label: "Brands, one codebase" },
        { value: "~3 days", label: "To launch a new salon" },
        { value: "1", label: "Source of truth" },
      ],
      stack: ["Next.js", "Sanity CMS", "Tailwind", "Vercel"],
      gallery: [
        `${IMG}/5781422c-3127-4094-a690-ca7102dec820`,
        `${IMG}/178e318b-4d69-4499-8931-a1cc028180a9`,
        `${IMG}/c4cd2535-2642-4342-beba-a7bc10644b86`,
      ],
    },
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
    caseStudy: {
      intro:
        "The private-capital firm behind Embark needed a presence that read as institutional as the checks it writes — restrained, confident, and quick.",
      problem:
        "A growing portfolio with a placeholder site. Founders and LPs were landing on something that undersold the firm's track record and discipline.",
      approach:
        "A spare, typographic site that lets the numbers and the portfolio do the talking. Editorial layout, fast load, and a structure that adds new portfolio companies without a redesign.",
      outcome:
        "A credible front door for diligence and fundraising — the kind of site that matches the room the firm is pitching in.",
      stats: [
        { value: "<1s", label: "Time to first paint" },
        { value: "100", label: "Lighthouse performance" },
      ],
      stack: ["Next.js", "Tailwind", "Vercel"],
    },
  },
  {
    slug: "the-body-biz",
    name: "The Body Biz",
    vertical: "Wellness",
    accent: "#c7417b",
    tagline: "Wix out. 3× faster checkout.",
    blurb: "Wix & Authorize.net replaced with Next.js + Stripe.",
    services: "Brand · Build",
    image: `/bb-mockup-2.jpg`,
    year: "2025",
    status: "shipped",
    caseStudy: {
      intro:
        "A wellness studio outgrowing its Wix site and a clunky Authorize.net checkout. We rebrought the brand and rebuilt the storefront from the ground up.",
      problem:
        "Slow pages, an awkward checkout, and a template that everyone in the category was also using. Conversions were leaking at the last step, and the brand looked like a side project rather than the real business it was.",
      approach:
        "A fresh editorial identity, then a Next.js rebuild with Stripe checkout — fewer steps, faster pages, and a design that finally matched the quality of the work. Content moved to a CMS the owner can run herself.",
      outcome:
        "Checkout is roughly 3× faster, the brand looks the part, and the team ships their own updates without calling an agency.",
      stats: [
        { value: "3×", label: "Faster checkout" },
        { value: "Stripe", label: "Replaced Authorize.net" },
        { value: "Self-serve", label: "Owner-run content" },
      ],
      stack: ["Next.js", "Stripe", "Sanity CMS", "Tailwind"],
      gallery: [
        "/bb-mockup-2.jpg",
        `${IMG}/9dd48b5e-760a-4648-8686-4fa0b9a55853`,
        `${IMG}/88b057a2-0fdb-4c20-b581-caaa58d602a8`,
      ],
    },
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
    caseStudy: {
      intro:
        "A tenant-experience platform that needed a front end people would actually open — booking amenities, raising tickets, and getting building news in one place.",
      problem:
        "The product worked, but the interface fought its users. Adoption stalled because residents found it easier to email the front desk than to use the app.",
      approach:
        "We designed and built the web and mobile front end around the few things tenants do most — fast, legible, and friendly. A shared component system keeps web and native consistent as features land.",
      outcome:
        "An app residents open by choice. The interface gets out of the way, and the building team fields fewer one-off emails.",
      stats: [
        { value: "Web + app", label: "One design system" },
        { value: "Daily", label: "Tenant-facing surface" },
      ],
      stack: ["React", "React Native", "Next.js", "Tailwind"],
      gallery: [
        `${IMG}/fa7fe8ea-ff54-45a1-8c36-b9284432744c`,
        `${IMG}/317c7a9c-c185-47af-a783-3bc5e3af407d`,
        `${IMG}/0dd4210c-d736-4d23-8e13-a1ee6c398cd4`,
      ],
    },
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
    caseStudy: {
      intro:
        "An Amazon marketplace consultancy that helps brands turn a storefront into a growth engine — and needed an identity that signaled the same.",
      problem:
        "Deep expertise wrapped in a generic, agency-template look. The brand didn't convey the rigor behind the service.",
      approach:
        "A confident visual identity and art direction, then a site built to explain a technical service in plain language — clear positioning, clear proof.",
      outcome:
        "A brand that reads as the specialist it is, and a site that turns marketplace know-how into something prospects can grasp in a scroll.",
      stack: ["Brand identity", "Art direction", "Web design"],
    },
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
    caseStudy: {
      intro:
        "An advisory firm whose web presence needed to look as considered as its counsel — and flex to host a growing calendar of events.",
      problem:
        "A static brochure site that couldn't keep pace with the firm's events, and a look that undersold the seniority of the advice.",
      approach:
        "A calm, authoritative design with an events structure built in from day one — add a new program without a developer, and it slots into the existing system cleanly.",
      outcome:
        "A presence the firm can grow into: polished, fast, and ready for the next event without a rebuild.",
      stack: ["Next.js", "Tailwind", "Vercel"],
    },
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
    caseStudy: {
      intro:
        "A New York electrical contractor doing serious commercial work behind a website that looked like a side job. We fixed the mismatch.",
      problem:
        "Big projects, small-time web presence. The site didn't reflect the scale or quality of the contracts the team actually wins.",
      approach:
        "A sharp, no-nonsense design that puts the work front and center — clear services, real projects, and an obvious way to start a bid.",
      outcome:
        "A presence that matches the caliber of the work, and makes it easy for the right clients to reach out.",
      stack: ["Next.js", "Tailwind", "Vercel"],
    },
  },
];

/** Verticals for the hero tag-pills — proof of range, not a gate. */
export const verticals = [
  { label: "Private Equity", color: "#1f3a5f" }, // Cadence — deep navy, finance
  { label: "Pet Services", color: "#e0742e" }, // Embark — brand orange
  { label: "Wellness", color: "#2f7d55" }, // The Body Biz — green
  { label: "SaaS", color: "#2f6bd6" }, // Playbook — tech blue
  { label: "Advisory", color: "#8b5cc7" }, // STOC — purple
  { label: "Trades", color: "#d6a12f" }, // Striano Electric — electric gold
  { label: "Recruiting", color: "#b5462f" }, // MN MFG — industrial rust
  { label: "Agencies", color: "#c7417b" }, // Brady Digital — magenta
];

export const bySlug = (slug: string) => projects.find((p) => p.slug === slug);

/**
 * Studio reel — a curated set of real, text-free brand photos for the
 * under-hero infinite loop. Just good imagery (no captions). Mixed aspect
 * ratios drive varied card widths; intrinsic w/h keep them un-cropped.
 * Sourced from the Bloom brand libraries (Embark, The Body Biz, Playbook).
 */
export type ReelShot = {
  src: string;
  alt: string;
  w: number;
  h: number;
  /** when true, `src` is a muted autoplay/loop video (mp4) rather than an image */
  video?: boolean;
};

export const reel: ReelShot[] = [
  { src: "/bodybiz-mockup-2.png", alt: "The Body Biz — responsive site mockup", w: 423, h: 505 },
  { src: "/playbook-dither.mp4", alt: "Playbook — dithered duotone event teaser", w: 1080, h: 1080, video: true },
  { src: "/hero-16x9-comp.mp4", alt: "Lauf — hero brand motion composite", w: 1920, h: 1080, video: true },
  { src: "/wags-mockup.jpg", alt: "Wags — daycare pricing calculator on a tablet", w: 2000, h: 1333 },
  { src: "/brady-into.mp4", alt: "Brady Digital — brand motion intro", w: 1728, h: 1080, video: true },
  { src: "/playbook-mockup.jpg", alt: "Playbook — tenant-experience app mockup", w: 2000, h: 3000 },
  { src: "/lines.png", alt: "Brand values connected by a mapped line system", w: 1192, h: 672 },
  { src: "/bb-motion-1.mp4", alt: "The Body Biz — brand motion study", w: 1080, h: 1350, video: true },
  { src: "/bb-mockup-2.jpg", alt: "The Body Biz — coaching site on a laptop", w: 2000, h: 1334 },
  { src: "/playbook-hat.png", alt: "Playbook — branded merch cap", w: 1984, h: 2128 },

  { src: "/riverside-mockup.jpg", alt: "Riverside — responsive site mockup", w: 2000, h: 3000 },
  { src: "/stoc-mockup-1.png", alt: "STOC Advisory — responsive site mockup", w: 423, h: 505 },
];
