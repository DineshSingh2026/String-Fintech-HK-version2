import type { MetadataRoute } from "next";
import { serviceHref, services } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/services", ...services.map((s) => serviceHref(s.slug)), "/about", "/contact"];
  return paths.map((p) => ({
    url: `${SITE_URL}${p === "/" ? "" : p}`,
    changeFrequency: "monthly",
    priority: p === "/" ? 1 : p.startsWith("/services/") ? 0.8 : 0.7,
  }));
}
