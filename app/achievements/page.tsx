import type { Metadata } from "next";
import { useTranslations } from "next-intl";

import Container from "@/common/components/elements/Container";
import PageHeading from "@/common/components/elements/PageHeading";
import Achievements from "@/modules/achievements";
import { METADATA } from "@/common/constants/metadata";

export const metadata: Metadata = {
  title: `Achievements ${METADATA.exTitle}`,
  description: `Certifications and achievements that reflect ${METADATA.creator}'s skills and experience.`,
  alternates: {
    canonical: `${process.env.DOMAIN}/achievements`,
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
