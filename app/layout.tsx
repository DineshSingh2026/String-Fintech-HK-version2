import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { company, home } from "@/lib/content";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const interTight = Inter_Tight({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-inter-tight", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: home.seoTitle, template: "%s" },
  description: home.metaDescription,
  applicationName: company.name,
  openGraph: {
    type: "website",
    siteName: company.name,
    locale: "en_HK",
  },
  twitter: { card: "summary" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  url: SITE_URL,
  logo: `${SITE_URL}/string-fintech-logo.png`,
  email: company.email,
  telephone: company.phoneDisplay.replace(/\s/g, ""),
  address: {
    "@type": "PostalAddress",
    streetAddress: "Flat/RM 606, 6/F, Hollywood Centre, 77–91 Queen's Road West",
    addressLocality: "Sheung Wan",
    addressRegion: "Hong Kong",
    addressCountry: "HK",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // suppressHydrationWarning: SplashIntroGate may add a class to <html> before hydration.
  return (
    <html lang="en" suppressHydrationWarning className={`${interTight.variable} ${inter.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
