/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Statik export için aktif!
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;