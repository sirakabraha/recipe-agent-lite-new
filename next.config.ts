import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true }, // Lint blockiert den Build nicht
};

export default nextConfig;