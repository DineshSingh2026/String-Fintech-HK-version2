"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; r: number; accent: boolean };
type Pulse = { a: number; b: number; t: number; speed: number };

const LINK_DIST = 150;
const ORANGE = "244, 78, 4";
const SLATE = "148, 163, 184";

/**
 * Abstract animated node network for the hero. Drifting nodes connect when close;
 * orange "data packets" travel along random links. Pauses when off-screen or the tab
 * is hidden, and renders a single static frame under prefers-reduced-motion.
 */
export function NetworkCanvas({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    let raf = 0;
    let visible = true;
    let last = performance.now();

    const seed = () => {
      const count = Math.round(Math.min(90, Math.max(28, (w * h) / 15000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.4 + 1,
        accent: Math.random() < 0.12,
      }));
      pulses = [];
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      // Only re-seed on meaningful width changes (avoids reshuffling when mobile toolbars resize the viewport).
      const reseed = !nodes.length || Math.abs(rect.width - w) > 40;
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reseed) seed();
      draw(0);
    };

    const draw = (dt: number) => {
      ctx.clearRect(0, 0, w, h);

      if (dt > 0) {
        for (const n of nodes) {
          n.x += n.vx * dt;
          n.y += n.vy * dt;
          if (n.x < -20) n.x = w + 20;
          if (n.x > w + 20) n.x = -20;
          if (n.y < -20) n.y = h + 20;
          if (n.y > h + 20) n.y = -20;
        }
      }

      const links: [number, number][] = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < LINK_DIST) {
            const alpha = (1 - d / LINK_DIST) * 0.4;
            const accent = a.accent || b.accent;
            ctx.strokeStyle = `rgba(${accent ? ORANGE : SLATE}, ${accent ? alpha * 1.4 : alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
            links.push([i, j]);
          }
        }
      }

      for (const n of nodes) {
        if (n.accent) {
          ctx.fillStyle = `rgba(${ORANGE}, 0.18)`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + 4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = n.accent ? `rgb(${ORANGE})` : `rgba(${SLATE}, 0.7)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (reduce) return;

      // Data packets travelling along live links.
      if (pulses.length < 10 && links.length && Math.random() < 0.06) {
        const [a, b] = links[Math.floor(Math.random() * links.length)];
        pulses.push({ a, b, t: 0, speed: 0.008 + Math.random() * 0.01 });
      }
      pulses = pulses.filter((p) => {
        p.t += p.speed * dt;
        const a = nodes[p.a];
        const b = nodes[p.b];
        if (p.t >= 1 || Math.hypot(a.x - b.x, a.y - b.y) > LINK_DIST) return false;
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        ctx.fillStyle = `rgba(${ORANGE}, 0.95)`;
        ctx.beginPath();
        ctx.arc(x, y, 1.8, 0, Math.PI * 2);
        ctx.fill();
        return true;
      });
    };

    const loop = (now: number) => {
      const dt = Math.min(now - last, 50) / 16.67;
      last = now;
      draw(dt);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (reduce || raf || !visible || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);
    start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={`block h-full w-full ${className}`} />;
}
