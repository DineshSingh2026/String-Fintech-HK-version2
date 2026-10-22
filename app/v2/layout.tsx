import type { Metadata } from "next";
import { V2Footer } from "@/components/v2/V2Footer";
import { V2Header } from "@/components/v2/V2Header";

// Preview variant: kept out of search results so it never competes with the live pages.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <V2Header />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <V2Footer />
    </>
  );
}
