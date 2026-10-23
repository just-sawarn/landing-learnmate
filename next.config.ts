import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Shared hosts often cap processes/memory during build; keep workers minimal.
  experimental: { cpus: 1, workerThreads: false },
};

export default nextConfig;
