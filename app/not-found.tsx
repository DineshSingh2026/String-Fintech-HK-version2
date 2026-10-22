import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <PageHero eyebrow="404" title="Page not found" intro="The page you're looking for doesn't exist or has moved.">
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/" className="btn bg-brand-600 text-white hover:bg-brand-700">
              Back to Home
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link href="/services" className="btn border border-white/25 text-white hover:border-white/60 hover:bg-white/5">
              Explore Our Services
            </Link>
          </div>
        </PageHero>
      </main>
      <Footer />
    </>
  );
}
