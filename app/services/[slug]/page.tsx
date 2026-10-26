import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowRight } from "lucide-react";
import { CloudCapabilities, CloudCommercials } from "@/components/CloudSections";
import { ServiceArt } from "@/components/ServiceArt";
import { iconMap } from "@/components/icons";
import { Block, BlockHeading, PageIntro, ServiceList, CtaSection } from "@/components/ui";
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
  const steps = s.delivery.nodes;

  return (
    <>
      <PageIntro
        kicker={`Service ${s.number}`}
        title={s.title}
        intro={s.intro}
        art={<ServiceArt slug={s.slug} />}
        crumbs={[{ href: "/", label: "Home" }, { href: "/services", label: "Services" }, { label: s.title }]}
      >
        {s.markets && (
          <ul aria-label="Markets covered" className="mt-8 flex flex-wrap gap-2">
            {s.markets.map((m) => (
              <li key={m} className="rounded-full border border-slate-200 px-3.5 py-1.5 text-sm text-slate-700">
                {m}
              </li>
            ))}
          </ul>
        )}
      </PageIntro>

      {s.positioning && (
        <Block>
          <p className="max-w-4xl border-l-2 border-brand pl-6 font-heading text-xl font-medium leading-relaxed text-ink sm:text-2xl">
            {s.positioning}
          </p>
        </Block>
      )}

      {s.details && (
        <Block labelledBy="details-heading">
          <BlockHeading id="details-heading" kicker="Overview" title="How We Help">
            {s.details.map((p) => (
              <p key={p} className="mt-5 first:mt-0">
                {p}
              </p>
            ))}
          </BlockHeading>
        </Block>
      )}

      {s.cloud && <CloudCapabilities cloud={s.cloud} />}

      {/* DELIVERY MODEL: plain numbered steps */}
      <Block tone="mist" labelledBy="delivery-heading">
        <BlockHeading id="delivery-heading" kicker="Delivery Model" title={s.delivery.heading}>
          {s.delivery.intro && <p>{s.delivery.intro}</p>}
        </BlockHeading>
        <ol
          className={`mt-14 grid gap-4 ${steps.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"} ${steps.length === 4 ? "md:grid-cols-2" : ""}`}
        >
          {steps.map((n, i) => {
            const Icon = iconMap[n.icon];
            const last = i === steps.length - 1;
            return (
              <li key={n.id} className="relative">
                <div className={`flex h-full flex-col rounded-2xl border bg-white p-7 ${n.core ? "border-brand" : "border-slate-200"}`}>
                  <div className="flex items-center justify-between">
                    <span className={`grid h-11 w-11 place-items-center rounded-full ${n.core ? "bg-brand-600 text-white" : "bg-mist text-brand"}`}>
                      <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden />
                    </span>
                    <span className="text-sm text-slate-400">Step {i + 1}</span>
                  </div>
                  <h3 className="mt-6 text-lg leading-snug text-ink">{n.title}</h3>
                  {n.subtitle && <p className="mt-1 text-sm font-medium text-brand-ink">{n.subtitle}</p>}
                  <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{n.description}</p>
                </div>
                {!last && (
                  <span aria-hidden className="flex justify-center py-1 text-slate-300 lg:hidden">
                    <ArrowDown className="h-5 w-5" />
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </Block>

      {s.capabilities && (
        <Block labelledBy="capabilities-heading">
          <BlockHeading id="capabilities-heading" kicker="Capabilities" title="What we deliver" />
          <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-3">
            {s.capabilities.map((c) => {
              const Icon = iconMap[c.icon];
              return (
                <li key={c.label} className="flex items-center gap-4 bg-white p-6">
                  <Icon className="h-6 w-6 shrink-0 text-brand" strokeWidth={1.5} aria-hidden />
                  <span className="font-medium text-ink">{c.label}</span>
                </li>
              );
            })}
          </ul>
        </Block>
      )}

      {s.cloud && <CloudCommercials cloud={s.cloud} billingBody={s.billing?.body} />}

      {s.billing && !s.cloud && (
        <Block labelledBy="billing-heading">
          <BlockHeading id="billing-heading" kicker="Commercials" title={s.billing.heading}>
            <p>{s.billing.body}</p>
          </BlockHeading>
        </Block>
      )}

      <Block tone="mist" labelledBy="more-heading">
        <div className="flex items-end justify-between gap-6">
          <h2 id="more-heading" className="text-3xl text-ink">
            Other services
          </h2>
          <Link href={"/services"} className="hidden items-center gap-2 text-[15px] font-medium text-brand-ink hover:underline sm:inline-flex">
            All services <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <div className="mt-10">
          <ServiceList items={others} />
        </div>
      </Block>

      <div className="pt-20 sm:pt-24" />
      <CtaSection />
    </>
  );
}
