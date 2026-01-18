/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      },
      {
        protocol: 'https',
        hostname: 'streak-stats.demolab.com',
      },
      {
        protocol: 'https',
        hostname: 'github-readme-stats.vercel.app',
      },
    ],
  },
}

module.exports = nextConfig
