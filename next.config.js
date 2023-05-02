/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/u/**',
      },
      {
        protocol: 'https',
        hostname: 'ouraring-images.imgix.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
  reactStrictMode: true,
}

module.exports = nextConfig
