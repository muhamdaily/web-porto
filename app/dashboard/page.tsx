import { Metadata } from "next";
import { useTranslations } from "next-intl";

import Container from "@/common/components/elements/Container";
import PageHeading from "@/common/components/elements/PageHeading";
import Dashboard from "@/modules/dashboard/components/Dashboard";
import { METADATA } from "@/common/constants/metadata";

export const metadata: Metadata = {
  title: `Dashboard`,
  description: `View ${METADATA.creator}'s real-time developer activity dashboard. Track coding stats, GitHub contributions, Spotify listening activity, and daily development metrics all in one place.`,
  keywords: "Developer Dashboard, GitHub Stats, Coding Activity, Developer Metrics, Programming Statistics, Spotify Now Playing",
  alternates: {
    canonical: `${process.env.DOMAIN}/dashboard`,
  },
  openGraph: {
    title: `Dashboard — ${METADATA.creator}`,
    description: `View ${METADATA.creator}'s real-time developer activity dashboard with coding stats and GitHub contributions.`,
    url: `${process.env.DOMAIN}/dashboard`,
    type: "website",
  },
};

const DashboardPage = () => {
  const t = useTranslations("DashboardPage");

  return (
    <Container data-aos="fade-up">
      <PageHeading title={t("title")} description={t("description")} />
      <Dashboard />
    </Container>
  );
};

export default DashboardPage;
