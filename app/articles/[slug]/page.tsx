import { Metadata } from "next";

import BackButton from "@/common/components/elements/BackButton";
import Container from "@/common/components/elements/Container";
import PageHeading from "@/common/components/elements/PageHeading";
import ArticleDetail from "@/modules/articles/components/ArticleDetail";
import { ArticleItem } from "@/common/types/articles";
import { METADATA } from "@/common/constants/metadata";
import { getArticleDataBySlug } from "@/services/articles";

interface ArticleDetailPageProps {
    params: { slug: string };
}

const getArticleDetail = async (slug: string): Promise<ArticleItem> => {
    const article = await getArticleDataBySlug(slug);
    return JSON.parse(JSON.stringify(article));
};

export const generateMetadata = async ({
    params,
}: ArticleDetailPageProps): Promise<Metadata> => {
    const article = await getArticleDetail(params.slug);
    const description =
        article.short_description ||
        article.excerpt?.rendered ||
        article.excerpt?.markdown ||
        METADATA.description;
    const image = article.cover_image || METADATA.openGraph.image;

    return {
        title: article.title,
        description,
        keywords: `${article.title}, Personal Articles, Blog, Notes`,
        openGraph: {
            title: `${article.title} - ${METADATA.creator}`,
            description,
            images: image ? [image] : undefined,
            url: `${METADATA.openGraph.url}/articles/${article.slug}`,
            siteName: METADATA.openGraph.siteName,
            locale: METADATA.openGraph.locale,
            type: "article",
            authors: METADATA.creator,
        },
        twitter: {
            card: "summary_large_image",
            title: `${article.title} - ${METADATA.creator}`,
            description,
            images: image ? [image] : undefined,
            creator: METADATA.twitter.creator,
        },
        alternates: {
            canonical: `${process.env.DOMAIN}/articles/${params.slug}`,
        },
    };
};

const ArticleDetailPage = async ({ params }: ArticleDetailPageProps) => {
    const data = await getArticleDetail(params.slug);
    const pageDescription =
        data.short_description || data.excerpt?.rendered || data.excerpt?.markdown;

    return (
        <Container data-aos="fade-up">
            <BackButton url="/articles" />
            <PageHeading title={data.title} description={pageDescription || ""} />
            <ArticleDetail {...data} />
        </Container>
    );
};

export default ArticleDetailPage;
