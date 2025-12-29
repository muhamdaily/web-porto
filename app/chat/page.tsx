import { Metadata } from "next";
import { useTranslations } from "next-intl";

import Container from "@/common/components/elements/Container";
import PageHeading from "@/common/components/elements/PageHeading";
import { METADATA } from "@/common/constants/metadata";
import ChatRoom from "@/modules/chat";

export const metadata: Metadata = {
  title: `Chat`,
  description: `Start a conversation with ${METADATA.creator}! Share your ideas, ask questions about web development, or discuss potential collaboration opportunities through this interactive chat interface.`,
  keywords: "Chat, Contact Developer, Ask Questions, Web Development Discussion, Developer Chat",
  alternates: {
    canonical: `${process.env.DOMAIN}/chat`,
  },
  openGraph: {
    title: `Chat — ${METADATA.creator}`,
    description: `Start a conversation with ${METADATA.creator} about web development and collaboration opportunities.`,
    url: `${process.env.DOMAIN}/chat`,
    type: "website",
  },
};

const ContactPage = () => {
  const t = useTranslations("ChatRoomPage");

  return (
    <Container data-aos="fade-up">
      <PageHeading title={t("title")} description={t("description")} />
      <ChatRoom />
    </Container>
  );
};

export default ContactPage;
