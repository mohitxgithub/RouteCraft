/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['source.unsplash.com', 'api.dicebear.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://restcountries.com/v3.1/:path*',
      },
    ]
  },
}

module.exports = nextConfig

