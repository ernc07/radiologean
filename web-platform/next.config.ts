import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Safe performance optimizations only
  compress: true,
  poweredByHeader: false,
  generateEtags: false
};

export default nextConfig;
