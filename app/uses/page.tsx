import type { Metadata } from "next";
import { useTranslations } from "next-intl";

import Container from "@/common/components/elements/Container";
import PageHeading from "@/common/components/elements/PageHeading";
import Uses from "@/modules/uses/components/Uses";
import { METADATA } from "@/common/constants/metadata";

export const metadata: Metadata = {
  title: "Uses",
  description: `Tools, apps, and tech stack used by ${METADATA.creator}.`,
  alternates: {
    canonical: `${process.env.DOMAIN}/uses`,
  },
  openGraph: {
    title: `Uses — ${METADATA.creator}`,
    description: `Tools, apps, and tech stack used by ${METADATA.creator}.`,
    url: `${process.env.DOMAIN}/uses`,
    type: "website",
  },
};

const UsesPage = () => {
  const t = useTranslations("UsesPage");

  return (
    <Container data-aos="fade-up">
      <PageHeading title={t("title")} description={t("description")} />
      <Uses />
    </Container>
  );
};

export default UsesPage;
