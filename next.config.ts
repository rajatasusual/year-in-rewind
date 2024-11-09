import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  distDir: 'dist',
  trailingSlash: false,
  assetPrefix: '.',
  images: {
    unoptimized: true
  }
};

export default nextConfig;
