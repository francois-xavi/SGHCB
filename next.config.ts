import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/services/eau", destination: "/services/hydraulique", permanent: true },
      { source: "/services/btp", destination: "/services/genie-civil", permanent: true },
    ];
  },
};

export default nextConfig;
