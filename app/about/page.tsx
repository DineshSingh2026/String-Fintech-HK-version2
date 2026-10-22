import type { Metadata } from "next";
import { Block, PageIntro, CtaSection } from "@/components/ui";
import { about } from "@/lib/content";

export const metadata: Metadata = {
  title: about.seoTitle,
  description: about.metaDescription,
  alternates: { canonical: "/about" },
  openGraph: { title: about.seoTitle, description: about.metaDescription, url: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageIntro kicker={about.eyebrow} title={about.headline} crumbs={[{ href: "/", label: "Home" }, { label: "About Us" }]} />

      <Block>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          <p className="font-heading text-2xl font-medium leading-snug text-ink lg:col-span-7">{about.body[0]}</p>
          <p className="text-lg leading-relaxed text-slate-600 lg:col-span-5">{about.body[1]}</p>
        </div>
      </Block>

      <Block tone="mist" labelledBy="pillars-heading">
        <h2 id="pillars-heading" className="text-3xl text-ink sm:text-4xl">
          How we work
        </h2>
        <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {about.pillars.map((p, i) => (
            <li key={p.title} className="border-t-2 border-ink pt-6">
              <span className="text-sm text-slate-400">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 text-xl text-ink">{p.title}</h3>
              <p className="mt-3 text-[16px] leading-relaxed text-slate-600">{p.body}</p>
            </li>
          ))}
        </ul>
      </Block>

      <div className="border-t border-slate-200 pt-20 sm:pt-24" />
      <CtaSection />
    </>
  );
}
