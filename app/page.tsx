import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Ambient, AmbientLight } from "@/components/Ambient";
import { CtaBand } from "@/components/CtaBand";
import { FramedImage } from "@/components/FramedImage";
import { NetworkCanvas } from "@/components/NetworkCanvas";
import { Reveal } from "@/components/Reveal";
import { ServiceCard } from "@/components/ServiceCard";
import { Eyebrow, Section, SectionHeading } from "@/components/Section";
import { Ticker } from "@/components/Ticker";
import { home, images, services } from "@/lib/content";

export const metadata: Metadata = {
  title: home.seoTitle,
  description: home.metaDescription,
  alternates: { canonical: "/" },
  openGraph: { title: home.seoTitle, description: home.metaDescription, url: "/", images: [images.hero] },
};

export default function HomePage() {
  const { hero, overview, about } = home;
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-navy text-on-dark">
        {/* Imagery: slow cinematic zoom */}
        <div aria-hidden className="absolute inset-0 -z-20">
          <Image src={images.hero} alt="" fill priority loading="eager" sizes="100vw" className="ken-burns object-cover object-[70%_50%] opacity-90" />
        </div>
        <Ambient beams orbs grid={false} className="-z-10" />
        <div aria-hidden className="absolute inset-0 -z-10 opacity-70">
          <NetworkCanvas />
        </div>
        {/* Readability scrims */}
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/85 to-navy/20 lg:via-navy/70 lg:to-transparent" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-navy to-transparent" />
        <div aria-hidden className="grid-lines absolute inset-0 -z-10 opacity-60 [mask-image:linear-gradient(to_right,black,transparent_60%)]" />

        <div className="container-site flex min-h-[calc(100svh-72px)] flex-col justify-center py-20 sm:py-24 lg:py-28">
          <div className="max-w-3xl">
            <Eyebrow dark>{hero.eyebrow}</Eyebrow>
            <h1 className="mt-6 text-[40px] leading-[1.05] text-white sm:text-6xl lg:text-[72px]">
              {hero.headline.split("AI, Innovation & Technology")[0]}
              <span className="bg-gradient-to-r from-white via-[#ffb38a] to-brand bg-clip-text text-transparent">
                AI, Innovation &amp; Technology
              </span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-slate-200 sm:text-xl">{hero.subheadline}</p>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-slate-400 sm:text-base">{hero.body}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href="/services" className="btn group bg-brand-600 text-white shadow-[0_10px_30px_-10px_rgba(244,78,4,0.8)] hover:bg-brand-700">
                Explore Our Services
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
              <Link href="/contact" className="btn border border-white/25 text-white backdrop-blur hover:border-white/60 hover:bg-white/5">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Scroll cue */}
          <div aria-hidden className="mt-16 hidden items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500 lg:flex">
            <span className="relative block h-10 w-6 rounded-full border border-white/25">
              <span className="float-y absolute left-1/2 top-2 h-2 w-1 -translate-x-1/2 rounded-full bg-brand [animation-duration:2s]" />
            </span>
            Scroll
          </div>
        </div>
      </section>

      <Ticker />

      {/* EXECUTIVE OVERVIEW */}
      <Section tone="light" labelledBy="overview-heading" className="overflow-hidden" backdrop={<AmbientLight />}>
        <div className="relative grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <SectionHeading eyebrow={overview.eyebrow} title={overview.headline} id="overview-heading" />
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.1}>
            <FramedImage
              src={images.overview}
              alt="Classical stone columns transforming into a glowing digital blockchain network"
              aspect="aspect-[16/9]"
              sizes="(min-width: 1024px) 680px, 100vw"
            />
          </Reveal>
        </div>
        <div className="relative mt-16 grid gap-5 md:grid-cols-3 lg:mt-20 lg:gap-6">
          {overview.columns.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.1}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-brand/50 hover:shadow-[0_24px_50px_-24px_rgba(15,23,42,0.25)] sm:p-8">
                <span aria-hidden className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-brand to-brand/0 transition-transform duration-700 group-hover:scale-x-100" />
                <span
                  aria-hidden
                  className="absolute -right-4 -top-6 font-heading text-[120px] font-semibold leading-none text-slate-100 transition-colors duration-500 group-hover:text-brand-50"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="relative">
                  <span className="font-mono text-sm text-brand-ink">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-6 text-2xl text-ink">{c.title}</h3>
                  <p className="mt-4 text-base leading-relaxed text-slate-600">{c.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* SERVICES */}
      <section aria-labelledby="services-heading" className="relative overflow-hidden bg-navy py-20 text-on-dark sm:py-24 lg:py-32">
        <Ambient />
        <div className="container-site relative">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <Reveal>
              <SectionHeading dark eyebrow={home.services.eyebrow} title={home.services.headline} id="services-heading" />
            </Reveal>
            <Reveal delay={0.1}>
              <Link href="/services" className="btn group shrink-0 border border-white/25 text-white hover:border-brand hover:bg-white/5">
                Explore Our Services
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </Reveal>
          </div>

          <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-6">
            {services.map((s, i) => (
              <Reveal as="li" key={s.slug} delay={(i % 3) * 0.08} className={i < 2 ? "lg:col-span-3" : "lg:col-span-2"}>
                <ServiceCard service={s} featured={i < 2} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ABOUT TEASER */}
      <Section tone="light" labelledBy="about-heading" className="overflow-hidden border-t border-slate-200" backdrop={<AmbientLight />}>
        <div className="relative grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="order-2 lg:order-1 lg:col-span-6">
            <FramedImage
              src={images.hongKong}
              alt="Hong Kong Island skyline at blue hour with connected network lines between towers"
              aspect="aspect-[4/3]"
              sizes="(min-width: 1024px) 580px, 100vw"
            />
          </Reveal>
          <Reveal className="order-1 lg:order-2 lg:col-span-6" delay={0.1}>
            <SectionHeading eyebrow={about.eyebrow} title={about.headline} id="about-heading" />
            <p className="mt-6 text-lg leading-relaxed text-slate-600">{about.body}</p>
            <Link href="/about" className="btn group mt-9 bg-ink text-white hover:bg-navy-700">
              Learn More About Us
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
