import { Metadata } from "next";
import { useTranslations } from "next-intl";

import Container from "@/common/components/elements/Container";
import PageHeading from "@/common/components/elements/PageHeading";
import About from "@/modules/about";
import { METADATA } from "@/common/constants/metadata";

export const metadata: Metadata = {
  title: `About`,
  description: `Learn more about ${METADATA.creator}, a passionate web developer specializing in creating responsive and dynamic software solutions. Discover my journey, skills, and experiences in frontend and backend development.`,
  keywords: "About Muhammad Mauribi, Web Developer Background, Software Engineer Story, Developer Journey, Tech Skills",
  alternates: {
    canonical: `${process.env.DOMAIN}/about`,
  },
  openGraph: {
    title: `About ${METADATA.creator}`,
    description: `Learn more about ${METADATA.creator}, a passionate web developer specializing in creating responsive and dynamic software solutions.`,
    url: `${process.env.DOMAIN}/about`,
    type: "profile",
  },
};

const AboutPage = () => {
  const t = useTranslations("AboutPage");

  return (
    <Container data-aos="fade-up">
      <PageHeading title={t("title")} description={t("description")} />
      <About />
    </Container>
  );
};

export default AboutPage;
