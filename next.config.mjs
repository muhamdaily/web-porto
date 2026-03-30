import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/links/:path*",
          destination: "https://muhamdaily-links.vercel.app/:path*",
        },
      ],
    };
  },
};

export default withNextIntl(nextConfig);