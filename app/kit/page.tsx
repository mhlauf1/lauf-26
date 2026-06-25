import { KitItem } from "@/components/kit/KitItem";
import { StarMark } from "@/components/primitives/StarMark";
import { Hero } from "@/components/sections/Hero";
import { HeroStudyA } from "@/components/sections/hero-studies/HeroStudyA";
import { HeroStudyB } from "@/components/sections/hero-studies/HeroStudyB";
import { HeroStudyC } from "@/components/sections/hero-studies/HeroStudyC";
import { WorkReel } from "@/components/sections/WorkReel";

// Showcase formats — the "New Formats" kit (F01–F15)
import { BeforeAfter } from "@/components/showcase/BeforeAfter";
import { HoverIndex } from "@/components/showcase/HoverIndex";
import { Bento } from "@/components/showcase/Bento";
import { LogoMarquee } from "@/components/showcase/LogoMarquee";
import { Showreel } from "@/components/showcase/Showreel";
import { StickySplit } from "@/components/showcase/StickySplit";
import { StackCards } from "@/components/showcase/StackCards";
import { DeviceMockups } from "@/components/showcase/DeviceMockups";
import { PolaroidScatter } from "@/components/showcase/PolaroidScatter";
import { QuoteSpotlight } from "@/components/showcase/QuoteSpotlight";
import { SplitFlap } from "@/components/showcase/SplitFlap";
import { PinnedGallery } from "@/components/showcase/PinnedGallery";
import { NowNext } from "@/components/showcase/NowNext";
import { CoverFlow } from "@/components/showcase/CoverFlow";
import { MagneticTiles } from "@/components/showcase/MagneticTiles";
import { TabbedViewer } from "@/components/showcase/TabbedViewer";

import { bySlug } from "@/lib/work";

export const metadata = { title: "Lauf — Component Kit" };

export default function KitPage() {
  const playbook = bySlug("playbook");

  return (
    <main className="min-h-screen pb-32">
      <div className="flex flex-col gap-2 px-10 pb-4 pt-16">
        <div className="flex items-baseline gap-2">
          <h1 className="font-serif text-[44px] font-light tracking-tight">
            Component kit
          </h1>
          <StarMark className="text-2xl" />
        </div>
        <p className="max-w-xl text-[15px] text-muted">
          Every section and showcase format, rendered live. Walk it, pick what
          you want, and we&rsquo;ll swap them into the homepage.
        </p>
      </div>

      <KitItem id="REF" title="Hero" note="the homepage opener" bleed>
        <Hero />
      </KitItem>

      <KitItem id="TYPE" title="Hero · A — Editorial control" note="all-Newsreader, single italic emphasis word (Bajgart-faithful)" bleed>
        <HeroStudyA />
      </KitItem>

      <KitItem id="TYPE" title="Hero · B — Mixed bottom line" note="Schibsted sans + serif roman + serif italic on one line — the move" bleed>
        <HeroStudyB />
      </KitItem>

      <KitItem id="TYPE" title="Hero · C — Tight mixed (brand copy)" note="same mix, tighter rhythm, sans leads the line" bleed>
        <HeroStudyC />
      </KitItem>

      <KitItem id="REF" title="Work Reel" note="infinite photo loop — hover to pause" bleed>
        <WorkReel />
      </KitItem>

      <KitItem id="F01" title="Before / After Slider" note="drag or arrow-key the handle">
        <BeforeAfter afterSrc={playbook!.image!} afterAlt="Playbook rebuild by Lauf" />
      </KitItem>

      <KitItem id="F02" title="Hover-Reveal Index" note="hover/focus a row to reveal its cover">
        <HoverIndex />
      </KitItem>

      <KitItem id="F03" title="Bento Collage" note="asymmetric mixed-size grid">
        <Bento />
      </KitItem>

      <KitItem id="F04" title="Logo Marquee" note="hover to pause">
        <LogoMarquee />
      </KitItem>

      <KitItem id="F05" title="Showreel" note="poster placeholder — no video yet">
        <Showreel />
      </KitItem>

      <KitItem id="F06" title="Sticky Split-Scroll" note="text pins while media scrolls">
        <StickySplit />
      </KitItem>

      <KitItem id="F07" title="Stacked Scroll-Cards" note="cards pile up on scroll">
        <StackCards />
      </KitItem>

      <KitItem id="F08" title="Device Mockups" note="browser + phone frames">
        <DeviceMockups />
      </KitItem>

      <KitItem id="F09" title="Polaroid Scatter" note="hover to straighten">
        <PolaroidScatter />
      </KitItem>

      <KitItem id="F10" title="Quote Spotlight" note="full-bleed band" bleed>
        <QuoteSpotlight />
      </KitItem>

      <KitItem id="F11" title="Split-Flap Board" note="flips on load — reduced-motion safe">
        <SplitFlap />
      </KitItem>

      <KitItem id="F12" title="Pinned Horizontal Gallery" note="scroll sideways through the wall">
        <PinnedGallery />
      </KitItem>

      <KitItem id="F13" title="Now / Next Board" note="studio availability">
        <NowNext />
      </KitItem>

      <KitItem id="F14" title="Cover-Flow Carousel" note="click sides or arrow-key">
        <CoverFlow />
      </KitItem>

      <KitItem id="F15" title="Magnetic Tiles" note="tiles lean toward the cursor">
        <MagneticTiles />
      </KitItem>

      <KitItem id="EXTRA" title="Tabbed Case Viewer" note="click a tab or arrow-key the tablist">
        <TabbedViewer />
      </KitItem>
    </main>
  );
}
