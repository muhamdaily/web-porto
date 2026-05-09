import { Metadata } from "next";

import BackButton from "@/common/components/elements/BackButton";
import Container from "@/common/components/elements/Container";
import PageHeading from "@/common/components/elements/PageHeading";
import { loadMdxFiles } from "@/common/libs/mdx";
import ArticleDetail from "@/modules/articles/components/ArticleDetail";
import { ArticleItem } from "@/common/types/articles";
import { METADATA } from "@/common/constants/metadata";
import { getArticleDataBySlug } from "@/services/articles";
import { cache } from "react";

interface ArticleDetailPageProps {
    params: { slug: string };
}

const getArticleDetail = cache(async (slug: string): Promise<ArticleItem> => {
    const article = await getArticleDataBySlug(slug);
    const contents = loadMdxFiles("articles");
    const content = contents.find((item) => item.slug === slug);

    return JSON.parse(
        JSON.stringify({
            ...article,
            content: content?.content ?? null,
        }),
    );
});

export const generateMetadata = async ({
    params,
}: ArticleDetailPageProps): Promise<Metadata> => {
    const article = await getArticleDetail(params.slug);
    const description =
        article.description ||
        METADATA.description;
    const image = article.image || METADATA.openGraph.image;

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
    const pageDescription = data.description;

    return (
        <Container data-aos="fade-up">
            <BackButton url="/articles" />
            <PageHeading title={data.title} description={pageDescription || ""} />
            <ArticleDetail {...data} />
        </Container>
    );
};

export default ArticleDetailPage;
