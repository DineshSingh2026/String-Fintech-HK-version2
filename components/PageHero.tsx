import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { Ambient } from "./Ambient";
import { Eyebrow } from "./Section";
import { FlowLines } from "./FlowLines";
import { FramedImage } from "./FramedImage";

type Crumb = { href?: string; label: string };

/**
 * Dark hero used by inner pages: breadcrumb, eyebrow, H1, optional intro.
 * `image` renders a framed visual beside the copy; `backgroundImage` sits behind it.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  image,
  backgroundImage,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  crumbs?: Crumb[];
  image?: { src: string; alt: string };
  backgroundImage?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy text-on-dark">
      {backgroundImage && (
        <div aria-hidden className="absolute inset-0 -z-20">
          <Image src={backgroundImage} alt="" fill priority loading="eager" sizes="100vw" className="ken-burns object-cover opacity-45" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/40" />
        </div>
      )}
      <Ambient className="-z-10" />
      {!image && <FlowLines className="absolute inset-y-0 right-0 -z-10 hidden h-full w-[50%] opacity-80 lg:block" />}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-brand/0 via-brand/60 to-brand/0" />

      <div className="container-site relative pb-16 pt-10 sm:pb-20 sm:pt-14 lg:pb-24 lg:pt-16">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-slate-400">
              {crumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-slate-500" aria-hidden />}
                  {c.href ? (
                    <Link href={c.href} className="hover:text-white">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-slate-300">
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <div className={image ? "grid items-center gap-14 lg:grid-cols-12 lg:gap-12" : ""}>
          <div className={image ? "lg:col-span-6" : "max-w-3xl"}>
            {eyebrow && <Eyebrow dark>{eyebrow}</Eyebrow>}
            <h1 className="mt-5 text-4xl leading-[1.08] text-white sm:text-5xl lg:text-[56px]">{title}</h1>
            {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">{intro}</p>}
            {children}
          </div>
          {image && (
            <div className="px-3 sm:px-6 lg:col-span-6 lg:px-0 lg:pl-6">
              <FramedImage src={image.src} alt={image.alt} priority sizes="(min-width: 1024px) 560px, 100vw" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
