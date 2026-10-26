import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroOrbit, orbitDots } from "@/components/HeroOrbit";
import { Block, BlockHeading, Kicker, ServiceList, CtaSection } from "@/components/ui";
import { about, home, images, services } from "@/lib/content";

const heroFacts = [
  { label: "Services", value: `${services.length} integrated` },
  { label: "Cloud", value: "AWS & Google" },
  { label: "Based in", value: "Hong Kong" },
];

export const metadata: Metadata = {
  title: home.seoTitle,
  description: home.metaDescription,
  alternates: { canonical: "/" },
  openGraph: { title: home.seoTitle, description: home.metaDescription, url: "/", images: [images.overview] },
};

export default function HomePage() {
  const { hero } = home;
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-white">
        {/* Cloud hub with every service in orbit, drawn straight onto the white page beside the copy. */}
        <div className="absolute inset-y-0 right-0 hidden w-1/2 lg:block">
          <div
            aria-hidden
            className="absolute inset-0 [background-size:22px_22px] [mask-image:radial-gradient(circle_at_center,black_20%,transparent_62%)]"
            style={{ backgroundImage: orbitDots }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Never taller than the window, so the whole hero fits on first view. */}
            <div style={{ width: "min(82%, 620px, calc(100svh - 150px))" }}>
              <HeroOrbit />
            </div>
          </div>
        </div>

        <div className="container-site flex flex-col justify-center pb-20 pt-14 sm:pb-24 sm:pt-20 lg:min-h-[min(calc(100svh-64px),780px)] lg:py-8">
          <div className="max-w-[36rem] lg:max-w-[calc(50%-2rem)] xl:max-w-[36rem]">
            <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm font-medium text-slate-700 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
              </span>
              {hero.eyebrow}
            </p>
            <h1 className="mt-6 text-[36px] leading-[1.05] tracking-[-0.025em] text-ink sm:text-5xl lg:mt-5 lg:text-[clamp(2.25rem,5.8svh,3.25rem)]">
              {hero.headline.slice(0, hero.headline.indexOf(hero.highlight))}
              <span className="bg-gradient-to-r from-brand-700 via-brand-600 to-[#ff7a2e] bg-clip-text text-transparent">{hero.highlight}</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-slate-600 sm:text-[17px] lg:mt-[clamp(0.875rem,2.2svh,1.5rem)] lg:text-[clamp(0.9375rem,1.95svh,1.0625rem)]">{hero.body}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row lg:mt-[clamp(1.5rem,4svh,2.5rem)]">
              <Link
                href="/services"
                className="btn group bg-brand-600 text-white shadow-[0_10px_30px_-10px_rgba(208,64,0,0.7)] hover:bg-brand-700"
              >
                Explore Our Services
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
              <Link href="/contact" className="btn border border-slate-300 bg-white text-ink hover:border-ink">
                Contact Us
              </Link>
            </div>

            {/* Quick facts drawn from the site's own content */}
            <dl className="mt-12 grid max-w-md lg:mt-[clamp(1.5rem,4.5svh,3rem)] lg:pt-5 grid-cols-3 divide-x divide-slate-200 border-t border-slate-200 pt-6">
              {heroFacts.map((f) => (
                <div key={f.label} className="px-4 first:pl-0">
                  <dt className="text-xs text-slate-500">{f.label}</dt>
                  <dd className="mt-1 font-heading text-[15px] font-semibold text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Below lg the graphic sits under the copy instead of behind it. */}
          <div className="relative mt-14 px-2 py-6 sm:px-10 lg:hidden">
            <div
              aria-hidden
              className="absolute inset-0 [background-size:20px_20px] [mask-image:radial-gradient(circle_at_center,black_20%,transparent_65%)]"
              style={{ backgroundImage: orbitDots }}
            />
            <div className="relative mx-auto max-w-md">
              <HeroOrbit compact />
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <Block labelledBy="services-heading">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Kicker>{home.services.eyebrow}</Kicker>
            <h2 id="services-heading" className="mt-3 max-w-2xl text-3xl leading-tight text-ink sm:text-4xl">
              {home.services.headline}
            </h2>
          </div>
          <Link href={"/services"} className="inline-flex items-center gap-2 text-[15px] font-medium text-brand-ink hover:underline">
            All services <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <div className="mt-12">
          <ServiceList />
        </div>
      </Block>

      {/* ABOUT */}
      <Block tone="mist" labelledBy="about-heading">
        <BlockHeading id="about-heading" kicker={home.about.eyebrow} title={home.about.headline}>
          <p>{home.about.body}</p>
          <Link href={"/about"} className="mt-6 inline-flex items-center gap-2 text-[15px] font-medium text-brand-ink hover:underline">
            Learn more about us <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </BlockHeading>
        <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
          {about.pillars.map((p) => (
            <li key={p.title} className="bg-white p-7">
              <h3 className="text-lg text-ink">{p.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{p.body}</p>
            </li>
          ))}
        </ul>
      </Block>

      <div className="border-t border-slate-200 pt-20 sm:pt-24" />
      <CtaSection />
    </>
  );
}
