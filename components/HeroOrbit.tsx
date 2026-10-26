import Link from "next/link";
import { Cloud } from "lucide-react";
import { serviceIcons } from "./icons";
import { serviceHref, services } from "@/lib/content";

/** Where each service sits on the orbit: angle in degrees (0 = right, clockwise) and radius in % of the square. */
const orbitSlots = [
  { slug: "cloud-infrastructure-ai", angle: -125, r: 42 },
  { slug: "ai-data-services-analytics", angle: -52, r: 42 },
  { slug: "financial-data-analytics", angle: 24, r: 38 },
  { slug: "digital-marketing-growth", angle: 95, r: 42 },
  { slug: "web3-gaming-blockchain", angle: 156, r: 38 },
];

const nodes = orbitSlots.map(({ slug, angle, r }) => {
  const rad = (angle * Math.PI) / 180;
  const x = +(50 + r * Math.cos(rad)).toFixed(2);
  const y = +(50 + r * Math.sin(rad)).toFixed(2);
  return { service: services.find((s) => s.slug === slug)!, x, y };
});

/**
 * Cloud hub with every service in orbit: beams carry data pulses from each service
 * into the hub while accent dots circle the rings. Drawn in a 100×100 space so it
 * scales with the parent's width; designed to sit on the white page.
 */
export function HeroOrbit({ compact = false }: { compact?: boolean }) {
  return (
    <div className="relative aspect-square w-full">
      <svg viewBox="0 0 100 100" aria-hidden className="absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <linearGradient id="orbit-beam" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.45" />
          </linearGradient>
          <radialGradient id="orbit-fade" cx="50%" cy="50%" r="50%">
            <stop offset="60%" stopColor="#0f172a" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.03" />
          </radialGradient>
        </defs>

        {/* Rings */}
        <circle cx="50" cy="50" r="46" fill="none" stroke="url(#orbit-fade)" strokeWidth="0.22" />
        <circle cx="50" cy="50" r="33" fill="none" stroke="#0f172a" strokeOpacity="0.16" strokeWidth="0.2" strokeDasharray="0.6 1.4" />
        <circle cx="50" cy="50" r="21" fill="none" stroke="#0f172a" strokeOpacity="0.12" strokeWidth="0.2" strokeDasharray="0.6 1.4" />

        {/* Beams from each service into the hub */}
        {nodes.map((n) => (
          <line key={n.service.slug} x1={n.x} y1={n.y} x2="50" y2="50" stroke="url(#orbit-beam)" strokeWidth="0.25" className="orbit-flow" />
        ))}

        <g className="orbit-motion">
          {/* Data pulses travelling inward */}
          {nodes.map((n, i) => (
            <g key={n.service.slug}>
              <circle r="1.6" fill="#38bdf8" opacity="0.25" />
              <circle r="0.6" fill="#0ea5e9" />
              <animateMotion dur="3.2s" begin={`${i * 0.64}s`} repeatCount="indefinite" path={`M${n.x},${n.y} L50,50`} />
            </g>
          ))}
          {/* Accent dots circling the rings */}
          <g>
            <circle r="2.4" fill="#f97316" opacity="0.2" />
            <circle r="0.9" fill="#f44e04" />
            <animateMotion dur="26s" repeatCount="indefinite" path="M50,4 a46,46 0 1,1 -0.01,0" />
          </g>
          <g>
            <circle r="1.8" fill="#38bdf8" opacity="0.25" />
            <circle r="0.7" fill="#0ea5e9" />
            <animateMotion dur="18s" repeatCount="indefinite" path="M50,83 a33,33 0 1,1 0.01,0" />
          </g>
        </g>
      </svg>

      {/* Hub */}
      <div aria-hidden className="absolute inset-[26%] rounded-full bg-sky-300/35 blur-3xl" />
      <div aria-hidden className="absolute inset-[36%] translate-x-[18%] translate-y-[18%] rounded-full bg-orange-300/25 blur-3xl" />
      <div aria-hidden className="pulse-out absolute left-1/2 top-1/2 aspect-square w-[22%] rounded-[28%] border border-sky-400/50" />
      <div aria-hidden className="pulse-out absolute left-1/2 top-1/2 aspect-square w-[22%] rounded-[28%] border border-sky-400/50 [animation-delay:-2s]" />
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 grid aspect-square w-[22%] -translate-x-1/2 -translate-y-1/2 place-items-center overflow-hidden rounded-[28%] bg-gradient-to-br from-[#5ee7f0] via-[#3fb4f3] to-[#3b6ff6] shadow-[0_28px_60px_-14px_rgba(37,99,235,0.6),inset_0_1px_0_rgba(255,255,255,0.5)] ring-1 ring-white/60"
      >
        <span className="absolute inset-x-[8%] top-[5%] h-[42%] rounded-[40%] bg-gradient-to-b from-white/45 to-transparent" />
        <Cloud className="relative h-[44%] w-[44%] text-white drop-shadow-[0_4px_10px_rgba(15,40,90,0.35)]" fill="white" strokeWidth={0} />
      </div>

      {/* Services */}
      <ul aria-label="Our services">
        {nodes.map(({ service: s, x, y }, i) => {
          const Icon = serviceIcons[s.slug];
          return (
            <li key={s.slug} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%`, top: `${y}%` }}>
              <Link
                href={serviceHref(s.slug)}
                style={{ animationDelay: `${i * -1.3}s` }}
                className={`float-soft group flex items-center whitespace-nowrap border border-slate-200/80 bg-white/90 text-ink shadow-[0_14px_34px_-14px_rgba(15,23,42,0.28)] backdrop-blur-md transition-[border-color,box-shadow] hover:border-brand/40 hover:shadow-[0_18px_40px_-14px_rgba(244,78,4,0.35)] ${
                  compact ? "gap-2 rounded-xl py-1.5 pl-1.5 pr-3" : "gap-3 rounded-2xl py-2 pl-2 pr-4"
                }`}
              >
                <span
                  className={`grid shrink-0 place-items-center bg-gradient-to-br from-brand to-[#ff9a4d] text-white shadow-[0_4px_14px_-4px_rgba(244,78,4,0.8)] ${
                    compact ? "h-6 w-6 rounded-lg" : "h-9 w-9 rounded-xl"
                  }`}
                >
                  <Icon className={compact ? "h-3.5 w-3.5" : "h-[18px] w-[18px]"} strokeWidth={2} aria-hidden />
                </span>
                <span className="text-left leading-tight">
                  {!compact && <span className="block text-[10px] font-medium uppercase tracking-[0.14em] text-slate-400">Service {s.number}</span>}
                  <span className={`block font-semibold ${compact ? "text-[11px]" : "text-[14px]"}`}>{s.shortTitle}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** Faint dot grid laid behind the orbit. */
export const orbitDots = "radial-gradient(rgba(15,23,42,0.09) 1px, transparent 1px)";
