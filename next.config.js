/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   largePageDataBytes: 400 * 100000,
  // },
  env: {
    MONGO_PASSWORD: "banana123",
    MONGO_USER: "admin",
    MONGO_CLUSTER: "cluster0",
    MONGO_DATABASE: "favolist",

    GITHUB_SECRET_ID: "13f08b92c5ae4e6923f7",
    GITHUB_SECRET_CLIENT: "76fa3b8f54cddf28c11362fb9be43dc7ea9387ab",
    NEXTAUTH_URL: "http://localhost:3000",
    NEXTAUTH_SECRET: "banana",

    CLOUDINARY_API_KEY: "396848765696647",
    CLOUDINARY_API_SECRET: "Z3QtiZ53WrxdUNOKdhJm0POmXdg",
    CLOUDINARY_CLOUD_NAME: "dxgkclowd",
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

module.exports = nextConfig;
