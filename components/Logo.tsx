import Image from "next/image";
import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex shrink-0 items-center ${className}`} aria-label="String FinTech — Home">
      <Image
        src="/string-fintech-logo.png"
        alt="String FinTech HK Limited"
        width={223}
        height={55}
        priority
        className="h-9 w-auto sm:h-10"
      />
    </Link>
  );
}
