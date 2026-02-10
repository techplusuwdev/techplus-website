import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
    unoptimized: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Empty turbopack config to enable Turbopack in Next.js 16
  turbopack: {},
};

export default nextConfig;

