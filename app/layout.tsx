import NextTopLoader from "nextjs-toploader";
import Script from "next/script";
import { getServerSession } from "next-auth";
import { Analytics } from "@vercel/analytics/react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";

import Layouts from "@/common/components/layouts";
import ThemeProviderContext from "@/common/stores/theme";
import NextAuthProvider from "@/SessionProvider";
import { METADATA } from "@/common/constants/metadata";
import { onestSans } from "@/common/styles/fonts";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.DOMAIN || "",
  ),
  title: {
    default: METADATA.title,
    template: `%s ${METADATA.exTitle}`,
  },
  description: METADATA.description,
  keywords: METADATA.keyword,
  creator: METADATA.creator,
  authors: {
    name: METADATA.creator,
    url: METADATA.openGraph.url,
  },
  openGraph: {
    type: "website",
    locale: METADATA.openGraph.locale,
    url: METADATA.openGraph.url,
    siteName: METADATA.openGraph.siteName,
    title: METADATA.openGraph.title,
    description: METADATA.openGraph.description,
    images: [
      {
        url: METADATA.openGraph.image,
        width: 1200,
        height: 630,
        alt: METADATA.creator,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: METADATA.twitter.title,
    description: METADATA.twitter.description,
    creator: METADATA.twitter.creator,
    images: [METADATA.twitter.image],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const RootLayout = async ({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) => {
  const messages = await getMessages();
  const session = await getServerSession();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Muhammad Mauribi",
    url: process.env.DOMAIN,
    jobTitle: "Web Developer",
    description: METADATA.description,
    image: `${process.env.DOMAIN}${METADATA.profile}`,
    sameAs: [
      "https://github.com/muhamdaily",
      "https://www.linkedin.com/in/muhammadmauribi"
    ],
  };


  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <Script
        defer
        src="https://cloud.umami.is/script.js"
        data-website-id="b8fdcb7f-9553-489a-854a-b0849f3e6584"
      ></Script>
      <body className={onestSans.className}>
        <NextTopLoader
          color="#4ade80"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #4ade80,0 0 5px #86efac"
        />
        <NextIntlClientProvider messages={messages}>
          <NextAuthProvider session={session}>
            <ThemeProviderContext>
              <Layouts>{children}</Layouts>
            </ThemeProviderContext>
          </NextAuthProvider>
        </NextIntlClientProvider>
        <Analytics />
        <Toaster position="top-right" />
      </body>
    </html>
  );
};

export default RootLayout;
