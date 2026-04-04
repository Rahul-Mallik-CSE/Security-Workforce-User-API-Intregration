/** @format */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "10.10.12.21",
    "https://portal.securiverse.com.au/",
    "portal.securiverse.com.au",
    "http://localhost:3000",
  ],
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.securiverse.com.au",
        pathname: "/media/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;
