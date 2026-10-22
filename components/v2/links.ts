// The "Simple" design variant lives under /v2 so it can be reviewed beside the current site.
export const V2_BASE = "/v2";

export const v2 = (path: string) => (path === "/" ? V2_BASE : `${V2_BASE}${path}`);

export const v2Service = (slug: string) => v2(`/services/${slug}`);

/** Maps a /v2 path to the equivalent page on the current site. */
export const currentSitePath = (v2Path: string) => v2Path.replace(/^\/v2(?=\/|$)/, "") || "/";

export const v2Nav = [
  { href: v2("/services"), label: "Services" },
  { href: v2("/about"), label: "About" },
  { href: v2("/contact"), label: "Contact" },
];
