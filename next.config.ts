import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // output: 'export',
  basePath: process.env.PAGES_BASE_PATH,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.BLOB_HOSTNAME,
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;