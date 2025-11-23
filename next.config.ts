import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
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
