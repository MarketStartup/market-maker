import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    // unoptimized: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost:3010',
      },
      {
        protocol: 'https',
        hostname: 'ui.shadcn.com',
      },
      {
        protocol: 'https',
        hostname: 'market-cms.vercel.app',
      }
    ],
  },
};

export default nextConfig;
