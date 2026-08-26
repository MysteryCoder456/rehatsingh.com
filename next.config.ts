import type { NextConfig } from "next";

const noCacheHeaders = async () => {
  const headers = [
    {
      key: "Cache-Control",
      value: "no-store, no-cache, must-revalidate, proxy-revalidate",
    },
    {
      key: "Pragma",
      value: "no-cache",
    },
    {
      key: "Expires",
      value: "0",
    },
  ];

  return [
    {
      source: "/:path*.css",
      headers,
    },
    {
      source: "/:path*.js",
      headers,
    },
  ];
};

const nextConfig: NextConfig = {
  /* config options here */
  headers: process.env.NODE_ENV === "development" ? noCacheHeaders : undefined,
  images: {
    remotePatterns: [
      {
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
