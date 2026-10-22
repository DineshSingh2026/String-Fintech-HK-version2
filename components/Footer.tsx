import Link from "next/link";
import { company, navLinks, serviceHref, services } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container-site py-14 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="sm:col-span-2 lg:col-span-4">
            <p className="font-heading text-lg font-semibold text-ink">{company.name}</p>
            <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-slate-500">{company.tagline}</p>
          </div>

          <nav aria-label="Services" className="lg:col-span-4">
            <h2 className="text-sm font-semibold text-ink">Services</h2>
            <ul className="mt-4 space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={serviceHref(s.slug)} className="text-[15px] text-slate-500 hover:text-ink">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company" className="lg:col-span-1">
            <h2 className="text-sm font-semibold text-ink">Company</h2>
            <ul className="mt-4 space-y-2.5">
              {[{ href: "/", label: "Home" }, ...navLinks.filter((l) => !l.href.endsWith("/services"))].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[15px] text-slate-500 hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="text-sm font-semibold text-ink">Contact</h2>
            <address className="mt-4 space-y-2.5 text-[15px] not-italic text-slate-500">
              <p>
                {company.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
              <p>
                <a href={company.phoneHref} className="hover:text-ink">
                  {company.phoneDisplay}
                </a>
              </p>
              <p>
                <a href={`mailto:${company.email}`} className="break-all hover:text-ink">
                  {company.email}
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-8">
          <p className="max-w-4xl text-[13px] leading-relaxed text-slate-500">{company.disclaimer}</p>
          <p className="mt-4 text-[13px] text-slate-500">{company.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
