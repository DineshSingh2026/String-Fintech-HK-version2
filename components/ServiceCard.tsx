import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { serviceHref, type Service } from "@/lib/content";
import { serviceIcons } from "./icons";

/**
 * Image-led service card. The entire card is a single link, so "Read More" (and
 * anywhere else on the card) always navigates.
 */
export function ServiceCard({
  service,
  featured = false,
  headingLevel = "h3",
}: {
  service: Service;
  featured?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  const Icon = serviceIcons[service.slug];
  const H = headingLevel;
  return (
    <Link
      href={serviceHref(service.slug)}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-navy-800 text-left transition-all duration-500 hover:-translate-y-1 hover:border-brand/60 hover:shadow-[0_30px_60px_-20px_rgba(244,78,4,0.35)] focus-visible:border-brand"
    >
      {/* Image */}
      <div className={`relative overflow-hidden ${featured ? "aspect-[16/9]" : "aspect-[16/10]"}`}>
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          sizes={featured ? "(min-width: 1024px) 600px, 100vw" : "(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"}
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-800 via-navy-800/20 to-transparent" />
        {/* scanning line on hover */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px -translate-y-full bg-gradient-to-r from-transparent via-brand to-transparent opacity-0 transition-all duration-[1400ms] ease-out group-hover:translate-y-[400px] group-hover:opacity-100"
        />
        <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-navy/60 px-3 py-1 font-mono text-[11px] tracking-[0.16em] text-white backdrop-blur">
          {service.number}
        </span>
        <span className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-navy/60 text-white backdrop-blur transition-all duration-500 group-hover:rotate-45 group-hover:border-brand group-hover:bg-brand-600">
          <ArrowUpRight className="h-5 w-5" aria-hidden />
        </span>
      </div>

      {/* Body */}
      <div className="relative flex flex-1 flex-col p-6 sm:p-7">
        <span className="absolute -top-6 left-6 grid h-12 w-12 place-items-center rounded-xl border border-brand/40 bg-navy text-brand shadow-[0_8px_24px_-8px_rgba(244,78,4,0.6)] sm:left-7">
          <Icon className="h-6 w-6" strokeWidth={1.6} aria-hidden />
        </span>
        <H className={`mt-6 leading-snug text-white ${featured ? "text-2xl sm:text-[26px]" : "text-xl"}`}>{service.title}</H>
        <p className="mt-3 flex-1 text-[15px] leading-relaxed text-slate-400">{service.summary}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand">
          Read More
          <span aria-hidden className="relative block h-px w-6 overflow-hidden bg-brand/40">
            <span className="absolute inset-y-0 left-0 w-full -translate-x-full bg-brand transition-transform duration-500 group-hover:translate-x-0" />
          </span>
          <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
  );
}
