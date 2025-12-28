export const METADATA = {
  creator: "Muhammad Mauribi",
  title: "Muhammad Mauribi — Personal Website",
  description: "Hello, World! I'm Muhammad Mauribi. I work as a web developer, creating responsive and dynamic software. With my web development skills, my aim is to assist individuals or groups in making their work easier and more efficient.",
  keyword: "Muhammad Mauribi, MuhamDaily, Web Developer, Frontend Developer, Backend Developer, Fullstack Developer, Software Engineer, Programmer, JavaScript, TypeScript, React, Next.js, Node.js, Portfolio",
  authors: {
    name: "Muhammad Mauribi",
    url: process.env.DOMAIN,
  },
  openGraph: {
    url: process.env.DOMAIN,
    siteName: "Muhammad Mauribi",
    locale: "id_ID",
    title: "Muhammad Mauribi — Personal Website",
    description: "Hello, World! I'm Muhammad Mauribi. I work as a web developer, creating responsive and dynamic software. With my web development skills, my aim is to assist individuals or groups in making their work easier and more efficient.",
    image: `${process.env.DOMAIN}/images/meta-thumbnail.png`,
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Muhammad Mauribi — Personal Website",
    description: "Hello, World! I'm Muhammad Mauribi. I work as a web developer, creating responsive and dynamic software. With my web development skills, my aim is to assist individuals or groups in making their work easier and more efficient.",
    image: `${process.env.DOMAIN}/images/meta-thumbnail.png`,
    creator: "@muhamdaily",
  },
  exTitle: "— Muhammad Mauribi",
  profile: "/images/muhamdaily.jpg",
} as const;