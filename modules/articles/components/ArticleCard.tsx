import Link from "next/link";
import { HiOutlineEye, HiOutlineCalendar, HiOutlineUser } from "react-icons/hi";
import { useTranslations } from "next-intl";
import { FiClock as ClockIcon } from "react-icons/fi";

import Image from "@/common/components/elements/Image";
import SpotlightCard from "@/common/components/elements/SpotlightCard";
import { ArticleItem } from "@/common/types/articles";
import { formatDate, estimateReadingTime } from "@/common/helpers";

const ArticleCard = ({
    title,
    slug,
    description,
    image,
    author,
    created_at,
    total_views,
    is_featured,
}: ArticleItem) => {
    const t = useTranslations("ArticlesPage");

    const trimmedDescription = description
        ? description.slice(0, 43) + (description.length > 43 ? "..." : "")
        : "";
    const displayDate = created_at ? formatDate(created_at, "dd MMM yyyy") : "";
    const totalViews = total_views ?? 0;
    const readingTime = estimateReadingTime(description || title || "");

    return (
        <SpotlightCard className="group relative cursor-pointer">
            <Link
                href={`/articles/${slug}`}
                className="absolute inset-0 z-0 rounded-2xl"
                aria-label={title}
            >
                <span className="sr-only">{title}</span>
            </Link>

            {is_featured && (
                <div className="pointer-events-none absolute right-0 top-0 z-30 rounded-bl-lg rounded-tr-lg bg-green-500 px-2 py-1 text-xs font-semibold text-neutral-900 shadow-sm">
                    {t("featured")}
                </div>
            )}

            <div className="relative z-10 pointer-events-none">
                <Image
                    src={image || "/images/meta-thumbnail.png"}
                    alt={title}
                    width={450}
                    height={220}
                    className="h-[200px] w-full rounded-t-xl object-cover"
                />
            </div>

            <div className="relative z-10 space-y-3 p-5 pointer-events-none">
                <h3
                    className="text-sm text-neutral-700 transition-all duration-300 dark:text-neutral-300 group-hover:text-green-500"
                    style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                    }}
                >
                    {title}
                </h3>
                <p
                    className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400"
                    style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                    }}
                >
                    {trimmedDescription}
                </p>
                <div className="flex items-center gap-3 overflow-hidden pt-2 text-[11px] text-neutral-500 dark:text-neutral-400">
                    <span className="flex shrink-0 items-center gap-1">
                        <HiOutlineUser size={14} />
                        <span className="max-w-[110px] truncate sm:max-w-none">
                            {author || t("anonymous")}
                        </span>
                    </span>
                    <span className="flex shrink-0 items-center gap-1 text-[11px] text-neutral-500 dark:text-neutral-400">
                        <ClockIcon size={12} />
                        {readingTime}
                    </span>
                    <span className="flex shrink-0 items-center gap-1">
                        <HiOutlineEye size={14} />
                        {totalViews} {t("views")}
                    </span>
                </div>
            </div>
        </SpotlightCard>
    );
};

export default ArticleCard;
