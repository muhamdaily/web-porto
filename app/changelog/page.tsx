import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import Container from "@/common/components/elements/Container";
import PageHeading from "@/common/components/elements/PageHeading";
import Changelog from "@/modules/changelog/components/Changelog";
import { METADATA } from "@/common/constants/metadata";

export const metadata: Metadata = {
    title: "Changelog",
    description: `Release notes and updates from ${METADATA.creator}.`,
    alternates: {
        canonical: `${process.env.DOMAIN}/changelog`,
    },
    openGraph: {
        title: `Changelog — ${METADATA.creator}`,
        description: `Release notes and updates from ${METADATA.creator}.`,
        url: `${process.env.DOMAIN}/changelog`,
        type: "website",
    },
};

const ChangelogPage = async () => {
    const t = await getTranslations("ChangelogPage");

    return (
        <Container data-aos="fade-up">
            <PageHeading title={t("title")} description={t("description")} />
            <Changelog />
        </Container>
    );
};

export default ChangelogPage;
