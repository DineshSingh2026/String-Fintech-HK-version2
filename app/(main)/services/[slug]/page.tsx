import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Info, Receipt, Target } from "lucide-react";
import { Ambient, AmbientLight } from "@/components/Ambient";
import { CtaBand } from "@/components/CtaBand";
import { DeliveryDiagram } from "@/components/DeliveryDiagram";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section, SectionHeading } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { iconMap } from "@/components/icons";
import { getService, serviceHref, services } from "@/lib/content";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  const url = serviceHref(s.slug);
  return {
    title: s.seoTitle,
    description: s.metaDescription,
    alternates: { canonical: url },
    openGraph: { title: s.seoTitle, description: s.metaDescription, url },
  };
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const others = services.filter((o) => o.slug !== s.slug);

  return (
    <>
      <PageHero
        eyebrow={`Service ${s.number}`}
        title={s.title}
        intro={s.intro}
        image={{ src: s.image, alt: s.imageAlt }}
        crumbs={[{ href: "/", label: "Home" }, { href: "/services", label: "Services" }, { label: s.title }]}
      />

      {/* Positioning line (Cloud) */}
      {s.positioning && (
        <section aria-label="Positioning" className="border-b border-slate-200 bg-white">
          <div className="container-site py-14 sm:py-16">
            <Reveal className="relative max-w-4xl border-l-2 border-brand pl-6 sm:pl-8">
              <p className="font-heading text-xl font-medium leading-relaxed text-ink sm:text-2xl">{s.positioning}</p>
            </Reveal>
          </div>
        </section>
      )}

      {/* Markets covered (Financial) */}
      {s.markets && (
        <section aria-labelledby="markets-heading" className="border-b border-slate-200 bg-white">
          <div className="container-site flex flex-col gap-5 py-10 sm:py-12 lg:flex-row lg:items-center lg:gap-10">
            <h2 id="markets-heading" className="eyebrow shrink-0 text-brand-ink">
              Markets covered
            </h2>
            <ul className="flex flex-wrap gap-2.5">
              {s.markets.map((m) => (
                <li
                  key={m}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-mist px-4 py-2 text-sm font-medium text-ink"
                >
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand" />
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* SERVICE DELIVERY MODEL */}
      <section aria-labelledby="delivery-heading" className="relative overflow-hidden bg-navy py-20 text-on-dark sm:py-24 lg:py-28">
        <Ambient />
        <div className="container-site relative">
          <Reveal>
            <SectionHeading dark eyebrow="Delivery Model" title={s.delivery.heading} id="delivery-heading" intro={s.delivery.intro} />
          </Reveal>
          <Reveal className="mt-12 lg:mt-14" delay={0.08}>
            <DeliveryDiagram nodes={s.delivery.nodes} kind={s.delivery.kind} label={s.delivery.heading} />
          </Reveal>
        </div>
      </section>

      {/* Capabilities strip (AI Data) */}
      {s.capabilities && (
        <section aria-labelledby="capabilities-heading" className="border-b border-slate-200 bg-white py-16 sm:py-20">
          <div className="container-site">
            <h2 id="capabilities-heading" className="sr-only">
              Capabilities
            </h2>
            <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-[12px] border border-slate-200 bg-slate-200 sm:grid-cols-3 lg:grid-cols-6">
              {s.capabilities.map((c, i) => {
                const Icon = iconMap[c.icon];
                return (
                  <Reveal as="li" key={c.label} delay={i * 0.05} className="flex flex-col gap-5 bg-white p-6">
                    <Icon className="h-7 w-7 text-brand" strokeWidth={1.5} aria-hidden />
                    <span className="font-heading text-[15px] font-semibold leading-snug text-ink">{c.label}</span>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      {/* Marketing strategy (Digital Marketing) */}
      {s.strategy && (
        <Section tone="light" labelledBy="strategy-heading" className="border-b border-slate-200">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <Eyebrow>Strategy</Eyebrow>
              <h2 id="strategy-heading" className="mt-4 text-3xl leading-tight text-ink sm:text-4xl">
                {s.strategy.heading}
              </h2>
            </Reveal>
            <Reveal className="lg:col-span-7" delay={0.08}>
              <p className="text-lg leading-relaxed text-slate-600">{s.strategy.body}</p>
            </Reveal>
          </div>
        </Section>
      )}

      {/* Billing & Settlement callout (Cloud) */}
      {s.billing && (
        <section aria-labelledby="billing-heading" className="bg-white pt-16 sm:pt-20">
          <div className="container-site">
            <Reveal className="grid gap-6 rounded-[12px] border border-brand/30 bg-brand-50 p-7 sm:grid-cols-[auto_1fr] sm:gap-8 sm:p-10">
              <span className="grid h-12 w-12 place-items-center rounded-[10px] border border-brand/30 bg-white text-brand">
                <Receipt className="h-6 w-6" strokeWidth={1.6} aria-hidden />
              </span>
              <div>
                <h2 id="billing-heading" className="text-2xl text-ink">
                  {s.billing.heading}
                </h2>
                <p className="mt-3 max-w-3xl text-[17px] leading-relaxed text-slate-700">{s.billing.body}</p>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* OUR OBJECTIVE */}
      <Section tone="light" labelledBy="objective-heading" className="overflow-hidden" backdrop={<AmbientLight />}>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-[10px] border border-slate-200 bg-mist text-brand">
                <Target className="h-6 w-6" strokeWidth={1.6} aria-hidden />
              </span>
              <h2 id="objective-heading" className="text-3xl text-ink sm:text-4xl">
                Our Objective
              </h2>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-8" delay={0.08}>
            <p className="font-heading text-xl font-medium leading-relaxed text-ink sm:text-2xl sm:leading-relaxed">{s.objective}</p>
          </Reveal>
        </div>

        {s.note && (
          <p className="mt-14 flex gap-3 border-t border-slate-200 pt-6 text-[13px] leading-relaxed text-slate-500">
            <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            {s.note}
          </p>
        )}
      </Section>

      {/* Other services */}
      <section aria-labelledby="more-heading" className="relative overflow-hidden bg-navy py-20 text-on-dark sm:py-24">
        <Ambient beams={false} />
        <div className="container-site relative">
          <div className="flex items-end justify-between gap-6">
            <h2 id="more-heading" className="text-3xl text-white sm:text-4xl">
              Explore Our Services
            </h2>
            <Link href="/services" className="hidden items-center gap-2 text-sm font-semibold text-brand hover:underline sm:inline-flex">
              All Services <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => (
              <li key={o.slug}>
                <ServiceCard service={o} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
