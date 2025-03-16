import type { NextConfig } from "next";
module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
};

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains:["avatars.githubusercontent.com","lh3.googleusercontent.com"]
  }
};

export default nextConfig;
