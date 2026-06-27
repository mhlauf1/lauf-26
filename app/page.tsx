import { Hero } from "@/components/sections/Hero";
import { WorkReel } from "@/components/sections/WorkReel";
import { BrandReady } from "@/components/sections/BrandReady";
import { WorkGrid } from "@/components/sections/WorkGrid";
import { EmbarkBand } from "@/components/sections/EmbarkBand";
import { TabbedViewer } from "@/components/showcase/TabbedViewer";
import { PhotoCarousel } from "@/components/sections/PhotoCarousel";
import { Services } from "@/components/sections/Services";
import { StudioBand } from "@/components/sections/StudioBand";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";
import { StarDivider } from "@/components/primitives/StarDivider";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />

      <div className="mt-24">
        <WorkReel />
      </div>

      <section className="px-6 md:px-10 mt-4 md:mt-12">
        <WorkGrid />
      </section>

      <section className="px-6 md:px-10 mt-28">
        <BrandReady />
      </section>
      <div className="mt-28">
        <EmbarkBand />
      </div>

      {/* <section className="px-10 mt-24">
        <TabbedViewer />
      </section> */}

      {/* <section className="px-10">
        <PhotoCarousel />
      </section> */}

      {/* <section className="px-10">
        <Services />
      </section> */}

      <div className="bg-board px-10 py-14">
        <StarDivider tone="dark" />
      </div>

      {/* <div className="mt-20">
        <StudioBand />
      </div> */}

      {/* <TrustedBy /> */}

      <CTA />

      <Footer />
    </main>
  );
}
