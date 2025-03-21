import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
  images: {
    domains: ["avatars.githubusercontent.com", "lh3.googleusercontent.com", "i.ibb.co.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
