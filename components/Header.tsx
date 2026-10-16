"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { serviceIcons } from "./icons";
import { serviceHref, services } from "@/lib/content";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services", dropdown: true },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on navigation.
  useEffect(() => {
    setMenuOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  // Lock page scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!menuOpen && !mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (menuOpen) {
        setMenuOpen(false);
        triggerRef.current?.focus();
      }
      setMobileOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (menuOpen && dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [menuOpen, mobileOpen]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  const openMenu = () => {
    window.clearTimeout(closeTimer.current);
    setMenuOpen(true);
  };
  const scheduleClose = () => {
    closeTimer.current = window.setTimeout(() => setMenuOpen(false), 120);
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85 transition-shadow ${
        scrolled ? "border-slate-200 shadow-[0_1px_0_rgba(15,23,42,0.04)]" : "border-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <div className="container-site flex h-[72px] items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {links.map((l) =>
              l.dropdown ? (
                <li key={l.href} ref={dropdownRef} className="relative"
                  onMouseEnter={openMenu}
                  onMouseLeave={scheduleClose}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setMenuOpen(false);
                  }}
                >
                  <div className="flex items-center">
                    <Link
                      href={l.href}
                      className={`rounded-md py-2 pl-3 pr-1 text-[15px] font-medium transition-colors hover:text-brand-ink ${
                        isActive(l.href) ? "text-brand-ink" : "text-slate-700"
                      }`}
                      aria-current={pathname === l.href ? "page" : undefined}
                    >
                      {l.label}
                    </Link>
                    <button
                      ref={triggerRef}
                      type="button"
                      aria-expanded={menuOpen}
                      aria-controls="services-menu"
                      aria-label="Show services"
                      onClick={() => setMenuOpen((v) => !v)}
                      className="rounded-md p-1.5 text-slate-500 hover:text-brand-ink"
                    >
                      <ChevronDown className={`h-4 w-4 transition-transform ${menuOpen ? "rotate-180" : ""}`} aria-hidden />
                    </button>
                  </div>
                  <div
                    id="services-menu"
                    hidden={!menuOpen}
                    className="absolute left-1/2 top-full w-[440px] -translate-x-1/2 pt-3"
                  >
                    <ul className="rounded-[12px] border border-slate-200 bg-white p-2 shadow-[0_12px_40px_-12px_rgba(15,23,42,0.18)]">
                      {services.map((s) => {
                        const Icon = serviceIcons[s.slug];
                        const href = serviceHref(s.slug);
                        return (
                          <li key={s.slug}>
                            <Link
                              href={href}
                              aria-current={pathname === href ? "page" : undefined}
                              className="group flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-mist focus-visible:bg-mist"
                            >
                              <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-slate-200 bg-white text-brand group-hover:border-brand/40">
                                <Icon className="h-[18px] w-[18px]" aria-hidden />
                              </span>
                              <span>
                                <span className="block font-mono text-[11px] tracking-[0.14em] text-slate-500">{s.number}</span>
                                <span className="block text-[15px] font-semibold leading-snug text-ink">{s.title}</span>
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                      <li className="mt-1 border-t border-slate-100 pt-1">
                        <Link
                          href="/services"
                          className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold text-brand-ink hover:bg-mist"
                        >
                          All Services
                          <ArrowRight className="h-4 w-4" aria-hidden />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              ) : (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={pathname === l.href ? "page" : undefined}
                    className={`rounded-md px-3 py-2 text-[15px] font-medium transition-colors hover:text-brand-ink ${
                      isActive(l.href) ? "text-brand-ink" : "text-slate-700"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/contact" className="btn hidden bg-brand-600 text-white hover:bg-brand-700 sm:inline-flex">
            Get in Touch
          </Link>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-lg border border-slate-200 text-ink lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        hidden={!mobileOpen}
        className="fixed inset-x-0 bottom-0 top-[72px] overflow-y-auto border-t border-slate-200 bg-white lg:hidden"
      >
        <nav aria-label="Mobile" className="container-site py-6">
          <ul className="divide-y divide-slate-100">
            {links.map((l) =>
              l.dropdown ? (
                <li key={l.href} className="py-1">
                  <div className="flex items-center justify-between">
                    <Link href={l.href} className="block py-3 text-lg font-semibold text-ink">
                      {l.label}
                    </Link>
                    <button
                      type="button"
                      aria-expanded={mobileServicesOpen}
                      aria-controls="mobile-services"
                      aria-label="Show services"
                      onClick={() => setMobileServicesOpen((v) => !v)}
                      className="grid h-11 w-11 place-items-center rounded-lg text-slate-600"
                    >
                      <ChevronDown className={`h-5 w-5 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} aria-hidden />
                    </button>
                  </div>
                  <ul id="mobile-services" hidden={!mobileServicesOpen} className="mb-3 space-y-1 border-l border-brand/40 pl-4">
                    {services.map((s) => (
                      <li key={s.slug}>
                        <Link href={serviceHref(s.slug)} className="flex gap-3 py-2.5 text-[15px] text-slate-700">
                          <span className="font-mono text-xs leading-6 text-brand-ink">{s.number}</span>
                          {s.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={l.href} className="py-1">
                  <Link
                    href={l.href}
                    aria-current={pathname === l.href ? "page" : undefined}
                    className={`block py-3 text-lg font-semibold ${isActive(l.href) ? "text-brand-ink" : "text-ink"}`}
                  >
                    {l.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
          <Link href="/contact" className="btn mt-6 w-full bg-brand-600 text-white hover:bg-brand-700">
            Get in Touch
          </Link>
        </nav>
      </div>
    </header>
  );
}
