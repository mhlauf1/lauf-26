# Lauf — Rebuild Progress & Handoff

Living status doc for the lauf.co brand + site rebuild. Update as we go.
Last updated: 2026-06-24.

---

## 1. The goal

Top-to-bottom **brand + design + dev refresh** for **Lauf** (lauf.co) — Mike & Clare's
two-person design + development studio in Madison, WI. The portfolio _is_ the pitch.
Flow: **design in Paper → port to this Next.js repo as a component kit → compose the site.**

---

## 2. Locked design direction

- **Register:** warm-studio / editorial, **mirroring bajgartoffice.com** (refs in
  `context/inspiration/`): classic serif display with the work carrying the color.
- **Type:**
  - Display = **Newsreader, weight 300 (Light) everywhere**.
  - Body/UI = **Schibsted Grotesk**.
  - Accent = **Fraunces** (the star `*` + rare italic).
  - Mono = **IBM Plex Mono** (split-flap board).
- **Color:** ink `#141414` on warm white `#FDFCFA`. **Color lives only in the work**
  (bright cards, real photos). Eyebrows/labels = muted gray `#9A9388`.
- **Star mark:** the **Fraunces asterisk `*`, weight 500, rust `#B0431F`** — the one
  deliberate pop of color. In nav (`Lauf*`), hero, section eyebrows, dividers, footer,
  favicon. (NOT the unicode ✳.)
- **Copy:** craft-led, **not multi-brand-gated**. Hero (current): "We design and build *
  websites that thrive." Multi-brand (Embark = 6 brands) is shown as proof of range, not
  a requirement. Vertical tag-pills (PE, Pet, Wellness, SaaS, Advisory, Trades) = breadth.
- Rejected earlier: loud industrial v2 (chrome yellow/Archivo); the muted-warm comps
  (Bookish/Candlelit/Botanical); pervasive orange+italic ("too Claude").

Other palette tokens in use: cream `#F1EADC`, board/near-black `#16140F`, line `#E7E1D6`,
muted `#6B6459`, faint `#9A9388`.

---

## 3. Paper file (design source of truth)

File: **"LAUF v2 — Showstopper Rebuild"** (id `01KTQBG4Q3KXJ5V19CWGTV68EP`). All current
work is in the **`v3 ·`** artboards:

- **`v3 · Homepage — v2 (ink + star motif)`** — the canonical homepage. Sections:
  Hero → Embark flagship band → work case-grid → tabbed viewer → photo carousel →
  services → studio (Mike & Clare) → trusted-by → CTA → footer, with `*` dividers.
- **`v3 · Work Showcase — New Formats`** — **15 showcase modules** (the creative kit):
  1. before/after slider · 2. hover-reveal index · 3. bento collage · 4. logo marquee ·
  5. showreel video-loop · 6. sticky split-scroll · 7. stacked scroll-cards ·
  8. device mockups (browser+phone) · 9. polaroid sticker scatter · 10. quote spotlight ·
  11. split-flap departure board · 12. pinned horizontal scroll · 13. now/next board ·
  14. cover-flow carousel · 15. magnetic hover tiles.
- **`v3 · Star Mark — Favicon / Monogram`** — app icons, `Lauf*` lockup, favicon proofs.
- Hero type takes (Newsreader/Fraunces/Grotesque) + wordmark-exploration sheet (logo =
  route 01, roman "Lauf") — exploration/reference.

Real imagery comes from **Bloom** onboarded brands (Embark grooming, Playbook app/marketing,
Body Biz editorial). URLs are `https://www.trybloom.ai/img/<id>` — see `lib/work.ts`.

---

## 4. The codebase (this repo)

**Next.js 15 App Router + TypeScript + Tailwind v4.** Builds clean; dev on `:3000`.
Git initialized, **not yet committed**.

```
app/
  layout.tsx        next/font (Newsreader 300, Schibsted, Fraunces, Plex) → CSS vars; Lenis
  globals.css       Tailwind v4 @theme tokens (colors/fonts/marquee). CSS-first, no config.
  page.tsx          home — renders <Hero/> + link to /kit (real composition comes later)
  kit/page.tsx      THE PLAYGROUND — every component rendered + labeled
components/
  primitives/       StarMark, SectionLabel
  sections/         Hero
  showcase/         BeforeAfter (JS drag), LogoMarquee (CSS)
  kit/KitItem.tsx   labeled slot wrapper for /kit
  SmoothScroll.tsx  Lenis provider (reduced-motion aware)
lib/work.ts         single typed data source (projects, verticals) — Sanity-swappable
next.config.mjs     allows images from www.trybloom.ai
```

**Conventions:** Tailwind utilities from the `@theme` tokens (`bg-paper`, `text-ink`,
`text-rust`, `font-serif`, `font-light`, `animate-marquee`…). Use `<StarMark/>` — never
hardcode the asterisk. Every format reads from `lib/work.ts`.

Run: `npm install` → `npm run dev` → `localhost:3000/kit`.

---

## 5. Done

- ✅ Full design direction locked (above).
- ✅ Paper: homepage v2, 15-format showcase kit, favicon sheet.
- ✅ Next.js scaffold: tokens, fonts, Lenis, image config, git init.
- ✅ First slice ported to code (proves the 3 conventions): **Hero** (static),
  **BeforeAfter** (JS interaction), **LogoMarquee** (CSS animation) — all live in `/kit`.

---

## 6. To come (rough order)

1. **Port the rest of the showcase formats** to `components/showcase/`, each into `/kit`:
   tabbed viewer, bento, hover-index, stacked scroll-cards, device mockups, polaroid
   scatter, quote spotlight, split-flap, pinned horizontal scroll, now/next, cover-flow,
   magnetic tiles, showreel, sticky split-scroll. (Wire real interactions: tabs, GSAP
   ScrollTrigger for stacked/pinned, flip for split-flap, pointer-lean for magnetic.)
2. **Port the homepage sections** (`components/sections/`): EmbarkBand, WorkGrid, Services,
   StudioBand, TrustedBy, CTA, Footer, StarDivider.
3. **Compose `app/page.tsx`** from the flow the user picks after browsing `/kit`.
4. **Motion layer polish** — one orchestrated hero moment, reveal-on-scroll, all
   `prefers-reduced-motion` safe.
5. **CMS** — move `lib/work.ts` to **Sanity** (project type, images, case studies).
6. **Inner pages** — `/work` index, `/work/[slug]` case template, `/about`, `/contact`.
7. **Logo/favicon** export from Paper → `app/icon`, real assets into `/public`.
8. **Responsive + a11y + Lighthouse**, then **deploy** (Vercel).

---

## 7. Decisions still open for the user

- Which showcase formats make the final homepage (browse `/kit`, then we compose).
- Wordmark final pick (roman "Lauf" = logo; star treatments 03/05 are the ownable ones).
- Whether real client **screenshots** replace the Bloom placeholder imagery for case work.
- CMS now vs. later (currently local `lib/work.ts`).

See also the memory files: `lauf-rebuild-direction`, `lauf-nextjs-setup`.
