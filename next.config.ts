import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // i18n is removed as it's incompatible with static exports
  // We'll handle RTL and Hebrew support at the component level instead
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
};

export default nextConfig;
