/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.trybloom.ai" },
      { protocol: "https", hostname: "trybloom.ai" },
    ],
  },
};

export default nextConfig;
