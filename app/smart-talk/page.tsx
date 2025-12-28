import { Metadata } from "next";
import { useTranslations } from "next-intl";

import Container from "@/common/components/elements/Container";
import PageHeading from "@/common/components/elements/PageHeading";
import SmartTalk from "@/modules/smarttalk";
import { METADATA } from "@/common/constants/metadata";

export const metadata: Metadata = {
  title: `Smart Talk ${METADATA.exTitle}`,
  description: `Engage in AI-powered conversations with Smart Talk. An intelligent chat interface built by ${METADATA.creator} that demonstrates modern web development capabilities and AI integration.`,
  keywords: "AI Chat, Smart Talk, Chatbot, AI Integration, Interactive Chat Interface",
  alternates: {
    canonical: `${process.env.DOMAIN}/smart-talk`,
  },
  openGraph: {
    title: `Smart Talk — ${METADATA.creator}`,
    description: `Engage in AI-powered conversations with Smart Talk, an intelligent chat interface built by ${METADATA.creator}.`,
    url: `${process.env.DOMAIN}/smart-talk`,
    type: "website",
  },
};

const SmartTalkPage = () => {
  const t = useTranslations("SmartTalkPage");

  return (
    <Container data-aos="fade-up">
      <PageHeading title={t("title")} description={t("description")} />
      <SmartTalk />
    </Container>
  );
};

export default SmartTalkPage;
