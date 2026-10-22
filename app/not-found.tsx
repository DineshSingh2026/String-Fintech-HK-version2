import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageIntro } from "@/components/ui";

export default function NotFound() {
  return (
    <PageIntro kicker="404" title="Page not found" intro="The page you're looking for doesn't exist or has moved.">
      <div className="mt-10 flex flex-col gap-3 pb-10 sm:flex-row">
        <Link href="/" className="btn bg-brand-600 text-white hover:bg-brand-700">
          Back to Home
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
        <Link href="/services" className="btn border border-slate-300 text-ink hover:border-ink">
          Explore Our Services
        </Link>
      </div>
    </PageIntro>
  );
}
