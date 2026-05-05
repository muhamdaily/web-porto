import { Metadata } from "next";
import { useTranslations } from "next-intl";

import Container from "@/common/components/elements/Container";
import PageHeading from "@/common/components/elements/PageHeading";
import Articles from "@/modules/articles";
import { METADATA } from "@/common/constants/metadata";

export const metadata: Metadata = {
    title: "Articles",
    description: `Personal notes and stories by ${METADATA.creator}.`,
    keywords: "Personal Articles, Blog, Notes, Writing, Web Development",
    alternates: {
        canonical: `${process.env.DOMAIN}/articles`,
    },
    openGraph: {
        title: `Articles - ${METADATA.creator}`,
        description: `Personal notes and stories by ${METADATA.creator}.`,
        url: `${process.env.DOMAIN}/articles`,
        type: "website",
    },
};

const ArticlesPage = () => {
    const t = useTranslations("ArticlesPage");

    return (
        <Container data-aos="fade-up">
            <PageHeading title={t("title")} description={t("description")} />
            <Articles />
        </Container>
    );
};

export default ArticlesPage;
