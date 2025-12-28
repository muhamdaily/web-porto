import type { Metadata } from "next";
import { useTranslations } from "next-intl";

import Container from "@/common/components/elements/Container";
import PageHeading from "@/common/components/elements/PageHeading";
import Achievements from "@/modules/achievements";
import { METADATA } from "@/common/constants/metadata";

export const metadata: Metadata = {
  title: `Achievements ${METADATA.exTitle}`,
  description: `Explore the certifications, awards, and professional achievements of ${METADATA.creator}. View credentials that demonstrate expertise in web development, programming, and software engineering.`,
  keywords: "Certifications, Achievements, Awards, Professional Development, Web Developer Credentials, Programming Certificates",
  alternates: {
    canonical: `${process.env.DOMAIN}/achievements`,
  },
  openGraph: {
    title: `Achievements — ${METADATA.creator}`,
    description: `Explore the certifications, awards, and professional achievements of ${METADATA.creator}.`,
    url: `${process.env.DOMAIN}/achievements`,
    type: "website",
  },
};

const AchievementsPage = () => {
  const t = useTranslations("AchievementsPage");

  return (
    <Container data-aos="fade-up">
      <PageHeading title={t("title")} description={t("description")} />
      <Achievements />
    </Container>
  );
};

export default AchievementsPage;
