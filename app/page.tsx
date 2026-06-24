import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { StarMark } from "@/components/primitives/StarMark";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />

      <div className="mt-32 border-t border-line px-10 py-16">
        <div className="flex items-baseline gap-2">
          <p className="font-serif text-2xl font-light">
            The full homepage gets composed from the kit.
          </p>
          <StarMark className="text-lg" />
        </div>
        <Link
          href="/kit"
          className="mt-4 inline-block text-sm font-medium text-ink underline decoration-line underline-offset-4"
        >
          Browse the component kit →
        </Link>
      </div>
    </main>
  );
}
