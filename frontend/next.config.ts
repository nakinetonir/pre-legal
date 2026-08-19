import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  // Static export needs directory-style URLs (out/login/index.html) so a
  // plain file server (our FastAPI StaticFiles mount) can resolve "/login"
  // without extra rewrite rules.
  trailingSlash: true,
};

export default nextConfig;
