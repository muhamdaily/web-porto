import { Metadata } from "next";
import { useTranslations } from "next-intl";

import Container from "@/common/components/elements/Container";
import PageHeading from "@/common/components/elements/PageHeading";
import Projects from "@/modules/projects";
import { METADATA } from "@/common/constants/metadata";

export const metadata: Metadata = {
  title: `Projects ${METADATA.exTitle}`,
  description: `Explore ${METADATA.creator}'s portfolio of web development projects. From responsive websites to dynamic web applications, see real-world examples of frontend and backend development work using React, Next.js, TypeScript, and more.`,
  keywords: "Portfolio Projects, Web Development Projects, React Projects, Next.js Applications, Frontend Portfolio, Fullstack Projects, JavaScript Projects",
  alternates: {
    canonical: `${process.env.DOMAIN}/projects`,
  },
  openGraph: {
    title: `Projects — ${METADATA.creator}`,
    description: `Explore ${METADATA.creator}'s portfolio of web development projects featuring React, Next.js, and modern web technologies.`,
    url: `${process.env.DOMAIN}/projects`,
    type: "website",
  },
};

const ProjectsPage = () => {
  const t = useTranslations("ProjectsPage");

  return (
    <Container data-aos="fade-up">
      <PageHeading title={t("title")} description={t("description")} />
      <Projects />
    </Container>
  );
};

export default ProjectsPage;
