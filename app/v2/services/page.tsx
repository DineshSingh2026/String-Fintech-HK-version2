import type { Metadata } from "next";
import { v2 } from "@/components/v2/links";
import { PageIntro, ServiceList, V2Cta } from "@/components/v2/ui";
import { home } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Services | String FinTech HK Ltd.",
  description: home.metaDescription,
};

export default function V2ServicesPage() {
  return (
    <>
      <PageIntro
        kicker={home.services.eyebrow}
        title={home.services.headline}
        intro={home.metaDescription}
        crumbs={[{ href: v2("/"), label: "Home" }, { label: "Services" }]}
      />
      <section aria-label="All services" className="bg-white pb-20 sm:pb-24">
        <div className="container-site">
          <ServiceList />
        </div>
      </section>
      <V2Cta />
    </>
  );
}
