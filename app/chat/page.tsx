import { Metadata } from "next";
import { useTranslations } from "next-intl";

import Container from "@/common/components/elements/Container";
import PageHeading from "@/common/components/elements/PageHeading";
import { METADATA } from "@/common/constants/metadata";
import ChatRoom from "@/modules/chat";

export const metadata: Metadata = {
  title: `Chat ${METADATA.exTitle}`,
  description: `Chat with ${METADATA.creator}`,
  alternates: {
    canonical: `${process.env.DOMAIN}/chat`,
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
