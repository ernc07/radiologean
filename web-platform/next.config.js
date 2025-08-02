/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
  // exportPathMap App Router'da kullanılmaz
  // generateStaticParams() fonksiyonu kullanılır
};

module.exports = nextConfig;