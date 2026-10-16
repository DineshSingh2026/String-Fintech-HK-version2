import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { company, serviceHref, services } from "@/lib/content";

const companyLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy text-on-dark">
      <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="container-site relative pb-10 pt-16 lg:pt-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="sm:col-span-2 lg:col-span-4">
            <p className="font-heading text-xl font-semibold text-white">{company.name}</p>
            <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-slate-400">{company.tagline}</p>
            <div aria-hidden className="mt-8 h-px w-16 bg-brand" />
          </div>

          <nav aria-label="Company" className="lg:col-span-2">
            <h2 className="eyebrow text-slate-400">Company</h2>
            <ul className="mt-5 space-y-3">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[15px] text-slate-300 transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services" className="lg:col-span-3">
            <h2 className="eyebrow text-slate-400">Services</h2>
            <ul className="mt-5 space-y-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={serviceHref(s.slug)} className="text-[15px] text-slate-300 transition-colors hover:text-white">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="sm:col-span-2 lg:col-span-3">
            <h2 className="eyebrow text-slate-400">Contact</h2>
            <address className="mt-5 space-y-4 text-[15px] not-italic text-slate-300">
              <p className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
                <span>
                  {company.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </p>
              <p className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
                <a href={company.phoneHref} className="hover:text-white">
                  {company.phoneDisplay}
                </a>
              </p>
              <p className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
                <a href={`mailto:${company.email}`} className="break-all hover:text-white">
                  {company.email}
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8">
          <p className="max-w-4xl text-[13px] leading-relaxed text-slate-400">{company.disclaimer}</p>
          <p className="mt-6 text-[13px] text-slate-400">{company.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
