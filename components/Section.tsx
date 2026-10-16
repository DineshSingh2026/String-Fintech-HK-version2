import type { ReactNode } from "react";

type Tone = "light" | "mist" | "dark";

const toneClass: Record<Tone, string> = {
  light: "bg-white text-ink",
  mist: "bg-mist text-ink",
  dark: "bg-navy text-on-dark",
};

export function Section({
  tone = "light",
  id,
  className = "",
  children,
  labelledBy,
  backdrop,
}: {
  tone?: Tone;
  id?: string;
  className?: string;
  children: ReactNode;
  labelledBy?: string;
  /** Full-bleed decorative layer rendered behind the content container. */
  backdrop?: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`relative py-20 sm:py-24 lg:py-28 ${toneClass[tone]} ${className}`}>
      {backdrop}
      <div className="container-site relative">{children}</div>
    </section>
  );
}

export function Eyebrow({ children, dark = false, className = "" }: { children: ReactNode; dark?: boolean; className?: string }) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${dark ? "text-brand" : "text-brand-ink"} ${className}`}>
      <span aria-hidden className="h-px w-6 bg-brand" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  id,
  dark = false,
  intro,
  className = "",
}: {
  eyebrow?: string;
  title: string;
  id?: string;
  dark?: boolean;
  intro?: string;
  className?: string;
}) {
  return (
    <div className={`max-w-3xl ${className}`}>
      {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
      <h2 id={id} className={`mt-4 text-3xl leading-[1.15] sm:text-4xl lg:text-[44px] ${dark ? "text-white" : "text-ink"}`}>
        {title}
      </h2>
      {intro && <p className={`mt-5 text-lg leading-relaxed ${dark ? "text-slate-300" : "text-slate-600"}`}>{intro}</p>}
    </div>
  );
}
