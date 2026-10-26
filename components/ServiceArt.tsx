import type { ReactNode } from "react";
import {
  Bitcoin,
  Cloud,
  Coins,
  DatabaseZap,
  Gamepad2,
  Globe,
  Link2,
  MousePointerClick,
  Search,
  Server,
  ShieldCheck,
  Share2,
  TrendingUp,
  BrainCircuit,
  type LucideIcon,
} from "lucide-react";

/*
 * Light product-style illustrations, one per service. Each scene is an SVG drawn in a
 * 400×300 space (matching the 4:3 frame) with a few HTML tags floated on top at the
 * large size. Tag labels come from each service's own copy in lib/content.ts.
 */

type Tag = { icon: LucideIcon; label: string; className: string };

const SLATE = { line: "#e2e8f0", soft: "#f1f5f9", faint: "#f8fafc", ink: "#0f172a", muted: "#94a3b8" };

/** Shared defs: soft card shadow. */
function Defs({ id, children }: { id: string; children?: ReactNode }) {
  return (
    <defs>
      <filter id={`${id}-sh`} x="-30%" y="-30%" width="160%" height="170%">
        <feDropShadow dx="0" dy="8" stdDeviation="9" floodColor="#0f172a" floodOpacity="0.12" />
      </filter>
      {children}
    </defs>
  );
}

function Card({ id, x, y, w, h, r = 16 }: { id: string; x: number; y: number; w: number; h: number; r?: number }) {
  return <rect x={x} y={y} width={w} height={h} rx={r} fill="#fff" stroke={SLATE.line} filter={`url(#${id}-sh)`} />;
}

/* ---------- Financial Data Analytics: market dashboard ---------- */
function FinancialScene({ id }: { id: string }) {
  const closes = [196, 188, 192, 178, 183, 168, 160, 166, 150, 141, 146, 128];
  const xs = closes.map((_, i) => 82 + i * 22);
  const ma = closes.map((c, i) => `${xs[i]},${c + 6}`).join(" ");
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" style={{ fontFamily: "inherit" }}>
      <Defs id={id}>
        <linearGradient id={`${id}-area`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-coin`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6ee7b7" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </Defs>

      <Card id={id} x={52} y={42} w={300} h={200} />
      <circle cx={74} cy={66} r={5} fill="#10b981" />
      <text x={86} y={70} fontSize={11} fontWeight={600} fill={SLATE.ink}>
        Market Overview
      </text>
      <rect x={292} y={57} width={42} height={18} rx={9} fill="#ecfdf5" />
      <circle cx={303} cy={66} r={2.5} fill="#10b981" />
      <text x={318} y={70} fontSize={9.5} fontWeight={600} fill="#059669" textAnchor="middle">
        Live
      </text>
      {[104, 144, 184].map((y) => (
        <line key={y} x1={70} x2={334} y1={y} y2={y} stroke={SLATE.soft} />
      ))}

      <polygon points={`${xs[0]},${closes[0] + 6} ${ma} ${xs[11]},${222} ${xs[0]},${222}`} fill={`url(#${id}-area)`} />
      <polyline points={ma} fill="none" stroke="#10b981" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
      {closes.map((c, i) => {
        const open = i === 0 ? 202 : closes[i - 1];
        const up = c < open;
        const top = Math.min(c, open);
        const h = Math.max(Math.abs(c - open), 3);
        const color = up ? "#10b981" : "#fb7185";
        return (
          <g key={i}>
            <line x1={xs[i]} x2={xs[i]} y1={top - 7} y2={top + h + 6} stroke={color} strokeWidth={1.2} />
            <rect x={xs[i] - 5} y={top} width={10} height={h} rx={2} fill={color} />
          </g>
        );
      })}

      {/* Market split */}
      <Card id={id} x={14} y={196} w={108} h={78} r={14} />
      <circle cx={46} cy={235} r={17} fill="none" stroke={SLATE.soft} strokeWidth={8} />
      <circle cx={46} cy={235} r={17} fill="none" stroke="#10b981" strokeWidth={8} strokeDasharray="52 107" transform="rotate(-90 46 235)" />
      <circle cx={46} cy={235} r={17} fill="none" stroke="#f97316" strokeWidth={8} strokeDasharray="30 107" strokeDashoffset={-52} transform="rotate(-90 46 235)" />
      <circle cx={46} cy={235} r={17} fill="none" stroke="#38bdf8" strokeWidth={8} strokeDasharray="15 107" strokeDashoffset={-82} transform="rotate(-90 46 235)" />
      {[
        ["#10b981", 222],
        ["#f97316", 234],
        ["#38bdf8", 246],
      ].map(([c, y]) => (
        <g key={y}>
          <rect x={72} y={(y as number) - 3} width={7} height={7} rx={2} fill={c as string} />
          <rect x={83} y={(y as number) - 1.5} width={26} height={4} rx={2} fill={SLATE.line} />
        </g>
      ))}

      {/* Gain tile */}
      <Card id={id} x={300} y={14} w={86} h={58} r={14} />
      <circle cx={322} cy={43} r={12} fill={`url(#${id}-coin)`} />
      <polyline points="316,46 321,40 325,44 329,38" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <rect x={340} y={33} width={34} height={6} rx={3} fill={SLATE.ink} opacity={0.85} />
      <rect x={340} y={45} width={24} height={5} rx={2.5} fill="#a7f3d0" />
    </svg>
  );
}

/* ---------- Cloud Infrastructure: cloud feeding servers ---------- */
function CloudScene({ id }: { id: string }) {
  const servers = [104, 200, 296];
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full">
      <Defs id={id}>
        <linearGradient id={`${id}-cloud`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a5e9ff" />
          <stop offset="55%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
        </radialGradient>
      </Defs>

      <ellipse cx={200} cy={100} rx={150} ry={80} fill={`url(#${id}-glow)`} />

      {/* Links */}
      {servers.map((x) => (
        <path key={x} d={`M200,134 C200,160 ${x},150 ${x},184`} fill="none" stroke="#38bdf8" strokeOpacity={0.55} strokeWidth={1.6} strokeDasharray="4 5" />
      ))}
      <g className="orbit-motion">
        {servers.map((x, i) => (
          <circle key={x} r={3.2} fill="#0ea5e9">
            <animateMotion dur="2.4s" begin={`${i * 0.5}s`} repeatCount="indefinite" path={`M200,134 C200,160 ${x},150 ${x},184`} />
          </circle>
        ))}
      </g>

      {/* Cloud */}
      <g filter={`url(#${id}-sh)`}>
        <g fill={`url(#${id}-cloud)`}>
          <circle cx={162} cy={104} r={32} />
          <circle cx={206} cy={84} r={44} />
          <circle cx={250} cy={108} r={28} />
          <rect x={134} y={104} width={142} height={34} rx={17} />
        </g>
      </g>
      <ellipse cx={196} cy={70} rx={30} ry={12} fill="#fff" opacity={0.35} />
      <path d="M186,112 l10,-12 l10,12 M196,100 v24" stroke="#fff" strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round" />

      {/* Servers */}
      {servers.map((x) => (
        <g key={x}>
          <Card id={id} x={x - 44} y={184} w={88} h={84} r={14} />
          {[0, 1, 2].map((r) => (
            <g key={r}>
              <rect x={x - 32} y={198 + r * 21} width={64} height={14} rx={5} fill={SLATE.faint} stroke={SLATE.soft} />
              <circle cx={x - 23} cy={205 + r * 21} r={2.8} fill={r === 1 ? "#f97316" : "#10b981"} />
              <rect x={x - 14} y={203.5 + r * 21} width={28} height={3} rx={1.5} fill={SLATE.line} />
            </g>
          ))}
        </g>
      ))}
    </svg>
  );
}

/* ---------- AI Data Services: sources → AI → dashboard ---------- */
function AiDataScene({ id }: { id: string }) {
  const sources = [78, 150, 222];
  const nodes = [
    [178, 132],
    [178, 168],
    [200, 120],
    [200, 150],
    [200, 180],
    [222, 138],
    [222, 162],
  ];
  const edges = [
    [0, 2], [0, 3], [0, 4], [1, 2], [1, 3], [1, 4],
    [2, 5], [2, 6], [3, 5], [3, 6], [4, 5], [4, 6],
  ];
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full">
      <Defs id={id}>
        <linearGradient id={`${id}-tile`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a5b4fc" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
        <linearGradient id={`${id}-bar`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#c7d2fe" />
        </linearGradient>
      </Defs>

      {/* Flows */}
      {sources.map((y) => (
        <path key={y} d={`M84,${y} C122,${y} 128,150 150,150`} fill="none" stroke="#818cf8" strokeOpacity={0.5} strokeWidth={1.6} strokeDasharray="4 5" />
      ))}
      <path d="M250,150 L276,150" stroke="#818cf8" strokeOpacity={0.5} strokeWidth={1.6} strokeDasharray="4 5" />
      <g className="orbit-motion">
        {sources.map((y, i) => (
          <circle key={y} r={3} fill="#6366f1">
            <animateMotion dur="2.6s" begin={`${i * 0.6}s`} repeatCount="indefinite" path={`M84,${y} C122,${y} 128,150 150,150`} />
          </circle>
        ))}
      </g>

      {/* Databases */}
      {sources.map((y) => (
        <g key={y} filter={`url(#${id}-sh)`}>
          <path d={`M40,${y - 14} v28 a22,7 0 0 0 44,0 v-28`} fill="#fff" stroke={SLATE.line} />
          <ellipse cx={62} cy={y - 14} rx={22} ry={7} fill="#e0e7ff" stroke="#c7d2fe" />
          <path d={`M40,${y} a22,7 0 0 0 44,0`} fill="none" stroke={SLATE.line} />
        </g>
      ))}

      {/* AI tile */}
      <g filter={`url(#${id}-sh)`}>
        <rect x={150} y={100} width={100} height={100} rx={28} fill={`url(#${id}-tile)`} />
      </g>
      <rect x={160} y={104} width={80} height={36} rx={18} fill="#fff" opacity={0.22} />
      {edges.map(([a, b], i) => (
        <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="#fff" strokeOpacity={0.55} strokeWidth={1.2} />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={4.5} fill="#fff" />
      ))}

      {/* Dashboard */}
      <Card id={id} x={276} y={64} w={110} h={172} r={16} />
      <rect x={290} y={80} width={46} height={6} rx={3} fill={SLATE.ink} opacity={0.85} />
      <rect x={290} y={92} width={30} height={4} rx={2} fill={SLATE.line} />
      {[38, 56, 44, 70, 62].map((h, i) => (
        <rect key={i} x={292 + i * 17} y={170 - h} width={11} height={h} rx={3} fill={`url(#${id}-bar)`} />
      ))}
      <line x1={290} x2={372} y1={172} y2={172} stroke={SLATE.soft} />
      <polyline points="292,218 310,208 328,212 346,196 370,190" fill="none" stroke="#f97316" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={370} cy={190} r={3.5} fill="#f97316" />
    </svg>
  );
}

/* ---------- Digital Marketing: browser with funnel + growth ---------- */
function MarketingScene({ id }: { id: string }) {
  const pts = "214,196 236,186 258,190 280,168 302,160 326,132 340,118";
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full">
      <Defs id={id}>
        <linearGradient id={`${id}-f`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fb7185" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
        <linearGradient id={`${id}-area`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fb7185" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#fb7185" stopOpacity="0" />
        </linearGradient>
      </Defs>

      <Card id={id} x={36} y={40} w={316} h={216} />
      <line x1={36} x2={352} y1={72} y2={72} stroke={SLATE.soft} />
      {["#fb7185", "#fbbf24", "#34d399"].map((c, i) => (
        <circle key={c} cx={56 + i * 12} cy={56} r={4} fill={c} />
      ))}
      <rect x={106} y={49} width={176} height={14} rx={7} fill={SLATE.faint} stroke={SLATE.soft} />

      {/* Funnel */}
      <polygon points="74,92 186,92 170,124 90,124" fill={`url(#${id}-f)`} opacity={0.95} />
      <polygon points="94,130 166,130 154,160 106,160" fill={`url(#${id}-f)`} opacity={0.75} />
      <polygon points="110,166 150,166 143,194 117,194" fill={`url(#${id}-f)`} opacity={0.55} />
      <rect x={124} y={198} width={12} height={20} rx={4} fill="#f97316" />
      <circle cx={130} cy={232} r={6} fill="#f97316" opacity={0.25} />
      <circle cx={130} cy={232} r={3} fill="#f97316" />

      {/* Growth chart */}
      {[110, 150, 190].map((y) => (
        <line key={y} x1={206} x2={340} y1={y} y2={y} stroke={SLATE.soft} />
      ))}
      <polygon points={`214,206 ${pts} 340,206`} fill={`url(#${id}-area)`} />
      <polyline points={pts} fill="none" stroke="#fb7185" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
      {pts.split(" ").map((p) => {
        const [x, y] = p.split(",").map(Number);
        return <circle key={p} cx={x} cy={y} r={3} fill="#fff" stroke="#fb7185" strokeWidth={1.8} />;
      })}
      {[0, 1, 2].map((i) => (
        <rect key={i} x={214 + i * 44} y={220} width={36} height={18} rx={6} fill={SLATE.faint} stroke={SLATE.soft} />
      ))}

      {/* Target badge */}
      <g filter={`url(#${id}-sh)`}>
        <circle cx={350} cy={56} r={30} fill="#fff" stroke={SLATE.line} />
      </g>
      <circle cx={350} cy={56} r={20} fill="none" stroke="#fecdd3" strokeWidth={5} />
      <circle cx={350} cy={56} r={11} fill="none" stroke="#fb7185" strokeWidth={5} />
      <circle cx={350} cy={56} r={3.5} fill="#f43f5e" />
      <path d="M374,32 L352,54 M374,32 l-8,1 M374,32 l-1,8" stroke={SLATE.ink} strokeWidth={2.2} strokeLinecap="round" fill="none" />
    </svg>
  );
}

/* ---------- Web3 Gaming & Blockchain: NFT + token over a block chain ---------- */
function Web3Scene({ id }: { id: string }) {
  const cube = (cx: number, cy: number, s: number) => ({
    top: `${cx},${cy - s} ${cx + s},${cy - s / 2} ${cx},${cy} ${cx - s},${cy - s / 2}`,
    left: `${cx - s},${cy - s / 2} ${cx},${cy} ${cx},${cy + s} ${cx - s},${cy + s / 2}`,
    right: `${cx},${cy} ${cx + s},${cy - s / 2} ${cx + s},${cy + s / 2} ${cx},${cy + s}`,
  });
  const blocks = [96, 200, 304];
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full">
      <Defs id={id}>
        <linearGradient id={`${id}-art`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fdba74" />
          <stop offset="100%" stopColor="#fb7185" />
        </linearGradient>
        <linearGradient id={`${id}-coin`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
        <linearGradient id={`${id}-tile`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffb36b" />
          <stop offset="100%" stopColor="#f44e04" />
        </linearGradient>
      </Defs>

      {/* Links to the hub */}
      <path d="M128,104 C160,104 160,118 172,118" fill="none" stroke="#fb923c" strokeOpacity={0.55} strokeWidth={1.6} strokeDasharray="4 5" />
      <path d="M300,96 C262,96 248,118 228,118" fill="none" stroke="#fb923c" strokeOpacity={0.55} strokeWidth={1.6} strokeDasharray="4 5" />
      <path d="M200,170 L200,196" stroke="#fb923c" strokeOpacity={0.55} strokeWidth={1.6} strokeDasharray="4 5" />

      {/* Chain */}
      <line x1={blocks[0]} x2={blocks[2]} y1={232} y2={232} stroke="#fdba74" strokeWidth={3} strokeDasharray="10 6" strokeLinecap="round" />
      {blocks.map((x) => {
        const c = cube(x, 228, 28);
        return (
          <g key={x} filter={`url(#${id}-sh)`}>
            <polygon points={c.left} fill="#fb923c" />
            <polygon points={c.right} fill="#f97316" />
            <polygon points={c.top} fill="#fed7aa" />
          </g>
        );
      })}

      {/* NFT card */}
      <Card id={id} x={30} y={36} w={98} h={122} r={14} />
      <rect x={40} y={46} width={78} height={66} rx={10} fill={`url(#${id}-art)`} />
      <circle cx={98} cy={64} r={8} fill="#fff" opacity={0.8} />
      <polygon points="40,112 66,82 84,100 96,90 118,112" fill="#fff" opacity={0.45} />
      <rect x={40} y={122} width={44} height={6} rx={3} fill={SLATE.ink} opacity={0.85} />
      <rect x={40} y={136} width={28} height={5} rx={2.5} fill={SLATE.line} />
      <rect x={94} y={132} width={24} height={12} rx={6} fill="#fff7ed" stroke="#fed7aa" />

      {/* Token */}
      <g filter={`url(#${id}-sh)`}>
        <circle cx={330} cy={96} r={34} fill={`url(#${id}-coin)`} />
      </g>
      <circle cx={330} cy={96} r={25} fill="none" stroke="#fff" strokeOpacity={0.6} strokeWidth={2} />
      <polygon points="330,78 342,96 330,114 318,96" fill="#fff" opacity={0.9} />
      <polygon points="330,78 342,96 330,101" fill="#fff" opacity={0.6} />

      {/* Hub tile */}
      <g filter={`url(#${id}-sh)`}>
        <rect x={160} y={78} width={80} height={80} rx={24} fill={`url(#${id}-tile)`} />
      </g>
      <rect x={168} y={82} width={64} height={28} rx={14} fill="#fff" opacity={0.25} />
    </svg>
  );
}

const scenes: Record<string, { Scene: (p: { id: string }) => ReactNode; tags: Tag[]; hub?: LucideIcon }> = {
  "financial-data-analytics": {
    Scene: FinancialScene,
    tags: [
      { icon: TrendingUp, label: "Equities", className: "left-[34%] top-[85%]" },
      { icon: Globe, label: "Foreign Exchange", className: "left-[55%] top-[85%]" },
      { icon: Bitcoin, label: "Cryptocurrency", className: "left-[4%] top-[5%]" },
    ],
  },
  "cloud-infrastructure-ai": {
    Scene: CloudScene,
    tags: [
      { icon: Cloud, label: "AWS & Google Cloud", className: "left-[4%] top-[8%]" },
      { icon: Server, label: "Migration", className: "right-[5%] top-[12%]" },
      { icon: ShieldCheck, label: "Managed Services", className: "left-[3%] top-[47%]" },
    ],
  },
  "ai-data-services-analytics": {
    Scene: AiDataScene,
    tags: [
      { icon: DatabaseZap, label: "Data Integration", className: "left-[4%] top-[3%]" },
      { icon: BrainCircuit, label: "AI Analytics", className: "left-[38%] top-[76%]" },
      { icon: TrendingUp, label: "Predictive Insights", className: "right-[3%] top-[83%]" },
    ],
  },
  "digital-marketing-growth": {
    Scene: MarketingScene,
    tags: [
      { icon: Search, label: "SEO", className: "left-[3%] top-[44%]" },
      { icon: MousePointerClick, label: "PPC Advertising", className: "left-[8%] top-[84%]" },
      { icon: Share2, label: "Social Media", className: "right-[4%] top-[84%]" },
    ],
  },
  "web3-gaming-blockchain": {
    Scene: Web3Scene,
    hub: Gamepad2,
    tags: [
      { icon: Link2, label: "Blockchain", className: "left-[39%] top-[88%]" },
      { icon: Coins, label: "NFTs", className: "right-[6%] top-[46%]" },
    ],
  },
};

/** Illustration for a service. `sm` is the thumbnail used in service lists (no floating tags). */
export function ServiceArt({ slug, size = "lg" }: { slug: string; size?: "lg" | "sm" }) {
  const { Scene, tags, hub: Hub } = scenes[slug];
  const lg = size === "lg";
  return (
    <div
      aria-hidden
      className={`relative h-full w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 ${lg ? "rounded-3xl" : "rounded-2xl"}`}
    >
      <div
        className="absolute inset-0 [background-image:radial-gradient(rgba(15,23,42,0.07)_1px,transparent_1px)] [mask-image:radial-gradient(circle_at_center,black_30%,transparent_75%)]"
        style={{ backgroundSize: lg ? "18px 18px" : "12px 12px" }}
      />
      <div className={`absolute inset-0 ${lg ? "p-2" : "p-1"}`}>
        <Scene id={`${slug}-${size}`} />
      </div>
      {Hub && (
        // Matches the hub tile drawn at (160,78)-(240,158) in the Web3 scene.
        <div className="absolute left-1/2 top-[39.3%] grid h-[17%] w-[13%] -translate-x-1/2 -translate-y-1/2 place-items-center">
          <Hub className="h-full w-full text-white" strokeWidth={1.8} />
        </div>
      )}
      {lg &&
        tags.map(({ icon: TagIcon, label, className }, i) => (
          <span
            key={label}
            style={{ animationDelay: `${i * -2}s` }}
            className={`float-soft absolute flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-slate-200/80 bg-white/95 py-1 pl-1 pr-2.5 text-[12px] font-semibold text-ink shadow-[0_8px_22px_-10px_rgba(15,23,42,0.3)] ${className}`}
          >
            <span className="grid h-5 w-5 place-items-center rounded-md bg-slate-50">
              <TagIcon className="h-3 w-3 text-brand" strokeWidth={2.2} />
            </span>
            {label}
          </span>
        ))}
    </div>
  );
}
