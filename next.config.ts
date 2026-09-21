import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "172.16.194.103",
    "192.168.137.1",
    "172.29.96.1",
    "localhost",
  ],
};

export default nextConfig;
