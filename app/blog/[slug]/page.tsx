import { Metadata } from "next";

import BackButton from "@/common/components/elements/BackButton";
import Container from "@/common/components/elements/Container";
import PageHeading from "@/common/components/elements/PageHeading";
import BlogDetail from "@/modules/blog/components/BlogDetail";
import { BlogItem } from "@/common/types/blog";
import { METADATA } from "@/common/constants/metadata";
import { loadMdxFiles } from "@/common/libs/mdx";
import { getBlogDataBySlug } from "@/services/blog";

interface BlogDetailPageProps {
    params: { slug: string };
}

export const generateMetadata = async ({
    params,
}: BlogDetailPageProps): Promise<Metadata> => {
    const blog = await getBlogDetail(params?.slug);

    return {
        title: `${blog.title}`,
        description: blog.description || `Read about ${blog.title} - an article by ${METADATA.creator}. Learn about ${blog.category} and more.`,
        keywords: `${blog.title}, ${blog.tags?.join(", ")}, ${blog.category}, Tech Article, Programming Blog`,
        openGraph: {
            title: `${blog.title} — ${METADATA.creator}`,
            description: blog.description,
            images: blog.image,
            url: `${METADATA.openGraph.url}/blog/${blog.slug}`,
            siteName: METADATA.openGraph.siteName,
            locale: METADATA.openGraph.locale,
            type: "article",
            authors: METADATA.creator,
            publishedTime: blog.created_at,
        },
        twitter: {
            card: "summary_large_image",
            title: `${blog.title} — ${METADATA.creator}`,
            description: blog.description,
            images: [blog.image],
            creator: METADATA.twitter.creator,
        },
        alternates: {
            canonical: `${process.env.DOMAIN}/blog/${params.slug}`,
        },
    };
};

const getBlogDetail = async (slug: string): Promise<BlogItem> => {
    const blog = await getBlogDataBySlug(slug);
    const contents = loadMdxFiles();
    const content = contents.find((item) => item.slug === slug);
    const response = { ...blog, content: content?.content };
    const data = JSON.parse(JSON.stringify(response));
    return data;
};

const BlogDetailPage = async ({ params }: BlogDetailPageProps) => {
    const data = await getBlogDetail(params?.slug);

    const PAGE_TITLE = data?.title;
    const PAGE_DESCRIPTION = data?.description;

    return (
        <Container data-aos="fade-up">
            <BackButton url="/blog" />
            <PageHeading title={PAGE_TITLE} description={PAGE_DESCRIPTION} />
            <BlogDetail {...data} />
        </Container>
    );
};

export default BlogDetailPage;