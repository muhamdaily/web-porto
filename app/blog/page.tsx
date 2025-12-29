import { Metadata } from "next";
import { useTranslations } from "next-intl";

import Container from "@/common/components/elements/Container";
import PageHeading from "@/common/components/elements/PageHeading";
import Blog from "@/modules/blog";
import { METADATA } from "@/common/constants/metadata";

export const metadata: Metadata = {
    title: `Blog`,
    description: `Read ${METADATA.creator}'s blog articles about web development, programming tutorials, tech insights, and software engineering best practices. Stay updated with the latest in React, Next.js, TypeScript, and modern web technologies.`,
    keywords: "Tech Blog, Web Development Blog, Programming Articles, React Tutorials, Next.js Tips, TypeScript Guide, Software Engineering Blog",
    alternates: {
        canonical: `${process.env.DOMAIN}/blog`,
    },
    openGraph: {
        title: `Blog — ${METADATA.creator}`,
        description: `Read ${METADATA.creator}'s blog articles about web development, programming, and tech insights.`,
        url: `${process.env.DOMAIN}/blog`,
        type: "website",
    },
};

const BlogPage = () => {
    const t = useTranslations("BlogPage");

    return (
        <Container data-aos="fade-up">
            <PageHeading title={t("title")} description={t("description")} />
            <Blog />
        </Container>
    );
};

export default BlogPage;