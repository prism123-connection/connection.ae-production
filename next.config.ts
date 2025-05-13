import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images : {
      domains: ['connection-app-bucket.s3.me-central-1.amazonaws.com'],
  }
};

export default nextConfig;
