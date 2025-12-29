import { useTranslations } from "next-intl";
import { BiTime as TimeIcon } from "react-icons/bi";
import { BsCalendar3 as DateIcon } from "react-icons/bs";
import { BiCategory as CategoryIcon } from "react-icons/bi";

import Image from "@/common/components/elements/Image";
import MDXComponent from "@/common/components/elements/MDXComponent";
import { BlogItem } from "@/common/types/blog";
import BlogShare from "./BlogShare";
import BlogComments from "./BlogComments";

const BlogDetail = ({
    title,
    slug,
    image,
    category,
    tags,
    description,
    content,
    reading_time_minutes,
    created_at,
    updated_at,
}: BlogItem) => {
    const t = useTranslations("BlogPage");

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <div className="space-y-8">
            {/* Article Meta Information */}
            <div className="flex flex-wrap items-center gap-4 rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
                <div className="flex items-center gap-2">
                    <CategoryIcon className="text-green-600 dark:text-green-500" size={18} />
                    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        {category}
                    </span>
                </div>

                <div className="h-4 w-px bg-neutral-300 dark:bg-neutral-700" />

                <div className="flex items-center gap-2">
                    <DateIcon className="text-neutral-600 dark:text-neutral-400" size={16} />
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                        {formatDate(created_at)}
                    </span>
                </div>

                <div className="h-4 w-px bg-neutral-300 dark:bg-neutral-700" />

                <div className="flex items-center gap-2">
                    <TimeIcon className="text-neutral-600 dark:text-neutral-400" size={18} />
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                        {reading_time_minutes} min read
                    </span>
                </div>

                {updated_at && updated_at !== created_at && (
                    <>
                        <div className="h-4 w-px bg-neutral-300 dark:bg-neutral-700" />
                        <span className="text-xs text-neutral-500 dark:text-neutral-500">
                            Updated: {formatDate(updated_at)}
                        </span>
                    </>
                )}
            </div>

            {/* Tags */}
            {tags && tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        {t("tags")}:
                    </span>
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag: string, index: number) => (
                            <span
                                key={index}
                                className="rounded-full bg-neutral-200 px-3 py-1 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Featured Image */}
            <div className="overflow-hidden rounded-xl">
                <Image
                    src={image}
                    alt={title}
                    width={1200}
                    height={600}
                    className="transition duration-500 hover:scale-[1.04]"
                />
            </div>

            {/* Article Content */}
            {content ? (
                <div className="mt-5 space-y-6 leading-[1.8] dark:text-neutral-300">
                    <MDXComponent>{content}</MDXComponent>
                </div>
            ) : (
                <div className="rounded-lg border border-neutral-200 p-8 text-center dark:border-neutral-800">
                    <p className="text-neutral-500 dark:text-neutral-400">
                        {t("no_content")}
                    </p>
                </div>
            )}

            {/* Share Section */}
            <div className="border-t border-neutral-200 pt-8 dark:border-neutral-800">
                <BlogShare title={title} slug={slug} description={description} />
            </div>

            {/* Comments Section */}
            <div className="border-t border-neutral-200 pt-8 dark:border-neutral-800">
                <BlogComments slug={slug} />
            </div>
        </div>
    );
};

export default BlogDetail;