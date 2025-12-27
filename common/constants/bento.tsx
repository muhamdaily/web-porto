import dynamic from "next/dynamic";
import {
  BiUser as AboutIcon,
  BiCollection as ProjectIcon,
  BiCategory as DashboardIcon,
  BiBook as ContactIcon,
} from "react-icons/bi";
import { PiChatTeardropDotsBold as ChatRoomIcon } from "react-icons/pi";
import { PiCertificate as AchievementIcon } from "react-icons/pi";

import ChatPreview from "@/modules/home/components/Bento/ChatPreview";
import MarqueeIcons from "@/modules/home/components/Bento/MarqueeIcons";
import AchievementFolder from "@/modules/home/components/Bento/AchievementFolder";

import { BentoItemProps } from "../types/bento";

const AnimatedListProject = dynamic(() => import("@/modules/home/components/Bento/AnimatedListProject"), { ssr: false });
const StackImagesPersonal = dynamic(() => import("@/modules/home/components/Bento/StackImagesPersonal"), { ssr: false });
const TrueFocusService = dynamic(() => import("@/modules/home/components/Bento/TrueFocusService"), { ssr: false });

const size = 22;

export const getBentoItems = (t: (key: string) => string): BentoItemProps[] => [
  {
    title: t("items.projects.title"),
    description: t("items.projects.description"),
    label: t("items.projects.label"),
    icon: <ProjectIcon size={size} />,
    visual: <AnimatedListProject />,
    href: "/projects",
    colSpan: 2,
    className: "from-pink-500 to-rose-500",
    isShow: true,
  },
  {
    title: t("items.about.title"),
    description: t("items.about.description"),
    label: t("items.about.label"),
    icon: <AboutIcon size={size} />,
    visual: <StackImagesPersonal />,
    href: "/about",
    colSpan: 1,
    className: "from-indigo-500 to-purple-500",
    isShow: true,
  },
  {
    title: t("items.skills.title"),
    description: t("items.skills.description"),
    label: t("items.skills.label"),
    icon: <DashboardIcon size={size} />,
    visual: <MarqueeIcons />,
    href: "/",
    colSpan: 1,
    className: "from-emerald-400 to-green-600",
    isShow: true,
  },
  {
    title: t("items.achievements.title"),
    description: t("items.achievements.description"),
    label: t("items.achievements.label"),
    icon: <AchievementIcon size={size} />,
    visual: <AchievementFolder />,
    href: "/achievements",
    colSpan: 1,
    className: "from-yellow-400 to-orange-500",
    isShow: true,
  },
  {
    title: t("items.chat.title"),
    description: t("items.chat.description"),
    label: t("items.chat.label"),
    icon: <ChatRoomIcon size={size} />,
    visual: <ChatPreview />,
    href: "/chat",
    colSpan: 1,
    className: "from-gray-700 to-gray-900",
    isShow: true,
  },
  {
    title: t("items.services.title"),
    description: t("items.services.description"),
    label: t("items.services.label"),
    icon: <ContactIcon size={size} />,
    visual: <TrueFocusService />,
    href: "/",
    colSpan: 2,
    className: "from-cyan-400 to-blue-600",
    isShow: true,
  },
];