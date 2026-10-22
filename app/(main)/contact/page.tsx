import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { company, contact, images } from "@/lib/content";

export const metadata: Metadata = {
  title: contact.seoTitle,
  description: contact.metaDescription,
  alternates: { canonical: "/contact" },
  openGraph: { title: contact.seoTitle, description: contact.metaDescription, url: "/contact" },
};

const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(company.mapQuery)}&output=embed`;

export default function ContactPage() {
  return (
    <>
      <PageHero title={contact.headline} intro={contact.subheadline} backgroundImage={images.hongKong} crumbs={[{ href: "/", label: "Home" }, { label: "Contact Us" }]} />

      <section aria-label="Contact details and enquiry form" className="bg-mist py-16 sm:py-20 lg:py-24">
        <div className="container-site grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Contact details card */}
          <aside className="relative overflow-hidden rounded-[12px] bg-navy p-7 text-on-dark sm:p-9 lg:col-span-5">
            <div aria-hidden className="grid-lines absolute inset-0 opacity-60" />
            <div className="relative">
              <h2 className="text-2xl text-white">{company.name}</h2>
              <div aria-hidden className="mt-5 h-px w-12 bg-brand" />
              <address className="mt-8 space-y-7 not-italic">
                <div className="flex gap-4">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-brand" aria-hidden />
                  <div>
                    <p className="eyebrow text-slate-400">Address</p>
                    <p className="mt-2 text-[15px] leading-relaxed text-slate-200">
                      {company.addressLines.map((l) => (
                        <span key={l} className="block">
                          {l}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Phone className="mt-1 h-5 w-5 shrink-0 text-brand" aria-hidden />
                  <div>
                    <p className="eyebrow text-slate-400">Phone</p>
                    <a href={company.phoneHref} className="mt-2 block text-[15px] text-slate-200 hover:text-white">
                      {company.phoneDisplay}
                    </a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Mail className="mt-1 h-5 w-5 shrink-0 text-brand" aria-hidden />
                  <div>
                    <p className="eyebrow text-slate-400">Email</p>
                    <a href={`mailto:${company.email}`} className="mt-2 block break-all text-[15px] text-slate-200 hover:text-white">
                      {company.email}
                    </a>
                  </div>
                </div>
              </address>
            </div>
          </aside>

          {/* Enquiry form */}
          <div className="rounded-[12px] border border-slate-200 bg-white p-7 sm:p-9 lg:col-span-7">
            <h2 className="text-2xl text-ink">Send an Enquiry</h2>
            <ContactForm />
          </div>

          {/* Map */}
          <div className="overflow-hidden rounded-[12px] border border-slate-200 bg-white lg:col-span-12">
            <iframe
              title={`Map: ${company.mapQuery}`}
              src={mapSrc}
              className="block h-[360px] w-full grayscale-[35%] sm:h-[420px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
