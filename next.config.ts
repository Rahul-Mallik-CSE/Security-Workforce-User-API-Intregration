/** @format */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
