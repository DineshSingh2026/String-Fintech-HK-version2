"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { flushSync } from "react-dom";
import { Cloud } from "lucide-react";
import { ServiceArt } from "./ServiceArt";
import { serviceIcons } from "./icons";
import { services } from "@/lib/content";

/*
 * Cinematic 21s company intro: the String FinTech brand, then the cloud, then each
 * service as a full-frame slide, then a closing shot. Driven entirely by a time value
 * `t` so it can be rendered frame-by-frame into public/video/string-intro*.mp4
 * (see scripts/render-intro.mjs). Open /render/intro to preview it live.
 */

export const INTRO = { size: 1200, duration: 21, fps: 30 };

const S = INTRO.size;
const DUR = INTRO.duration;
const R = 430; // floor ring radius
const FLOOR_Y = 300;
const CLOUD_Y = -110;
/** Act 1: the String FinTech brand on its own. */
const BRAND_OUT = 4.0;
/** Act 2: the cloud rises in. */
const CLOUD_IN = 3.6;
/** Act 3: one full-frame slide per service. */
const SPOT0 = 6.4;
const SPOT = 2.4;
const SPOT_END = SPOT0 + SPOT * services.length;

/** Three short highlights per service, drawn from each service's copy in lib/content.ts. */
const highlights: Record<string, string[]> = {
  "cloud-infrastructure-ai": ["AWS & Google Cloud", "Migration & modernization", "Managed services"],
  "web3-gaming-blockchain": ["Cloud-hosted gaming", "Blockchain economies", "Digital asset ownership"],
  "ai-data-services-analytics": ["Data integration", "Predictive modeling", "Data visualization"],
  "digital-marketing-growth": ["SEO & AEO", "Social & influencer", "Agentic media"],
  "financial-data-analytics": ["Equities · FX · Commodities", "Real-time analytics", "Custom dashboards"],
};

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, p: number) => a + (b - a) * p;
const prog = (t: number, a: number, b: number) => clamp((t - a) / (b - a));
const inOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const out = (x: number) => 1 - Math.pow(1 - x, 3);
const expo = (x: number) => (x >= 1 ? 1 : 1 - Math.pow(2, -10 * x));
const fade = (t: number, a: number, b: number, c: number, d: number) => Math.min(out(prog(t, a, b)), 1 - inOut(prog(t, c, d)));

const HEADING = "font-heading";
const GRAD: CSSProperties = {
  background: "linear-gradient(90deg, #b23700, #d04000, #ff7a2e)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
};
const BRAND_GRAD = "linear-gradient(135deg, #f44e04, #ff9a4d)";

/** Frame geometry shared by the full-frame layers: u is 1px at 1080p. */
type Frame = { W: number; H: number; u: number; land: boolean };

function camera(t: number) {
  const p = inOut(prog(t, CLOUD_IN, SPOT0 + 0.2));
  return {
    yaw: lerp(32, -6, p),
    zoom: lerp(-1100, 80, p),
    tilt: lerp(8, -12, p),
    lift: lerp(0, -40, p),
  };
}

export function IntroStage() {
  const [t, setT] = useState(0);
  const [frameSize, setFrameSize] = useState({ w: S, h: S });
  const renderMode = useRef(false);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    renderMode.current = q.has("render");
    // Output frame size: square by default, ?w=1920&h=1080 for widescreen, ?w=1080&h=1920 for portrait.
    setFrameSize({ w: Number(q.get("w")) || S, h: Number(q.get("h")) || S });
    const w = window as unknown as {
      __seek?: (t: number) => void;
      __ready?: boolean;
    };
    if (renderMode.current) {
      w.__seek = (time: number) => {
        flushSync(() => setT(time));
        // Keep nested CSS/SVG animations in step with the frame being captured.
        document.getAnimations().forEach((a) => {
          a.pause();
          a.currentTime = time * 1000;
        });
        document.querySelectorAll("svg").forEach((svg) => {
          svg.pauseAnimations?.();
          svg.setCurrentTime?.(time);
        });
      };
      // Only report ready once the real brand fonts (not their fallbacks) have loaded.
      const brandFontsLoaded = () =>
        [...document.fonts].some((f) => f.family.includes("Inter Tight") && !f.family.includes("Fallback") && f.status === "loaded");
      document.fonts.ready.then(() => {
        const check = () => (brandFontsLoaded() ? (w.__ready = true) : setTimeout(check, 200));
        check();
      });
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      setT(((now - start) / 1000) % DUR);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const { w: W, h: H } = frameSize;
  const frame: Frame = { W, H, u: Math.min(W, H) / 1080, land: W / H > 1.15 };
  const cam = camera(t);
  const grainSeed = Math.floor(t * INTRO.fps) % 9;

  // The cloud act is composed in an S×S square, scaled to fit and centred in the output frame.
  const k = Math.min(W, H) / S;
  const stage: CSSProperties = {
    position: "fixed",
    left: 0,
    top: 0,
    width: W,
    height: H,
    zIndex: 200,
    overflow: "hidden",
  };
  const square: CSSProperties = {
    position: "absolute",
    left: (W - S * k) / 2,
    top: (H - S * k) / 2,
    width: S,
    height: S,
    transform: `scale(${k})`,
    transformOrigin: "0 0",
  };
  const worldOpacity = out(prog(t, CLOUD_IN, CLOUD_IN + 1)) * (1 - inOut(prog(t, SPOT0 - 0.45, SPOT0 + 0.05)));
  const world: CSSProperties = {
    position: "absolute",
    left: S / 2,
    top: S / 2,
    transformStyle: "preserve-3d",
    transform: `translateY(${cam.lift}px) translateZ(${cam.zoom}px) rotateX(${cam.tilt}deg) rotateY(${cam.yaw}deg)`,
  };

  return (
    <div style={stage} aria-hidden>
      {/* Studio backdrop */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(70% 60% at 50% 42%, #ffffff 0%, #f4f7fb 55%, #e8eef5 100%), linear-gradient(180deg, #f8fafc, #e9eef5)",
        }}
      />
      {/* Drifting bokeh */}
      {[
        { x: 0.13, y: 0.2, s: 280, c: "rgba(56,189,248,0.20)" },
        { x: 0.82, y: 0.15, s: 340, c: "rgba(244,78,4,0.11)" },
        { x: 0.87, y: 0.72, s: 300, c: "rgba(99,102,241,0.12)" },
        { x: 0.1, y: 0.75, s: 260, c: "rgba(16,185,129,0.10)" },
        { x: 0.52, y: 0.1, s: 200, c: "rgba(251,113,133,0.10)" },
      ].map((b, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: b.x * W + Math.sin(t * 0.4 + i) * 30 * frame.u - t * 6 * frame.u,
            top: b.y * H + Math.cos(t * 0.35 + i * 2) * 24 * frame.u,
            width: b.s * frame.u,
            height: b.s * frame.u,
            marginLeft: (-b.s * frame.u) / 2,
            marginTop: (-b.s * frame.u) / 2,
            borderRadius: "50%",
            background: b.c,
            filter: `blur(${60 * frame.u}px)`,
          }}
        />
      ))}

      {/* Acts 1–2: brand, then the cloud */}
      <div style={square}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            perspective: 1400,
            perspectiveOrigin: "50% 46%",
            opacity: worldOpacity,
          }}
        >
          <div style={world}>
            <Floor t={t} />
            <Hub t={t} yaw={cam.yaw} />
          </div>
        </div>
        <OpeningTitles t={t} />
      </div>

      {/* Act 3: services */}
      {services.map((sv, i) => {
        const local = t - SPOT0 - i * SPOT;
        return local > -XFADE && local < SPOT + XFADE ? <ServiceSlide key={sv.slug} index={i} local={local} frame={frame} /> : null;
      })}

      {/* Act 4: close */}
      {t >= SPOT_END && (
        // Slow push-in so the closing shot keeps moving while it holds.
        <div style={{ position: "absolute", inset: 0, transformOrigin: "50% 45%", transform: `scale(${lerp(1, 1.035, inOut(prog(t, SPOT_END, DUR)))})` }}>
          <Finale f={t - SPOT_END} frame={frame} />
        </div>
      )}

      {/* Vignette, film grain and fade-through-white for a seamless loop */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(80% 80% at 50% 48%, transparent 58%, rgba(15,23,42,0.11) 100%)",
        }}
      />
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.05,
          mixBlendMode: "multiply",
        }}
      >
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} seed={grainSeed} />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#fff",
          opacity: Math.max(1 - out(prog(t, 0, 0.6)), inOut(prog(t, DUR - 0.45, DUR))),
        }}
      />
    </div>
  );
}

/* ---------- Acts 1–2 ---------- */

function Floor({ t }: { t: number }) {
  const size = 1500;
  return (
    <div
      style={{
        position: "absolute",
        left: -size / 2,
        top: -size / 2,
        width: size,
        height: size,
        transform: `translateY(${FLOOR_Y}px) rotateX(90deg)`,
        background: "radial-gradient(circle at center, rgba(56,189,248,0.20) 0%, rgba(56,189,248,0.06) 30%, transparent 62%)",
        borderRadius: "50%",
      }}
    >
      {[R * 2, R * 1.4, R * 0.8].map((d, i) => (
        <div
          key={d}
          style={{
            position: "absolute",
            left: (size - d) / 2,
            top: (size - d) / 2,
            width: d,
            height: d,
            borderRadius: "50%",
            border: `${i === 0 ? 2 : 1.5}px ${i === 0 ? "solid" : "dashed"} rgba(15,23,42,${i === 0 ? 0.1 : 0.12})`,
          }}
        />
      ))}
      {[0, 1].map((k) => {
        const p = ((t + k * 1.6) % 3.2) / 3.2;
        const d = lerp(240, R * 2.1, out(p));
        return (
          <div
            key={k}
            style={{
              position: "absolute",
              left: (size - d) / 2,
              top: (size - d) / 2,
              width: d,
              height: d,
              borderRadius: "50%",
              border: "3px solid rgba(56,189,248,0.6)",
              opacity: (1 - p) * 0.7,
            }}
          />
        );
      })}
    </div>
  );
}

/** Glossy cloud tile; `sweep` (0–1) runs a light streak across it. */
function CloudTile({ size, sweep = -1 }: { size: number; sweep?: number }) {
  const sweepX = sweep > 0 && sweep < 1 ? lerp(-0.6, 0.6, sweep) * size : -9999;
  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        borderRadius: "28%",
        overflow: "hidden",
        background: "linear-gradient(135deg, #5ee7f0 0%, #3fb4f3 45%, #3b6ff6 100%)",
        boxShadow: `0 ${size * 0.17}px ${size * 0.35}px -${size * 0.1}px rgba(37,99,235,0.6), inset 0 2px 0 rgba(255,255,255,0.6)`,
        outline: "1px solid rgba(255,255,255,0.6)",
        display: "grid",
        placeItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "8%",
          right: "8%",
          top: "5%",
          height: "42%",
          borderRadius: "40%",
          background: "linear-gradient(180deg, rgba(255,255,255,0.55), rgba(255,255,255,0))",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "-20%",
          bottom: "-20%",
          width: "26%",
          left: `calc(37% + ${sweepX}px)`,
          transform: "rotate(18deg)",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.75), transparent)",
        }}
      />
      <Cloud
        style={{
          position: "relative",
          width: "46%",
          height: "46%",
          color: "#fff",
          filter: "drop-shadow(0 6px 14px rgba(15,40,90,0.3))",
        }}
        fill="#fff"
        strokeWidth={0}
      />
    </div>
  );
}

function Hub({ t, yaw }: { t: number; yaw: number }) {
  const size = 230;
  const bob = Math.sin(t * 1.6) * 8;
  return (
    <div
      style={{
        position: "absolute",
        left: -size / 2,
        top: CLOUD_Y - size / 2 + bob,
        width: size,
        height: size,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Billboard: the hub always faces the camera. */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `rotateY(${-yaw}deg)`,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: -90,
            borderRadius: "50%",
            background: "rgba(56,189,248,0.35)",
            filter: "blur(50px)",
          }}
        />
        <CloudTile size={size} sweep={prog(t, CLOUD_IN + 0.9, CLOUD_IN + 1.9)} />
      </div>
    </div>
  );
}

/** Masked line reveal: the line rises from behind a clip and sharpens from a blur. */
function Reveal({ p, children, style }: { p: number; children: React.ReactNode; style?: CSSProperties }) {
  return (
    <div style={{ overflow: "hidden", paddingBottom: "0.1em", marginBottom: "-0.1em", ...style }}>
      <div style={{ transform: `translateY(${(1 - p) * 105}%)`, filter: `blur(${(1 - p) * 8}px)`, opacity: lerp(0.2, 1, p) }}>{children}</div>
    </div>
  );
}

/** A soft diagonal glint that travels across its parent (which should clip overflow). */
function Glint({ p, opacity = 0.6 }: { p: number; opacity?: number }) {
  if (p <= 0 || p >= 1) return null;
  return (
    <div
      style={{
        position: "absolute",
        top: "-30%",
        bottom: "-30%",
        width: "28%",
        left: `${lerp(-40, 120, p)}%`,
        transform: "rotate(18deg)",
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)",
        opacity,
        pointerEvents: "none",
      }}
    />
  );
}

function OpeningTitles({ t }: { t: number }) {
  const brandOut = inOut(prog(t, BRAND_OUT - 0.55, BRAND_OUT));
  const logo = expo(prog(t, 0.3, 1.3));
  const cloudOut = inOut(prog(t, SPOT0 - 0.5, SPOT0 - 0.05));
  const eyebrow: CSSProperties = { fontSize: 15, fontWeight: 600, letterSpacing: "0.2em", color: "#c23c00" };
  const tagline: CSSProperties = { fontSize: 40, lineHeight: 1.15, fontWeight: 600, letterSpacing: "-0.02em", color: "#0f172a" };
  return (
    <>
      {/* The brand, alone on the stage: slow push-in, then a soft dissolve */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          opacity: 1 - brandOut,
          filter: `blur(${brandOut * 6}px)`,
          transform: `scale(${lerp(0.985, 1.01, prog(t, 0, BRAND_OUT)) * lerp(1, 1.04, brandOut)})`,
        }}
      >
        <div style={{ position: "relative", overflow: "hidden", clipPath: `inset(-10% ${(1 - logo) * 100}% -10% 0)`, opacity: lerp(0.4, 1, logo) }}>
          <Image src="/string-fintech-logo.png" alt="" width={223} height={55} priority style={{ height: 92, width: "auto" }} />
          <Glint p={prog(t, 1.0, 1.8)} opacity={0.75} />
        </div>
        <div style={{ marginTop: 34, height: 2, width: 64 * expo(prog(t, 0.7, 1.5)), borderRadius: 1, background: BRAND_GRAD }} />
        <Reveal p={expo(prog(t, 0.75, 1.55))} style={{ marginTop: 30 }}>
          <p className={HEADING} style={tagline}>
            Transforming Business Through
          </p>
        </Reveal>
        <Reveal p={expo(prog(t, 0.9, 1.7))}>
          <p className={HEADING} style={tagline}>
            <span style={GRAD}>Cloud Services, AI, Innovation &amp; Technology</span>
          </p>
        </Reveal>
        <Reveal p={expo(prog(t, 1.1, 1.8))} style={{ marginTop: 20 }}>
          <p style={{ ...eyebrow, color: "#64748b" }}>HONG KONG</p>
        </Reveal>
      </div>

      {/* The cloud */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 190,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          opacity: 1 - cloudOut,
          filter: `blur(${cloudOut * 6}px)`,
        }}
      >
        <Reveal p={expo(prog(t, CLOUD_IN + 0.55, CLOUD_IN + 1.2))}>
          <p style={eyebrow}>CLOUD SERVICES · AI · TECHNOLOGY SERVICES · INNOVATION</p>
        </Reveal>
        <Reveal p={expo(prog(t, CLOUD_IN + 0.65, CLOUD_IN + 1.35))} style={{ marginTop: 14 }}>
          <p className={HEADING} style={{ fontSize: 44, lineHeight: 1.1, fontWeight: 600, letterSpacing: "-0.02em", color: "#0f172a" }}>
            Built on scalable, secure <span style={GRAD}>cloud infrastructure</span>
          </p>
        </Reveal>
      </div>
    </>
  );
}

/* ---------- Act 3: services ---------- */

/** How long neighbouring slides overlap as one dissolves into the next. */
const XFADE = 0.32;

function ServiceSlide({ index, local, frame }: { index: number; local: number; frame: Frame }) {
  const { W, H, u, land } = frame;
  const s = services[index];
  const enter = expo(prog(local, -XFADE, 0.55));
  const exit = inOut(prog(local, SPOT - XFADE, SPOT + XFADE));
  const hold = clamp(local / SPOT);

  // Card geometry (4:3), in output pixels.
  const cardW = land ? Math.min(0.44 * W, 0.54 * H * (4 / 3)) : Math.min(0.84 * W, 0.4 * H * (4 / 3));
  const cardH = cardW * 0.75;
  const cardCx = land ? 0.69 * W : 0.5 * W;
  const cardCy = land ? 0.46 * H : 0.2 * H + cardH / 2;
  const design = 640; // the card is laid out at 640px wide, then scaled

  const lineP = (d: number) => expo(prog(local, -0.05 + d, 0.6 + d));

  const text: CSSProperties = land
    ? { position: "absolute", left: 0.08 * W, top: 0, bottom: 0.06 * H, width: 0.38 * W, display: "flex", flexDirection: "column", justifyContent: "center" }
    : { position: "absolute", left: 0.08 * W, right: 0.08 * W, top: cardCy + cardH / 2 + 0.045 * H };

  return (
    <>
      {/* Oversized service number, very faint, behind the copy (widescreen only) */}
      {land && (
        <div
          className={HEADING}
          style={{
            position: "absolute",
            left: 0.04 * W,
            top: 0.62 * H,
            fontSize: 300 * u,
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: "-0.05em",
            color: "rgba(15,23,42,0.045)",
            opacity: Math.min(enter, 1 - exit),
            transform: `translateY(${(1 - enter) * 40 * u - exit * 20 * u}px)`,
          }}
        >
          {s.number}
        </div>
      )}

      {/* Hero card: focuses in from a soft blur, drifts, then recedes as the next one arrives */}
      <div
        style={{
          position: "absolute",
          left: cardCx - cardW / 2,
          top: cardCy - cardH / 2,
          width: cardW,
          height: cardH,
          perspective: 1800,
          opacity: enter * (1 - exit),
          filter: `blur(${((1 - enter) * 12 + exit * 10) * u}px)`,
          transform: `translateX(${(1 - enter) * 0.05 * W - exit * 0.03 * W}px)`,
        }}
      >
        <div aria-hidden style={{ position: "absolute", inset: "8% 6% -6% 6%", borderRadius: "50%", background: "rgba(244,78,4,0.16)", filter: `blur(${70 * u}px)` }} />
        <div
          style={{
            width: design,
            height: design * 0.75,
            transformOrigin: "0 0",
            transform: `scale(${cardW / design}) rotateY(${lerp(-8, 0, enter) + lerp(-2, 2, hold) + exit * 6}deg) rotateX(${lerp(1.5, -1.5, hold)}deg) scale(${lerp(1.06, 1, enter) * lerp(1, 0.94, exit) * (1 + 0.03 * hold)})`,
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              borderRadius: 28,
              padding: 10,
              overflow: "hidden",
              background: "rgba(255,255,255,0.9)",
              border: "1px solid rgba(226,232,240,0.95)",
              boxShadow: "0 50px 90px -40px rgba(15,23,42,0.5), 0 0 0 1px rgba(255,255,255,0.6) inset",
            }}
          >
            <div style={{ width: "100%", height: "100%", borderRadius: 20, overflow: "hidden" }}>
              <ServiceArt slug={s.slug} size="lg" />
            </div>
            <Glint p={prog(local, 0.3, 1.2)} opacity={0.5} />
          </div>
        </div>
      </div>

      {/* Copy: each line rises from behind a mask */}
      <div style={{ ...text, opacity: 1 - exit, filter: `blur(${exit * 8 * u}px)`, transform: `translateX(${-exit * 0.02 * W}px)` }}>
        <Reveal p={lineP(0)}>
          <p style={{ fontSize: 16 * u, fontWeight: 600, letterSpacing: "0.2em", color: "#c23c00" }}>
            SERVICE {s.number} <span style={{ color: "#94a3b8" }}>/ 0{services.length}</span>
          </p>
        </Reveal>
        <Reveal p={lineP(0.07)} style={{ marginTop: 18 * u }}>
          <p className={HEADING} style={{ fontSize: (land ? 66 : 58) * u, lineHeight: 1.04, fontWeight: 600, letterSpacing: "-0.03em", color: "#0f172a" }}>
            {s.title}
          </p>
        </Reveal>
        <Reveal p={lineP(0.16)} style={{ marginTop: 22 * u }}>
          <p style={{ fontSize: 25 * u, lineHeight: 1.45, color: "#475569", maxWidth: 560 * u }}>{s.tagline}</p>
        </Reveal>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 * u, marginTop: 28 * u }}>
          {highlights[s.slug].map((h, i) => {
            const p = lineP(0.26 + i * 0.06);
            return (
              <span
                key={h}
                style={{
                  opacity: p,
                  filter: `blur(${(1 - p) * 6}px)`,
                  transform: `translateY(${(1 - p) * 14 * u}px)`,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8 * u,
                  padding: `${9 * u}px ${15 * u}px`,
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.85)",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 6px 18px -10px rgba(15,23,42,0.25)",
                  fontSize: 17 * u,
                  fontWeight: 600,
                  color: "#0f172a",
                }}
              >
                <span style={{ width: 7 * u, height: 7 * u, borderRadius: "50%", background: BRAND_GRAD }} />
                {h}
              </span>
            );
          })}
        </div>
      </div>
    </>
  );
}

/* ---------- Act 4: close ---------- */

function Finale({ f, frame }: { f: number; frame: Frame }) {
  const { W, H, u, land } = frame;
  const head = expo(prog(f, 0.1, 0.75));
  const hub = expo(prog(f, 0.2, 0.75));
  const draw = inOut(prog(f, 0.4, 1));

  const cols = land ? services.length : 3;
  const gap = (land ? 22 : 18) * u;
  const cw = land ? Math.min((0.84 * W - gap * (cols - 1)) / cols, 300 * u) : (0.88 * W - gap * (cols - 1)) / cols;
  const ch = cw * 0.75 + 52 * (cw / 260);
  const rowY = land ? 0.6 * H : 0.5 * H;
  const hubSize = (land ? 90 : 100) * u;
  const hubY = land ? 0.38 * H : 0.33 * H;

  const cards = services.map((s, n) => {
    const row = Math.floor(n / cols);
    const inRow = row === 0 ? Math.min(cols, services.length) : services.length - cols;
    const col = n - row * cols;
    const rowW = inRow * cw + (inRow - 1) * gap;
    const x = (W - rowW) / 2 + col * (cw + gap) + cw / 2;
    const y = rowY + row * (ch + gap);
    return { s, x, y };
  });

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: (land ? 0.15 : 0.14) * H,
          textAlign: "center",
          opacity: head,
          filter: `blur(${(1 - head) * 8 * u}px)`,
          transform: `translateY(${(1 - head) * -18 * u}px) scale(${lerp(1.03, 1, head)})`,
        }}
      >
        <Image src="/string-fintech-logo.png" alt="" width={223} height={55} style={{ height: 62 * u, width: "auto", margin: "0 auto" }} />
        <p
          className={HEADING}
          style={{
            marginTop: 26 * u,
            fontSize: (land ? 54 : 50) * u,
            lineHeight: 1.08,
            fontWeight: 600,
            letterSpacing: "-0.025em",
            color: "#0f172a",
          }}
        >
          One partner for your {!land && <br />}
          <span style={GRAD}>digital transformation</span>
        </p>
      </div>

      {/* The cloud powers every service */}
      <svg style={{ position: "absolute", inset: 0, width: W, height: H }}>
        <defs>
          <linearGradient id="fin-line" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#f44e04" stopOpacity="0.7" />
          </linearGradient>
        </defs>
        {cards.map(({ s, x, y }, n) => {
          // Only the top row connects directly; a second row would cross the cards above it.
          if (!land && n >= cols) return null;
          const x0 = W / 2;
          const y0 = hubY + hubSize / 2;
          const y1 = y - ch / 2;
          const d = `M${x0},${y0} C${x0},${(y0 + y1) / 2} ${x},${(y0 + y1) / 2} ${x},${y1}`;
          return (
            <path key={s.slug} d={d} fill="none" stroke="url(#fin-line)" strokeWidth={2.5 * u} pathLength={1} strokeDasharray="1" strokeDashoffset={1 - draw} />
          );
        })}
      </svg>
      <div
        style={{
          position: "absolute",
          left: W / 2 - hubSize / 2,
          top: hubY - hubSize / 2,
          opacity: hub,
          transform: `scale(${lerp(0.7, 1, hub)})`,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: -30 * u,
            borderRadius: "50%",
            background: "rgba(56,189,248,0.3)",
            filter: `blur(${24 * u}px)`,
          }}
        />
        <CloudTile size={hubSize} />
      </div>

      {cards.map(({ s, x, y }, n) => {
        const a = expo(prog(f, 0.35 + n * 0.08, 0.95 + n * 0.08));
        const Icon = serviceIcons[s.slug];
        const design = 260;
        const k = cw / design;
        return (
          <div
            key={s.slug}
            style={{
              position: "absolute",
              left: x - cw / 2,
              top: y - ch / 2,
              width: cw,
              height: ch,
              opacity: a,
              filter: `blur(${(1 - a) * 8 * u}px)`,
              transform: `translateY(${(1 - a) * 30 * u}px)`,
            }}
          >
            <div
              style={{
                width: design,
                transform: `scale(${k})`,
                transformOrigin: "0 0",
              }}
            >
              <div
                style={{
                  borderRadius: 20,
                  padding: 8,
                  background: "rgba(255,255,255,0.94)",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 30px 50px -28px rgba(15,23,42,0.45)",
                }}
              >
                <div
                  style={{
                    aspectRatio: "4 / 3",
                    borderRadius: 14,
                    overflow: "hidden",
                  }}
                >
                  <ServiceArt slug={s.slug} size="sm" />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "10px 4px 4px",
                  }}
                >
                  <span
                    style={{
                      display: "grid",
                      placeItems: "center",
                      width: 26,
                      height: 26,
                      borderRadius: 8,
                      background: BRAND_GRAD,
                      color: "#fff",
                      flexShrink: 0,
                    }}
                  >
                    <Icon style={{ width: 14, height: 14 }} strokeWidth={2} />
                  </span>
                  <span
                    className={HEADING}
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: "#0f172a",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {s.shortTitle}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
