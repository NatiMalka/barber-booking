import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // i18n is removed as it's incompatible with static exports
  // We'll handle RTL and Hebrew support at the component level instead
  reactStrictMode: true,
  swcMinify: true,
  // Enable static exports for GitHub Pages
  output: 'export',
  // Set the base path to the repository name for GitHub Pages
  basePath: '/barber-booking',
  // Disable image optimization since it's not compatible with static exports
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
