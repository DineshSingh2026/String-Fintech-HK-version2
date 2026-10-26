import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { ServiceArt } from "@/components/ServiceArt";
import { ctaBand, serviceHref, services, type Service } from "@/lib/content";

export function Kicker({ children }: { children: ReactNode }) {
  return <p className="text-sm font-medium text-brand-ink">{children}</p>;
}

/** Page opener: plain white, large type, optional breadcrumb. */
export function PageIntro({
  kicker,
  title,
  intro,
  crumbs,
  art,
  children,
}: {
  kicker?: string;
  title: string;
  intro?: string;
  crumbs?: { href?: string; label: string }[];
  /** Optional illustration shown beside the copy on large screens, below it on small ones. */
  art?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="bg-white pb-16 pt-14 sm:pb-20 sm:pt-20">
      <div className="container-site">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
              {crumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden>/</span>}
                  {c.href ? (
                    <Link href={c.href} className="hover:text-ink">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-ink">
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <div className={art ? "grid items-center gap-12 lg:grid-cols-12 lg:gap-14" : ""}>
          <div className={art ? "lg:col-span-7" : "max-w-3xl"}>
            {kicker && <Kicker>{kicker}</Kicker>}
            <h1 className="mt-4 text-4xl leading-[1.1] text-ink sm:text-5xl">{title}</h1>
            {intro && (
              <p className={`mt-6 leading-relaxed text-slate-600 ${art ? "text-lg" : "text-lg sm:text-xl sm:leading-relaxed"}`}>{intro}</p>
            )}
            {children}
          </div>
          {art && (
            <div className="relative lg:col-span-5">
              <div aria-hidden className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-slate-200/60 to-transparent blur-2xl" />
              <div className="relative aspect-[4/3] rounded-3xl shadow-[0_24px_50px_-28px_rgba(15,23,42,0.35)] ring-1 ring-slate-900/[0.06]">
                {art}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function Block({
  children,
  tone = "white",
  labelledBy,
  className = "",
}: {
  children: ReactNode;
  tone?: "white" | "mist";
  labelledBy?: string;
  className?: string;
}) {
  return (
    <section
      aria-labelledby={labelledBy}
      className={`border-t border-slate-200 py-20 sm:py-24 ${tone === "mist" ? "bg-mist" : "bg-white"} ${className}`}
    >
      <div className="container-site">{children}</div>
    </section>
  );
}

/** Two-column section heading: title on the left, optional supporting copy on the right. */
export function BlockHeading({ id, kicker, title, children }: { id: string; kicker?: string; title: string; children?: ReactNode }) {
  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-5">
        {kicker && <Kicker>{kicker}</Kicker>}
        <h2 id={id} className="mt-3 text-3xl leading-tight text-ink sm:text-4xl">
          {title}
        </h2>
      </div>
      {children && <div className="text-lg leading-relaxed text-slate-600 lg:col-span-7 lg:pt-9">{children}</div>}
    </div>
  );
}

/** Services as a clean, scannable list of rows. */
export function ServiceList({ items = services }: { items?: Service[] }) {
  return (
    <ul className="divide-y divide-slate-200 border-y border-slate-200">
      {items.map((s) => {
        return (
          <li key={s.slug}>
            <Link href={serviceHref(s.slug)} className="group grid gap-5 py-8 sm:grid-cols-[14rem_1fr_auto] sm:items-center sm:gap-8">
              <span className="block aspect-[16/9] rounded-2xl ring-1 ring-slate-900/[0.06] transition-shadow duration-300 group-hover:shadow-[0_16px_32px_-18px_rgba(15,23,42,0.35)] sm:aspect-[4/3]">
                <ServiceArt slug={s.slug} size="sm" />
              </span>
              <span className="block">
                <span className="block text-sm text-slate-400">{s.number}</span>
                <span className="mt-1 block font-heading text-xl font-semibold text-ink transition-colors group-hover:text-brand-ink sm:text-2xl">
                  {s.title}
                </span>
                <span className="mt-2 block max-w-2xl text-[16px] leading-relaxed text-slate-600">{s.summary}</span>
              </span>
              <span className="hidden h-12 items-center text-slate-400 transition-all group-hover:translate-x-1 group-hover:text-brand-ink sm:flex">
                <ArrowRight className="h-5 w-5" aria-hidden />
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function CtaSection() {
  return (
    <section aria-labelledby="cta-heading" className="bg-white pb-20 sm:pb-24">
      <div className="container-site">
        <div className="flex flex-col items-start justify-between gap-8 rounded-2xl bg-mist px-7 py-12 sm:px-12 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <h2 id="cta-heading" className="text-3xl leading-tight text-ink">
              {ctaBand.headline}
            </h2>
            <p className="mt-3 text-lg text-slate-600">{ctaBand.body}</p>
          </div>
          <Link href={"/contact"} className="btn group shrink-0 bg-brand-600 text-white hover:bg-brand-700">
            Contact Us
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
