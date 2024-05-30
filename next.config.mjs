/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  },
  images: {
    remotePatterns: [
      {
        hostname: 'picsum.photos',
      },
      {
        hostname: 'images.seatlabnft.com',
      },
      {
        hostname: 'gateway.pinata.cloud',
      },
      {
        hostname: 'ipfs.io',
      },
    ],
  },
};

export default nextConfig;
