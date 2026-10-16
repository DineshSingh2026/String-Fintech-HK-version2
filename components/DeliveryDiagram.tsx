"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Fragment, useId, useRef, useState, type KeyboardEvent } from "react";
import type { DiagramNode } from "@/lib/content";
import { iconMap } from "./icons";

type Props = {
  nodes: DiagramNode[];
  kind: "flow" | "process";
  label: string;
};

/**
 * Interactive "Service Delivery Model": a horizontal flow of nodes joined by animated
 * connectors (stacked vertically below lg). Hover, click or focus a node to reveal its
 * description; arrow keys move between nodes.
 */
export function DeliveryDiagram({ nodes, kind, label }: Props) {
  const initial = Math.max(0, nodes.findIndex((n) => n.core));
  const [active, setActive] = useState(initial);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const uid = useId();
  const panelId = `${uid}-panel`;
  const current = nodes[active];
  const isProcess = kind === "process";

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const keys: Record<string, number> = {
      ArrowRight: i + 1,
      ArrowDown: i + 1,
      ArrowLeft: i - 1,
      ArrowUp: i - 1,
      Home: 0,
      End: nodes.length - 1,
    };
    if (!(e.key in keys)) return;
    e.preventDefault();
    const next = (keys[e.key] + nodes.length) % nodes.length;
    setActive(next);
    buttons.current[next]?.focus();
  };

  const stepLabel = (i: number) => String(i + 1).padStart(2, "0");

  return (
    <div>
      <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.16em] text-slate-400">
        {isProcess ? "Select a stage to view details" : "Select a node to view its role"}
      </p>

      <div role="group" aria-label={label} className="flex flex-col lg:flex-row lg:items-stretch">
        {nodes.map((n, i) => {
          const Icon = iconMap[n.icon];
          const selected = i === active;
          return (
            <Fragment key={n.id}>
              {i > 0 && <Connector />}
              <div className="lg:min-w-0 lg:flex-1 lg:basis-0">
                <button
                  ref={(el) => {
                    buttons.current[i] = el;
                  }}
                  type="button"
                  aria-pressed={selected}
                  aria-controls={panelId}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={`group relative flex h-full w-full flex-row items-center gap-4 rounded-[12px] border p-4 text-left transition-colors duration-300 lg:flex-col lg:items-start lg:gap-0 lg:p-6 ${
                    selected
                      ? "border-brand bg-navy-700/80 shadow-[0_0_0_1px_rgba(244,78,4,0.35),0_0_40px_-8px_rgba(244,78,4,0.35)]"
                      : "border-white/10 bg-navy-800/70 hover:border-white/25"
                  }`}
                >
                  <span
                    className={`grid h-11 w-11 shrink-0 place-items-center rounded-[10px] border transition-colors lg:h-12 lg:w-12 ${
                      n.core || selected ? "border-brand/50 bg-brand/15 text-brand" : "border-white/10 bg-white/5 text-slate-300"
                    }`}
                  >
                    <Icon className="h-5 w-5 lg:h-6 lg:w-6" strokeWidth={1.6} aria-hidden />
                  </span>
                  <span className="min-w-0 lg:mt-6">
                    <span className="block font-mono text-[11px] tracking-[0.16em] text-slate-400">
                      {isProcess ? `STEP ${stepLabel(i)}` : stepLabel(i)}
                    </span>
                    <span className="mt-1 block font-heading text-[17px] font-semibold leading-snug text-white lg:text-lg">
                      {n.title}
                    </span>
                    {n.subtitle && <span className="mt-1 block text-sm leading-snug text-brand">{n.subtitle}</span>}
                  </span>
                </button>

                {/* Mobile/tablet: description expands inline beneath the selected node. */}
                {selected && (
                  <div className="lg:hidden" aria-live="polite">
                    <div className="mx-4 rounded-b-[12px] border-x border-b border-white/10 bg-navy-800/40 px-5 py-4 text-[15px] leading-relaxed text-slate-300">
                      {n.description}
                    </div>
                  </div>
                )}
              </div>
            </Fragment>
          );
        })}
      </div>

      {/* Desktop: single detail panel below the flow. */}
      <div id={panelId} aria-live="polite" className="mt-8 hidden lg:block">
        <div className="relative overflow-hidden rounded-[12px] border border-white/10 bg-navy-800/60 p-8">
          <span aria-hidden className="absolute inset-y-0 left-0 w-px bg-brand" />
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="grid gap-6 lg:grid-cols-12"
            >
              <div className="lg:col-span-4">
                <p className="font-mono text-[11px] tracking-[0.16em] text-slate-400">
                  {isProcess ? "STEP" : "NODE"} {stepLabel(active)} / {stepLabel(nodes.length - 1)}
                </p>
                <h3 className="mt-2 text-2xl text-white">{current.title}</h3>
                {current.subtitle && <p className="mt-1 text-[15px] text-brand">{current.subtitle}</p>}
              </div>
              <p className="text-[17px] leading-relaxed text-slate-300 lg:col-span-8">{current.description}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/** Animated connector: vertical on small screens, horizontal from lg. */
function Connector() {
  return (
    <div aria-hidden className="relative flex h-10 shrink-0 justify-center lg:h-auto lg:w-12 lg:items-center">
      {/* vertical */}
      <svg viewBox="0 0 12 40" className="h-10 w-3 lg:hidden" fill="none">
        <line x1="6" y1="0" x2="6" y2="40" stroke="rgb(226 232 240 / 0.15)" />
        <line x1="6" y1="0" x2="6" y2="34" stroke="#F44E04" strokeWidth="1.25" className="flow-line" />
        <polyline points="2,32 6,38 10,32" stroke="#F44E04" strokeWidth="1.25" />
      </svg>
      <span className="flow-dot-y absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand shadow-[0_0_8px_2px_rgba(244,78,4,0.6)] lg:hidden" />
      {/* horizontal */}
      <div className="relative hidden w-12 lg:block">
        <svg viewBox="0 0 48 12" className="h-3 w-12" fill="none">
          <line x1="0" y1="6" x2="48" y2="6" stroke="rgb(226 232 240 / 0.15)" />
          <line x1="0" y1="6" x2="42" y2="6" stroke="#F44E04" strokeWidth="1.25" className="flow-line" />
          <polyline points="40,2 46,6 40,10" stroke="#F44E04" strokeWidth="1.25" />
        </svg>
        <span className="flow-dot-x absolute top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand shadow-[0_0_8px_2px_rgba(244,78,4,0.6)]" />
      </div>
    </div>
  );
}
