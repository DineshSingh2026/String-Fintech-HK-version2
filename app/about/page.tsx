import type { Metadata } from "next";
import { BrainCircuit, Puzzle, Sprout, Workflow } from "lucide-react";
import { AmbientLight } from "@/components/Ambient";
import { CtaBand } from "@/components/CtaBand";
import { FramedImage } from "@/components/FramedImage";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { about, images } from "@/lib/content";

export const metadata: Metadata = {
  title: about.seoTitle,
  description: about.metaDescription,
  alternates: { canonical: "/about" },
  openGraph: { title: about.seoTitle, description: about.metaDescription, url: "/about" },
};

const pillarIcons = [Workflow, Puzzle, BrainCircuit, Sprout];

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow={about.eyebrow} title={about.headline} backgroundImage={images.hongKong} crumbs={[{ href: "/", label: "Home" }, { label: "About Us" }]} />

      <Section tone="light" className="overflow-hidden" backdrop={<AmbientLight />}>
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="px-3 sm:px-6 lg:col-span-5 lg:px-0">
            <FramedImage
              src={images.overview}
              alt="Classical stone columns transforming into a glowing digital network"
              aspect="aspect-[4/5]"
              sizes="(min-width: 1024px) 460px, 100vw"
            />
          </Reveal>
          <div className="space-y-6 lg:col-span-7">
            <Reveal>
              <div aria-hidden className="h-px w-16 bg-brand" />
              <p className="eyebrow mt-5 text-brand-ink">Information Technology Consulting</p>
            </Reveal>
            {about.body.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className={i === 0 ? "font-heading text-xl font-medium leading-relaxed text-ink sm:text-2xl sm:leading-relaxed" : "text-lg leading-relaxed text-slate-600"}>
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="mist" labelledBy="pillars-heading" className="border-y border-slate-200">
        <h2 id="pillars-heading" className="sr-only">
          Our value pillars
        </h2>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {about.pillars.map((p, i) => {
            const Icon = pillarIcons[i];
            return (
              <Reveal as="li" key={p.title} delay={i * 0.06}>
                <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-brand/50 hover:shadow-[0_24px_50px_-24px_rgba(15,23,42,0.25)]">
                  <span aria-hidden className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-brand to-brand/0 transition-transform duration-700 group-hover:scale-x-100" />
                  <div className="flex items-start justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-[10px] border border-slate-200 bg-mist text-brand group-hover:border-brand/40 group-hover:bg-brand-50">
                      <Icon className="h-6 w-6" strokeWidth={1.6} aria-hidden />
                    </span>
                    <span className="font-mono text-sm tracking-[0.14em] text-slate-500">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-8 text-xl text-ink">{p.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{p.body}</p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </Section>

      <CtaBand />
    </>
  );
}
