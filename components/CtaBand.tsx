import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ctaBand, images } from "@/lib/content";
import { Ambient } from "./Ambient";
import { Reveal } from "./Reveal";
import { FlowLines } from "./FlowLines";

export function CtaBand() {
  return (
    <section aria-labelledby="cta-heading" className="relative isolate overflow-hidden border-b border-white/10 bg-navy text-on-dark">
      <div aria-hidden className="absolute inset-0 -z-10">
        <Image src={images.hero} alt="" fill sizes="100vw" className="ken-burns object-cover object-right opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/30" />
      </div>
      <Ambient grid={false} className="-z-10" />
      <FlowLines className="absolute inset-y-0 right-0 -z-10 hidden h-full w-1/2 opacity-60 md:block" />
      <div className="container-site relative py-24 sm:py-28 lg:py-32">
        <Reveal className="max-w-2xl">
          <div aria-hidden className="mb-6 flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="pulse-ring absolute inset-0 rounded-full bg-brand" />
              <span className="relative h-3 w-3 rounded-full bg-brand" />
            </span>
            <span className="h-px w-12 bg-brand" />
          </div>
          <h2 id="cta-heading" className="text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
            {ctaBand.headline}
          </h2>
          <p className="mt-5 text-lg text-slate-300">{ctaBand.body}</p>
          <Link href="/contact" className="btn group mt-9 bg-brand-600 text-white shadow-[0_10px_30px_-10px_rgba(244,78,4,0.8)] hover:bg-brand-700">
            Get in Touch
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
