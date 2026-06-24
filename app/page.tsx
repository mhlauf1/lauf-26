import { Hero } from "@/components/sections/Hero";
import { CardStrip } from "@/components/sections/CardStrip";
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

      <section className="mt-16 px-10">
        <CardStrip />
      </section>

      <div className="my-24">
        <StarDivider />
      </div>

      <section className="px-10">
        <WorkGrid />
      </section>

      <div className="mt-28">
        <EmbarkBand />
      </div>

      <div className="my-24">
        <StarDivider />
      </div>

      <section className="px-10">
        <TabbedViewer />
      </section>

      <div className="my-24">
        <StarDivider />
      </div>

      <section className="px-10">
        <PhotoCarousel />
      </section>

      <section className="px-10">
        <Services />
      </section>

      <div className="mt-28">
        <StudioBand />
      </div>

      <TrustedBy />

      <CTA />

      <Footer />
    </main>
  );
}
