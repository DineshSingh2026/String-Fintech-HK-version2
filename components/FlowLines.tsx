const paths = [
  "M0 60 C 160 60, 220 140, 380 140 S 600 90, 720 90",
  "M0 150 C 140 150, 240 220, 400 220 S 610 170, 720 170",
  "M0 240 C 180 240, 230 180, 380 180 S 580 260, 720 260",
  "M0 320 C 150 320, 260 280, 420 280 S 620 330, 720 330",
];

const junctions: [number, number][] = [
  [380, 140],
  [400, 220],
  [380, 180],
  [420, 280],
];

/** Decorative data-flow lines (abstract, aria-hidden). Dashes animate via CSS and stop under reduced motion. */
export function FlowLines({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 720 380" preserveAspectRatio="xMaxYMid slice" className={`pointer-events-none ${className}`} fill="none">
      <defs>
        <linearGradient id="fl-fade" x1="0" x2="1">
          <stop offset="0" stopColor="#F44E04" stopOpacity="0" />
          <stop offset="0.5" stopColor="#F44E04" stopOpacity="0.55" />
          <stop offset="1" stopColor="#F44E04" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      {paths.map((d, i) => (
        <g key={d}>
          <path d={d} stroke="rgb(226 232 240 / 0.08)" strokeWidth="1" />
          <path d={d} stroke="url(#fl-fade)" strokeWidth="1.25" className="flow-line" style={{ animationDuration: `${1.4 + i * 0.35}s` }} />
        </g>
      ))}
      {junctions.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3" fill="#0B1220" stroke="#F44E04" strokeWidth="1.25" />
      ))}
    </svg>
  );
}
