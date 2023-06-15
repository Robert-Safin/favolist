/** @type {import('next').NextConfig} */



const nextConfig = {
  // experimental: {
  //   largePageDataBytes: 400 * 100000,
  // },
  env: {
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
    MONGO_USER: process.env.MONGO_USER,
    MONGO_CLUSTER: process.env.MONGO_CLUSTER,
    MONGO_DATABASE: process.env.MONGO_DATABASE,

    GITHUB_SECRET_ID: process.env.GITHUB_SECRET_ID,
    GITHUB_SECRET_CLIENT: process.env.GITHUB_SECRET_CLIENT,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,

    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/u/**",
      },
      {
        protocol: "https",
        hostname: "ouraring-images.imgix.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "speaking.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  reactStrictMode: true,
};
const withPWA = require("next-pwa");
module.exports = withPWA({
	pwa: {
		dest: "public",
		register: true,
        disable: process.env.NODE_ENV ===      'development',
		skipWaiting: true,
	},
});

module.exports = nextConfig;
