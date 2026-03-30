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
      afterFiles: [
        {
          source: "/links/_next/image",
          destination: "https://muhamdaily-links.vercel.app/links/_next/image",
        },
        {
          source: "/links",
          destination: "https://muhamdaily-links.vercel.app/links",
        },
        {
          source: "/links/:path*",
          destination: "https://muhamdaily-links.vercel.app/links/:path*",
        },
      ],
    };
  },
};

export default withNextIntl(nextConfig);