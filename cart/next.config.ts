/** @type {import('next').NextConfig} */
const nextConfig = {
  // Multi-zone configuration
  basePath: process.env.NODE_ENV === 'production' ? '/cart' : '',
  async rewrites() {
    return [
      {
        source: '/home/:path*',
        destination: `${process.env.NEXT_PUBLIC_HOME_URL || 'http://localhost:3000'}/:path*`,
      },
      {
        source: '/products/:path*',
        destination: `${process.env.NEXT_PUBLIC_HOME_URL || 'http://localhost:3000'}/:path*`,
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
