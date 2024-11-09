import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  distDir: 'dist',
  trailingSlash: false,
  assetPrefix: '.',
};

export default nextConfig;
