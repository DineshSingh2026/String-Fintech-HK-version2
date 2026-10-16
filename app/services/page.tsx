import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AmbientLight } from "@/components/Ambient";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { serviceIcons } from "@/components/icons";
import { home, images, serviceHref, services } from "@/lib/content";

// No dedicated SEO copy was supplied for this page; title/description reuse approved copy.
const title = "Our Services | String FinTech HK Ltd.";
const description = home.metaDescription;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services" },
  openGraph: { title, description, url: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow={home.services.eyebrow}
        title={home.services.headline}
        backgroundImage={images.hero}
        crumbs={[{ href: "/", label: "Home" }, { label: "Services" }]}
      />

      <Section tone="light" className="overflow-hidden" backdrop={<AmbientLight />}>
        <h2 className="sr-only">All services</h2>
        <ul className="space-y-20 lg:space-y-28">
          {services.map((s, i) => {
            const Icon = serviceIcons[s.slug];
            const flip = i % 2 === 1;
            return (
              <li key={s.slug}>
                <Link href={serviceHref(s.slug)} className="group grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
                  <Reveal className={`relative lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
                    <div aria-hidden className="absolute -inset-4 rounded-[28px] bg-brand/10 opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100" />
                    <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-slate-200 bg-navy">
                      <Image
                        src={s.image}
                        alt={s.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 680px, 100vw"
                        className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                      />
                      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
                      <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-navy/60 px-3 py-1 font-mono text-[11px] tracking-[0.16em] text-white backdrop-blur">
                        {s.number}
                      </span>
                    </div>
                  </Reveal>
                  <Reveal className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`} delay={0.1}>
                    <div className="flex items-center gap-4">
                      <span className="grid h-12 w-12 place-items-center rounded-xl border border-slate-200 bg-mist text-brand transition-colors group-hover:border-brand/40 group-hover:bg-brand-50">
                        <Icon className="h-6 w-6" strokeWidth={1.6} aria-hidden />
                      </span>
                      <span className="font-mono text-sm tracking-[0.14em] text-brand-ink">SERVICE {s.number}</span>
                    </div>
                    <h3 className="mt-6 text-3xl leading-tight text-ink transition-colors group-hover:text-brand-ink sm:text-4xl">{s.title}</h3>
                    <p className="mt-5 text-lg leading-relaxed text-slate-600">{s.summary}</p>
                    <span className="btn mt-8 bg-ink text-white transition-colors group-hover:bg-brand-600">
                      Read More
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                    </span>
                  </Reveal>
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>

      <CtaBand />
    </>
  );
}
