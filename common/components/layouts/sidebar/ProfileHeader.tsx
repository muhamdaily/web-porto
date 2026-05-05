import Link from "next/link";
import NextImage from "next/image";
import { MdVerified as VerifiedIcon } from "react-icons/md";

import ThemeToggle from "./ThemeToggle";
import IntlToggle from "./IntlToggle";
import Tooltip from "../../elements/Tooltip";
import Image from "../../elements/Image";

import cn from "@/common/libs/clsxm";

interface ProfileHeaderProps {
  expandMenu: boolean;
  imageSize: number;
}

const ProfileHeader = ({ expandMenu, imageSize }: ProfileHeaderProps) => {
  const avatarSize = expandMenu ? 80 : imageSize * 0.9;

  return (
    <div
      className={cn(
        "flex w-full flex-grow items-center gap-2 lg:flex-col lg:gap-0.5",
        expandMenu && "flex-col !items-start",
      )}
    >
      <div
        className="relative inline-flex items-center justify-center overflow-visible"
        style={{ width: avatarSize, height: avatarSize }}
      >
        <Image
          src={"/images/muhamdaily.jpg"}
          width={avatarSize}
          height={avatarSize}
          alt="Muhammad Mauribi"
          className="border-2 border-neutral-400 dark:border-neutral-600 lg:hover:scale-105"
          rounded="rounded-full"
        />
        <NextImage
          src="/border.png"
          alt="Open to work"
          fill
          sizes="(min-width: 1024px) 120px, 0px"
          className="pointer-events-none absolute inset-0 hidden scale-[1] lg:block"
        />
      </div>

      <div className="mt-1 flex items-center gap-1.5 lg:mt-4 lg:gap-2">
        <Link href="/" passHref>
          <h2 className="flex-grow text-xs font-medium lg:text-base whitespace-nowrap">
            Muhammad Mauribi
          </h2>
        </Link>

        <Tooltip title="Verified">
          <VerifiedIcon size={14} className="text-blue-400 flex-shrink-0 lg:w-[18px] lg:h-[18px]" />
        </Tooltip>
      </div>

      <div className="hidden text-sm text-neutral-600 transition-all duration-300 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-400 lg:flex">
        @muhamdaily
      </div>

      <div className="hidden justify-between gap-2 lg:mt-4 lg:flex lg:gap-6">
        <IntlToggle />
        <ThemeToggle />
      </div>
    </div>
  );
};

export default ProfileHeader;