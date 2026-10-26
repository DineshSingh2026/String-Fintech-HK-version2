"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

export const INTRO_DONE_EVENT = "string-intro-done";
/** The video opens on the brand by itself; the corner logo appears once that scene ends. */
const BRAND_SCENE_END = 4.0;

/**
 * Hides the splash before first paint for visitors who prefer reduced motion.
 * Rendered just before <SplashIntro />.
 */
export function SplashIntroGate() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `try{if(matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("intro-skip")}catch(e){}`,
      }}
    />
  );
}

/** Picks the render that best matches the screen's shape. */
function pickVideo() {
  const ratio = window.innerWidth / window.innerHeight;
  const name = ratio >= 1.15 ? "string-intro-wide" : ratio <= 0.85 ? "string-intro-tall" : "string-intro";
  return { webm: `/video/${name}.webm`, mp4: `/video/${name}.mp4`, poster: `/video/${name}-poster.jpg` };
}

/**
 * Full-screen 21s company overview that plays every time the home page loads,
 * then fades away to reveal the landing page.
 */
export function SplashIntro() {
  const [phase, setPhase] = useState<"playing" | "leaving" | "gone">("playing");
  const [src, setSrc] = useState<ReturnType<typeof pickVideo> | null>(null);
  const [showLogo, setShowLogo] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const skip = useRef<HTMLButtonElement>(null);

  const finish = () => setPhase((p) => (p === "playing" ? "leaving" : p));

  useEffect(() => {
    if (document.documentElement.classList.contains("intro-skip")) {
      setPhase("gone");
      return;
    }
    setSrc(pickVideo());
    document.body.style.overflow = "hidden";
    skip.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && finish();
    document.addEventListener("keydown", onKey);
    const safety = window.setTimeout(finish, 28000);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(safety);
      document.body.style.overflow = "";
    };
  }, []);

  // Start playback once the right source is attached; if autoplay is blocked, go straight to the page.
  useEffect(() => {
    const v = video.current;
    if (!src || !v) return;
    v.load();
    v.play().catch(finish);
    let raf = 0;
    const tick = () => {
      setShowLogo(v.currentTime > BRAND_SCENE_END);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [src]);

  useEffect(() => {
    if (phase !== "leaving") return;
    document.body.style.overflow = "";
    window.dispatchEvent(new Event(INTRO_DONE_EVENT));
    const t = window.setTimeout(() => setPhase("gone"), 900);
    return () => window.clearTimeout(t);
  }, [phase]);

  if (phase === "gone") return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="String FinTech introduction video"
      className="splash-intro fixed inset-0 z-[100] bg-[#eef3f8] transition-opacity duration-[900ms] ease-out"
      style={{ opacity: phase === "leaving" ? 0 : 1 }}
    >
      <video
        ref={video}
        className="absolute inset-0 h-full w-full object-cover"
        muted
        playsInline
        preload="auto"
        poster={src?.poster}
        onEnded={finish}
        aria-hidden
      >
        {src && <source src={src.webm} type="video/webm" />}
        {src && <source src={src.mp4} type="video/mp4" />}
      </video>

      {/* Branding bar */}
      <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-4 p-4 sm:p-6">
        <span
          className="rounded-2xl border border-white/70 bg-white/75 px-4 py-2.5 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.25)] backdrop-blur-md transition-opacity duration-700"
          style={{ opacity: showLogo ? 1 : 0 }}
        >
          <Image src="/string-fintech-logo.png" alt="String FinTech HK Limited" width={223} height={55} priority className="h-7 w-auto sm:h-8" />
        </span>
        <button
          ref={skip}
          type="button"
          onClick={finish}
          className="group inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/75 px-4 py-2 text-sm font-semibold text-ink shadow-[0_8px_30px_-12px_rgba(15,23,42,0.25)] backdrop-blur-md transition-colors hover:bg-white"
        >
          Skip intro
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </button>
      </div>
    </div>
  );
}
