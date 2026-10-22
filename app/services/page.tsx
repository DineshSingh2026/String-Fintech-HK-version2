import type { Metadata } from "next";
import { PageIntro, ServiceList, CtaSection } from "@/components/ui";
import { home } from "@/lib/content";

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
      <PageIntro
        kicker={home.services.eyebrow}
        title={home.services.headline}
        intro={home.metaDescription}
        crumbs={[{ href: "/", label: "Home" }, { label: "Services" }]}
      />
      <section aria-label="All services" className="bg-white pb-20 sm:pb-24">
        <div className="container-site">
          <ServiceList />
        </div>
      </section>
      <CtaSection />
    </>
  );
}
