import { BrainCircuit, Check, CloudUpload, Compass, Layers, ShieldCheck, TrendingDown, type LucideIcon } from "lucide-react";
import type { CloudCapabilityIcon, CloudDetail } from "@/lib/content";
import { Block, BlockHeading } from "./ui";

const capabilityIcons: Record<CloudCapabilityIcon, LucideIcon> = {
  migrate: CloudUpload,
  modernize: Layers,
  managed: ShieldCheck,
  ai: BrainCircuit,
  cost: TrendingDown,
  consult: Compass,
};

/** Approach + the six end-to-end capabilities; sits before the delivery model. */
export function CloudCapabilities({ cloud }: { cloud: CloudDetail }) {
  const { approach, capabilities, engagement } = cloud;
  return (
    <>
      <Block labelledBy="approach-heading">
        <BlockHeading id="approach-heading" kicker="Our Approach" title={approach.heading}>
          <p>{approach.body}</p>
        </BlockHeading>
        <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {approach.points.map((p, i) => (
            <li key={p.title} className="border-t-2 border-ink pt-6">
              <span className="text-sm text-slate-400">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 text-xl text-ink">{p.title}</h3>
              <p className="mt-3 text-[16px] leading-relaxed text-slate-600">{p.body}</p>
            </li>
          ))}
        </ol>
      </Block>

      <Block tone="mist" labelledBy="cloud-capabilities-heading">
        <BlockHeading id="cloud-capabilities-heading" kicker="What We Do" title={capabilities.heading}>
          <p>{capabilities.body}</p>
        </BlockHeading>
        <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.items.map((c, i) => {
            const Icon = capabilityIcons[c.icon];
            return (
              <li key={c.title} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-7">
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-50 text-brand">
                    <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden />
                  </span>
                  <span className="text-sm text-slate-400">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-6 text-xl text-ink">{c.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{c.body}</p>
                <ul className="mt-5 space-y-2.5 border-t border-slate-100 pt-5">
                  {c.points.map((p) => (
                    <li key={p} className="flex gap-2.5 text-[15px] text-ink">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
                      {p}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </Block>

      <Block labelledBy="engagement-heading">
        <BlockHeading id="engagement-heading" kicker="Our Business Model" title={engagement.heading}>
          {engagement.body.map((p) => (
            <p key={p} className="mt-4 first:mt-0">
              {p}
            </p>
          ))}
        </BlockHeading>
        <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
          {engagement.steps.map((s, i) => (
            <li key={s.title} className="bg-white p-7">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-sm font-semibold text-white">{i + 1}</span>
              <h3 className="mt-5 text-lg text-ink">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{s.body}</p>
            </li>
          ))}
        </ol>
      </Block>
    </>
  );
}

/** Cloud platforms + commercials; replaces the short billing callout on the Cloud page. */
export function CloudCommercials({ cloud, billingBody }: { cloud: CloudDetail; billingBody?: string }) {
  const { platforms, commercials } = cloud;
  return (
    <>
      <Block labelledBy="platforms-heading">
        <BlockHeading id="platforms-heading" kicker="Cloud Environments" title={platforms.heading}>
          <p>{platforms.body}</p>
        </BlockHeading>
        <ul className="mt-14 grid gap-5 md:grid-cols-2">
          {platforms.items.map((p) => (
            <li key={p.name} className="flex gap-5 rounded-2xl border border-slate-200 p-7">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-mist font-heading text-sm font-semibold text-ink">{p.short}</span>
              <div>
                <h3 className="text-xl text-ink">{p.name}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{p.body}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-[13px] leading-relaxed text-slate-500">{platforms.note}</p>
      </Block>

      <Block tone="mist" labelledBy="commercials-heading">
        <BlockHeading id="commercials-heading" kicker="Transparent Commercials" title={commercials.heading}>
          <p>{commercials.body}</p>
          {billingBody && <p className="mt-4">{billingBody}</p>}
        </BlockHeading>
        <dl className="mt-14 divide-y divide-slate-200 border-y border-slate-200">
          {commercials.items.map((c) => (
            <div key={c.title} className="grid gap-2 py-6 sm:grid-cols-12 sm:gap-8">
              <dt className="font-heading text-lg font-semibold text-ink sm:col-span-4">{c.title}</dt>
              <dd className="text-[16px] leading-relaxed text-slate-600 sm:col-span-8">{c.body}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 max-w-4xl text-[13px] leading-relaxed text-slate-500">{commercials.note}</p>
      </Block>
    </>
  );
}
