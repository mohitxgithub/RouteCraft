/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['source.unsplash.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://countriesnow.space/api/:path*',
      },
    ]
  },
}

module.exports = nextConfig