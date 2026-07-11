import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The design system ships React components as TSX source.
  transpilePackages: ["@kuroko-studios/design"],
};

export default nextConfig;
