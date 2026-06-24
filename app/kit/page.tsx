import { KitItem } from "@/components/kit/KitItem";
import { StarMark } from "@/components/primitives/StarMark";
import { Hero } from "@/components/sections/Hero";
import { BeforeAfter } from "@/components/showcase/BeforeAfter";
import { LogoMarquee } from "@/components/showcase/LogoMarquee";
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
          you want, and we&rsquo;ll compose the homepage from your choices.
        </p>
      </div>

      <KitItem id="SECTION" title="Hero" note="static" bleed>
        <Hero />
      </KitItem>

      <KitItem
        id="01"
        title="Before / After Slider"
        note="drag or arrow-key the handle"
      >
        <BeforeAfter
          afterSrc={playbook!.image!}
          afterAlt="Playbook rebuild by Lauf"
        />
      </KitItem>

      <KitItem id="04" title="Logo Marquee" note="hover to pause">
        <LogoMarquee />
      </KitItem>
    </main>
  );
}
