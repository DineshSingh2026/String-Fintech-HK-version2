import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Block, BlockHeading, Kicker, ServiceList, CtaSection } from "@/components/ui";
import { about, home, images } from "@/lib/content";

export const metadata: Metadata = {
  title: home.seoTitle,
  description: home.metaDescription,
  alternates: { canonical: "/" },
  openGraph: { title: home.seoTitle, description: home.metaDescription, url: "/", images: [images.overview] },
};

export default function HomePage() {
  const { hero, overview } = home;
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-white">
        {/* The page's single image: traditional finance (columns) becoming a digital network,
            echoing the "Connecting the Digital Economy with Trusted Financial Services" message.
            It fades to transparent on the left so the copy sits on plain white. */}
        <div
          aria-hidden
          className="absolute inset-y-0 right-0 -z-10 hidden w-1/2 [mask-image:linear-gradient(to_right,transparent,black_55%)] lg:block"
        >
          <Image src={images.overview} alt="" fill priority sizes="50vw" className="object-cover object-[30%_50%]" />
        </div>

        <div className="container-site flex min-h-[calc(100svh-100px)] flex-col justify-center pb-20 pt-16 sm:pb-24 sm:pt-24 lg:py-28">
          <div className="max-w-[34rem]">
            <Kicker>{hero.eyebrow}</Kicker>
            <h1 className="mt-5 text-[40px] leading-[1.06] text-ink sm:text-6xl">
              {hero.headline.split("AI, Innovation & Technology")[0]}
              <span className="text-brand-600">AI, Innovation &amp; Technology</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-slate-600 sm:text-xl sm:leading-relaxed">{hero.body}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href={"/services"} className="btn group bg-brand-600 text-white hover:bg-brand-700">
                Explore Our Services
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
              <Link href={"/contact"} className="btn border border-slate-300 text-ink hover:border-ink">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Below lg the image sits under the copy instead of behind it. */}
          <div aria-hidden className="relative mt-14 aspect-[16/9] overflow-hidden rounded-2xl lg:hidden">
            <Image src={images.overview} alt="" fill sizes="100vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* EXECUTIVE OVERVIEW */}
      <Block tone="mist" labelledBy="overview-heading">
        <BlockHeading id="overview-heading" kicker={overview.eyebrow} title={overview.headline} />
        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {overview.columns.map((c, i) => (
            <div key={c.title} className="border-t-2 border-ink pt-6">
              <span className="text-sm text-slate-400">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 text-xl text-ink">{c.title}</h3>
              <p className="mt-3 text-[16px] leading-relaxed text-slate-600">{c.body}</p>
            </div>
          ))}
        </div>
      </Block>

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
