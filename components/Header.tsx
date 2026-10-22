"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/content";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <div className="container-site flex h-16 items-center justify-between gap-6">
          <Link href={"/"} className="inline-flex shrink-0 items-center" aria-label="String FinTech — Home">
            <Image src="/string-fintech-logo.png" alt="String FinTech HK Limited" width={223} height={55} priority className="h-8 w-auto" />
          </Link>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-8">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={pathname === l.href ? "page" : undefined}
                    className={`text-[15px] transition-colors hover:text-ink ${isActive(l.href) ? "font-medium text-ink" : "text-slate-500"}`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link href={"/contact"} className="btn hidden min-h-10 bg-ink py-2 text-sm text-white hover:bg-slate-700 md:inline-flex">
              Get in Touch
            </Link>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-lg text-ink md:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
            </button>
          </div>
        </div>

        <nav id="mobile-nav" aria-label="Mobile" hidden={!open} className="border-t border-slate-200 bg-white md:hidden">
          <ul className="container-site py-3">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="block py-3 text-lg font-medium text-ink">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
}
