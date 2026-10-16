import { keywords } from "@/lib/content";

/** Continuous keyword marquee. Pauses on hover; static under reduced motion. */
export function Ticker() {
  const items = [...keywords, ...keywords];
  return (
    <div className="marquee-wrap relative overflow-hidden border-y border-white/10 bg-navy-800 py-5">
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-navy-800 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-navy-800 to-transparent" />
      <ul className="marquee flex w-max items-center">
        {items.map((k, i) => (
          <li
            key={`${k}-${i}`}
            aria-hidden={i >= keywords.length}
            className="flex items-center gap-8 whitespace-nowrap pr-8 font-mono text-[13px] uppercase tracking-[0.18em] text-slate-300"
          >
            <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-brand" />
            {k}
          </li>
        ))}
      </ul>
    </div>
  );
}
