/**
 * Decorative animated backdrop for dark sections: technical grid, drifting glow orbs
 * and light beams travelling along grid lines. Purely CSS; static under reduced motion.
 */
export function Ambient({
  beams = true,
  orbs = true,
  grid = true,
  className = "",
}: {
  beams?: boolean;
  orbs?: boolean;
  grid?: boolean;
  className?: string;
}) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {grid && <div className="grid-lines absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_80%)]" />}
      {orbs && (
        <>
          <div className="orb orb-a -left-[10%] top-[10%] h-[420px] w-[420px] bg-brand/20" />
          <div className="orb orb-b -right-[8%] bottom-[-10%] h-[480px] w-[480px] bg-[#2a4a8a]/30" />
          <div className="orb orb-a right-[30%] top-[-15%] h-[300px] w-[300px] bg-brand/10 [animation-delay:-8s]" />
        </>
      )}
      {beams && (
        <>
          <span className="beam-x top-[112px]" />
          <span className="beam-x top-[336px] [animation-delay:-4s] [animation-duration:12s]" />
          <span className="beam-x top-[560px] [animation-delay:-7s] [animation-duration:10s]" />
          <span className="beam-y left-[224px] [animation-delay:-2s]" />
          <span className="beam-y left-[61%] [animation-delay:-6s] [animation-duration:14s]" />
        </>
      )}
    </div>
  );
}

/** Same idea for light sections: faint grid with orange beams. */
export function AmbientLight({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="grid-lines-light absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_10%,transparent_70%)]" />
      <span className="beam-x top-[168px] opacity-50 [animation-duration:14s]" />
      <span className="beam-y left-[280px] opacity-40 [animation-delay:-5s] [animation-duration:16s]" />
    </div>
  );
}
