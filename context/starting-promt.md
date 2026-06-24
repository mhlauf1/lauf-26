# Lauf — Site Rebuild Brief (for Paper)

## Positioning (locked)

**Hero subhead:** Design and development for multi-brand companies and growing teams.

Lauf is a design + development studio (Mike & Clare). The portfolio _is_ the pitch:
real multi-brand work, shown cleanly, so prospects immediately get _who you are and
what you do_ and reach out.

## Audience

Multi-brand companies and growing teams who need design + build under one roof.
Decision-makers skimming on desktop; they should grasp the offer in ~5 seconds and
see proof in the next 10.

## Aesthetic direction

Minimal, sleek, editorial. Apple-esque restraint. Generous whitespace, confident
type, one accent at most. Motion is _micro_ and purposeful — reveal-on-scroll,
subtle hover states, one larger "moment" up top. No clutter, no stock gloss.

## Content priority (every direction must carry these)

1. One-line identity + the locked subhead.
2. Work, work, work — lead with **Embark** (6 sub-brands under Cadence) as the
   flagship multi-brand proof. Then a curated set: Cadence, The Body Biz,
   STOC Advisory, Brady Digital, Playbook, MN MFG Recruiting, Striano Electric.
3. A short "how we work / what we do" line (design + dev, multi-brand systems).
4. Single clear CTA — start a conversation.

## What Paper handles vs. what ships later

- **Paper:** visual language, layout, type scale, color, design-system tokens,
  the four directions below, shader/texture moments.
- **Claude Code (Next.js ship phase):** Lenis smooth scroll, GSAP/Framer micro-
  interactions, real CMS content, responsive build, deploy.

---

## Direction 1 — "The Index"

Type-forward and editorial. The homepage reads like a confident index: oversized
restrained headline, then a running list of clients/projects that reveal thumbnails
on scroll. Monochrome + one accent. Feels like an Apple keynote slide that never
shouts. Best if you want _credibility and restraint_ to lead.

**Paper prompt:**

> Create a 1440x3200px artboard called "Lauf — Index". Top: minimal sticky nav
> (left wordmark "Lauf", right single link "Start a project"). Hero: oversized
> left-aligned headline "Design and development for multi-brand companies and
> growing teams", lots of whitespace, near-black on off-white. Below: a vertical
> list/index of 8 client names in large type (Embark, Cadence, The Body Biz, STOC
> Advisory, Brady Digital, Playbook, MN MFG Recruiting, Striano Electric), each row
> with a thin divider and a small thumbnail slot on the right. Add a subtle grain-
> gradient texture only behind the hero. One accent color. Set up text styles and
> color variables as a small design system.

## Direction 2 — "The Showcase Grid"

Work-first. A precise Swiss grid of full-bleed project tiles, Embark as the large
hero tile spanning the top row. Hover/scroll micro-interactions per tile. Best if
you want the _visual portfolio_ to do the talking immediately.

**Paper prompt:**

> Create a 1440x3000px artboard called "Lauf — Showcase". Minimal nav. Short hero:
> one line "Lauf — design & development for multi-brand companies and growing teams"
> plus a one-sentence subhead. Below, a 12-column grid of project cards: row 1 is a
> single full-width Embark hero card (label "Embark · 6 brands, one system"); rows
> below are a 2-up then 3-up grid of cards for Cadence, The Body Biz, STOC Advisory,
> Brady Digital, Playbook, MN MFG Recruiting, Striano Electric. Each card: image
> slot, brand name, one-line descriptor. Tight spacing, sharp corners, off-white bg,
> near-black type, one accent. Define grid + card components and color/text tokens.

## Direction 3 — "The Statement"

Most motion-forward. A single bold statement hero with a larger visual moment (a
shader/gradient or quiet animated texture), then it goes calm into a scroll-driven
case-study reel. Best if you want one memorable opening beat, then restraint.

**Paper prompt:**

> Create a 1440x3400px artboard called "Lauf — Statement". Full-viewport hero:
> centered statement "We design and build for multi-brand companies and growing
> teams." over a subtle liquid-metal or fluted-glass shader background, minimal nav,
> small CTA "Start a project". After the hero, switch to a clean horizontal case-
> study reel: large Embark case first (image + 2-line writeup), then a row of
> smaller case cards for the other clients. Keep everything below the hero quiet and
> monochrome so the hero is the only loud moment. Set up tokens.

## Direction 4 — "The Studio"

Warmer and personal — answers "who I am and what I do" directly. Mike & Clare, the
multi-brand thesis stated plainly in plain language, with work woven through as
proof rather than a gallery. Best if you want brand/identity warmth over a pure
portfolio wall.

**Paper prompt:**

> Create a 1440x3200px artboard called "Lauf — Studio". Minimal nav. Hero: a short,
> human two-line intro — line 1 "Lauf is a design and development studio." line 2
> "Built for multi-brand companies and growing teams." Below: a brief "what we do"
> section in three short columns (Brand & design / Development / Multi-brand
> systems). Then a featured-work band led by Embark, followed by a compact logo/
> project strip of the other clients. End with a personal "Mike & Clare" line and a
> single CTA. Soft off-white palette, one warm accent, editorial serif/sans pairing.
> Define text + color tokens.

---

## How to run this in Paper

1. Open Paper Desktop, open/create the Lauf file (MCP server auto-starts).
2. In the desktop **Code tab** (or terminal Claude Code):
   `claude mcp add paper --transport http http://127.0.0.1:29979/mcp --scope user`
3. Restart, confirm with `/mcp`.
4. Feed the agent one direction's prompt at a time; let it build, screenshot, react,
   refine ("more whitespace", "tighten the grid", "swap the accent").
5. Pick the winner → pull its JSX/Tailwind and ship into the Next.js repo, then add
   the Lenis/GSAP motion layer in the Code tab.
