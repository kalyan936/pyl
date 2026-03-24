/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Static export for GitHub Pages
  trailingSlash: true,
  images: {
    unoptimized: true,  // Required for static export
  },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
};

module.exports = nextConfig;
