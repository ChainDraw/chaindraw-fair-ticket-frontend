/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "",
      },
      {
        protocol: "https",
        hostname: "images.seatlabnft.com",
        port: "",
        pathname: "",
      },
    ],
  },
};

export default nextConfig;
