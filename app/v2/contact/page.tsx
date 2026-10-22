import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { v2 } from "@/components/v2/links";
import { PageIntro } from "@/components/v2/ui";
import { company, contact } from "@/lib/content";

export const metadata: Metadata = {
  title: contact.seoTitle,
  description: contact.metaDescription,
};

const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(company.mapQuery)}&output=embed`;

export default function V2ContactPage() {
  const details = [
    { icon: MapPin, label: "Address", content: company.addressLines.map((l) => <span key={l} className="block">{l}</span>) },
    { icon: Phone, label: "Phone", content: <a href={company.phoneHref} className="hover:text-brand-ink">{company.phoneDisplay}</a> },
    { icon: Mail, label: "Email", content: <a href={`mailto:${company.email}`} className="break-all hover:text-brand-ink">{company.email}</a> },
  ];

  return (
    <>
      <PageIntro title={contact.headline} intro={contact.subheadline} crumbs={[{ href: v2("/"), label: "Home" }, { label: "Contact Us" }]} />

      <section aria-label="Contact details and enquiry form" className="border-t border-slate-200 bg-white py-16 sm:py-20">
        <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-16">
          <aside className="lg:col-span-4">
            <h2 className="text-xl text-ink">{company.name}</h2>
            <address className="mt-8 space-y-7 not-italic">
              {details.map(({ icon: Icon, label, content }) => (
                <div key={label} className="flex gap-4">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand" strokeWidth={1.6} aria-hidden />
                  <div>
                    <p className="text-sm text-slate-500">{label}</p>
                    <p className="mt-1 text-[15px] leading-relaxed text-ink">{content}</p>
                  </div>
                </div>
              ))}
            </address>
          </aside>

          <div className="lg:col-span-8">
            <h2 className="text-xl text-ink">Send an Enquiry</h2>
            <ContactForm />
          </div>
        </div>

        <div className="container-site mt-16">
          <iframe
            title={`Map: ${company.mapQuery}`}
            src={mapSrc}
            className="block h-[360px] w-full rounded-2xl border border-slate-200 grayscale"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}
