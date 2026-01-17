/** @format */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/media/**",
      },
      {
        protocol: "http",
        hostname: "10.10.12.15",
        port: "8001",
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;
