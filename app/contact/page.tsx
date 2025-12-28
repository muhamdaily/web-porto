import { Metadata } from "next";
import { useTranslations } from "next-intl";

import Container from "@/common/components/elements/Container";
import PageHeading from "@/common/components/elements/PageHeading";
import Contact from "@/modules/contact";
import { METADATA } from "@/common/constants/metadata";

export const metadata: Metadata = {
  title: `Contact ${METADATA.exTitle}`,
  description: `Get in touch with ${METADATA.creator} for web development projects, freelance opportunities, or collaboration inquiries. Connect via email, social media, or contact form for quick responses.`,
  keywords: "Contact Developer, Hire Web Developer, Freelance Developer, Web Development Services, Contact Muhammad Mauribi",
  alternates: {
    canonical: `${process.env.DOMAIN}/contact`,
  },
  openGraph: {
    title: `Contact — ${METADATA.creator}`,
    description: `Get in touch with ${METADATA.creator} for web development projects and collaboration opportunities.`,
    url: `${process.env.DOMAIN}/contact`,
    type: "website",
  },
};

const ContactPage = () => {
  const t = useTranslations("ContactPage");

  return (
    <Container data-aos="fade-up">
      <PageHeading title={t("title")} description={t("description")} />
      <Contact />
    </Container>
  );
};

export default ContactPage;
