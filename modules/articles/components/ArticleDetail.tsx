import { useTranslations } from "next-intl";
import { HiOutlineEye, HiOutlineCalendar, HiOutlineUser } from "react-icons/hi";

import Image from "@/common/components/elements/Image";
import MDXComponent from "@/common/components/elements/MDXComponent";
import EmptyState from "@/common/components/elements/EmptyState";
import { ArticleItem } from "@/common/types/articles";
import { formatDate } from "@/common/helpers";
import dynamic from "next/dynamic";
import ArticleShareButton from "./ArticleShareButton";

const ViewRecorder = dynamic(() => import("./ViewRecorder"), { ssr: false });

const ArticleDetail = ({
    slug,
    title,
    image,
    created_at,
    author,
    total_views,
    categories,
    tags,
    content,
}: ArticleItem) => {
    const t = useTranslations("ArticlesPage");
    const displayDate = created_at ? formatDate(created_at, "dd MMM yyyy") : "";
    const totalViews = total_views ?? 0;
    const markdownContent = content || "";

    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <div className="flex flex-nowrap items-center gap-2 overflow-hidden text-[11px] text-neutral-500 dark:text-neutral-400 sm:flex-wrap sm:gap-4 sm:text-sm">
                    <span className="flex shrink-0 items-center gap-1">
                        <HiOutlineUser size={16} />
                        <span className="max-w-[130px] truncate sm:max-w-none">
                            {author || t("anonymous")}
                        </span>
                    </span>
                    <span className="flex shrink-0 items-center gap-1">
                        <HiOutlineCalendar size={16} />
                        {displayDate}
                    </span>
                    <span className="flex shrink-0 items-center gap-1">
                        <HiOutlineEye size={16} />
                        {totalViews} {t("views")}
                    </span>
                </div>

                {image ? (
                    <div className="relative overflow-hidden rounded-2xl">
                        <div className="absolute right-3 top-3 z-20">
                            <ArticleShareButton
                                title={title}
                                slug={slug}
                                compact
                                className="bg-neutral-950/70 text-neutral-100 shadow-lg backdrop-blur-md hover:bg-neutral-950/85 dark:bg-neutral-950/70 dark:text-neutral-100"
                            />
                        </div>
                        <Image
                            src={image}
                            alt={title}
                            width={1200}
                            height={520}
                            className="transition duration-500 hover:scale-[1.02]"
                        />
                    </div>
                ) : null}

            </div>

            {markdownContent ? (
                <div className="mt-5 space-y-6 leading-[1.8] dark:text-neutral-300">
                    <MDXComponent>{markdownContent}</MDXComponent>
                </div>
            ) : (
                <EmptyState message={t("no_content")} />
            )}

            {/* Client-side view recorder with cookie/module guards */}
            {slug ? <ViewRecorder slug={slug} /> : null}

            {(categories?.length || tags?.length) && (
                <div className="space-y-4 border-t border-neutral-200 pt-6 dark:border-neutral-800">
                    {categories?.length ? (
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <span
                                    key={category}
                                    className="rounded-full border border-neutral-300 px-3 py-1 text-xs text-neutral-600 dark:border-neutral-700 dark:text-neutral-400"
                                >
                                    {category}
                                </span>
                            ))}
                        </div>
                    ) : null}

                    {tags?.length ? (
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full bg-neutral-200 px-3 py-1 text-xs text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    ) : null}
                </div>
            )}
        </div>
    );
};

export default ArticleDetail;
