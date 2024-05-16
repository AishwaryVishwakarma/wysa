/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    // Remove console logs in production to reduce bundle size
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    remotePatterns: [
      {
        hostname: 'assets.mofoprod.net',
        protocol: 'https',
        pathname: '**',
      },
      {
        hostname: 'cloud.appwrite.io',
        protocol: 'https',
        pathname: '**',
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
