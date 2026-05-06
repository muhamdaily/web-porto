import Link from "next/link";
import { HiOutlineEye, HiOutlineCalendar, HiOutlineUser } from "react-icons/hi";
import { useTranslations } from "next-intl";

import Image from "@/common/components/elements/Image";
import SpotlightCard from "@/common/components/elements/SpotlightCard";
import { ArticleItem } from "@/common/types/articles";
import { formatDate } from "@/common/helpers";

const ArticleCard = ({
    title,
    slug,
    short_description,
    cover_image,
    author,
    date,
    total_views,
    is_featured,
}: ArticleItem) => {
    const t = useTranslations("ArticlesPage");

    const trimmedDescription = short_description
        ? short_description.slice(0, 43) + (short_description.length > 43 ? "..." : "")
        : "";
    const displayDate = date ? formatDate(date, "dd MMM yyyy") : "";
    const totalViews = total_views ?? 0;

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
                    src={cover_image || "/images/meta-thumbnail.png"}
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
                <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-neutral-500 dark:text-neutral-400">
                    <span className="flex items-center gap-1">
                        <HiOutlineUser size={14} />
                        {author || t("anonymous")}
                    </span>
                    <span className="flex items-center gap-1">
                        <HiOutlineCalendar size={14} />
                        {displayDate}
                    </span>
                    <span className="flex items-center gap-1">
                        <HiOutlineEye size={14} />
                        {totalViews} {t("views")}
                    </span>
                </div>
            </div>
        </SpotlightCard>
    );
};

export default ArticleCard;
