/** @type {import('next').NextConfig} */
const nextConfig = {
  // Multi-zone configuration
  basePath: process.env.NODE_ENV === 'production' ? '/home' : '',
  async rewrites() {
    return [
      {
        source: '/cart/:path*',
        destination: `${process.env.NEXT_PUBLIC_CART_URL || 'http://localhost:3001'}/:path*`,
      },
    ]
  },
  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
