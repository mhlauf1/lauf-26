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
    image: `${IMG}/4d28523f-838e-4df9-bdc5-7160f06f28c4`,
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
        `${IMG}/9dd48b5e-760a-4648-8686-4fa0b9a55853`,
        `${IMG}/88b057a2-0fdb-4c20-b581-caaa58d602a8`,
        `${IMG}/79d86a1b-a96d-444c-a0ed-c59ae4d537fd`,
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
export type ReelShot = { src: string; alt: string; w: number; h: number };

export const reel: ReelShot[] = [
  { src: `${IMG}/9f49b453-1aa5-4f77-a304-88735f1c2f86`, alt: "Embark — a freshly groomed dog in the salon", w: 1632, h: 2048 },
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
