import Image from "next/image";

/**
 * Image in a premium frame: thin border, rotating orange sheen on the edge, corner
 * ticks and a gentle float. Used for service and about imagery.
 */
export function FramedImage({
  src,
  alt,
  priority = false,
  sizes = "(min-width: 1024px) 520px, 100vw",
  aspect = "aspect-[3/2]",
  float = true,
  className = "",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  aspect?: string;
  float?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative ${float ? "float-y" : ""} ${className}`}>
      {/* glow */}
      <div aria-hidden className="absolute -inset-6 rounded-[28px] bg-brand/20 blur-3xl" />
      {/* animated border sheen */}
      <div aria-hidden className="absolute -inset-px overflow-hidden rounded-[17px]">
        <div className="spin-slow absolute left-1/2 top-1/2 aspect-square w-[160%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(244,78,4,0.9)_40deg,transparent_90deg,transparent_360deg)]" />
      </div>
      <div className={`relative overflow-hidden rounded-2xl border border-white/10 bg-navy ${aspect}`}>
        <Image src={src} alt={alt} fill priority={priority} loading={priority ? "eager" : undefined} sizes={sizes} className="object-cover" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent" />
      </div>
      {/* corner ticks */}
      <span aria-hidden className="absolute -left-3 -top-3 h-6 w-6 border-l border-t border-brand" />
      <span aria-hidden className="absolute -bottom-3 -right-3 h-6 w-6 border-b border-r border-brand" />
    </div>
  );
}
