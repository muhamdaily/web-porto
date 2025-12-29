import Link from "next/link";
import { HiOutlineArrowSmRight as ViewIcon } from "react-icons/hi";
import { useTranslations } from "next-intl";
import { TbPinnedFilled as PinIcon } from "react-icons/tb";
import { BiTime as TimeIcon } from "react-icons/bi";
import { BsCalendar3 as DateIcon } from "react-icons/bs";

import Image from "@/common/components/elements/Image";
import SpotlightCard from "@/common/components/elements/SpotlightCard";
import { BlogItem } from "@/common/types/blog";

const BlogCard = ({
    title,
    slug,
    description,
    image,
    category,
    tags,
    is_featured,
    reading_time_minutes,
    created_at,
}: BlogItem) => {
    const t = useTranslations("BlogPage");

    const trimmedContent =
        description.slice(0, 100) + (description.length > 100 ? "..." : "");

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <Link href={`/blog/${slug}`}>
            <SpotlightCard className="group relative h-full cursor-pointer">
                {is_featured && (
                    <div className="absolute right-0 top-0 z-10 flex items-center gap-x-1 rounded-bl-lg rounded-tr-lg bg-cyan-500 px-2 py-1 text-sm font-medium text-neutral-900">
                        <PinIcon size={15} />
                        <span>Featured</span>
                    </div>
                )}
                <div className="relative">
                    <Image
                        src={image}
                        alt={title}
                        width={400}
                        height={200}
                        className="h-[200px] w-full rounded-t-xl object-cover"
                    />
                    <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center gap-1 rounded-t-xl bg-black text-sm font-medium text-neutral-50 opacity-0 transition-opacity duration-300 group-hover:opacity-80">
                        <span>{t("read_article")}</span>
                        <ViewIcon size={20} />
                    </div>
                </div>
                <div className="flex flex-col space-y-3 p-5">
                    <div className="flex items-center justify-between gap-2">
                        <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-600 dark:text-green-500">
                            {category}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400">
                            <TimeIcon size={14} />
                            <span>{reading_time_minutes} min read</span>
                        </div>
                    </div>

                    <h3 className="line-clamp-2 cursor-pointer text-lg font-semibold text-neutral-700 transition-all duration-300 dark:text-neutral-300">
                        {title}
                    </h3>

                    <p className="line-clamp-3 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                        {trimmedContent}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                        {tags.slice(0, 3).map((tag: string, index: number) => (
                            <span
                                key={index}
                                className="text-xs text-neutral-500 dark:text-neutral-400"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center gap-1 border-t border-neutral-200 pt-3 text-xs text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
                        <DateIcon size={12} />
                        <span>{formatDate(created_at)}</span>
                    </div>
                </div>
            </SpotlightCard>
        </Link>
    );
};

export default BlogCard;