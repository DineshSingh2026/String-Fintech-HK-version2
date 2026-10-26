import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  // Keeps the dev badge out of frames rendered from /render/intro.
  devIndicators: false,
  // The design previewed at /v2 is now the main site; keep any shared preview links working.
  async redirects() {
    return [
      { source: "/v2", destination: "/", permanent: true },
      { source: "/v2/:path*", destination: "/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
