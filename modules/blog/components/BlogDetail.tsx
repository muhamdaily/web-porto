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
            <div className="overflow-hidden rounded-xl mb-12">
                <Image
                    src={image}
                    alt={title}
                    width={1200}
                    height={600}
                    className="transition duration-500 hover:scale-[1.02]"
                />
            </div>

            {/* Article Content */}
            {content ? (
                <article className="prose prose-lg prose-neutral max-w-none dark:prose-invert 
                    [&>h2:first-child]:mt-0
                    prose-headings:scroll-mt-20 prose-headings:font-bold prose-headings:tracking-tight
                    prose-h1:text-4xl prose-h1:mt-12 prose-h1:mb-6
                    prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-6 prose-h2:border-b prose-h2:border-neutral-200 dark:prose-h2:border-neutral-800 prose-h2:pb-3
                    prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                    prose-h4:text-xl prose-h4:mt-6 prose-h4:mb-3
                    prose-p:text-base prose-p:leading-8 prose-p:my-5 prose-p:text-neutral-600 dark:prose-p:text-neutral-400
                    prose-ul:my-6 prose-ul:space-y-3 prose-ul:list-disc prose-ul:pl-6
                    prose-ol:my-6 prose-ol:space-y-3 prose-ol:list-decimal prose-ol:pl-6
                    prose-li:text-neutral-600 dark:prose-li:text-neutral-400 prose-li:leading-7 prose-li:my-2
                    prose-strong:font-semibold prose-strong:text-neutral-800 dark:prose-strong:text-neutral-200
                    prose-a:text-green-600 dark:prose-a:text-green-500 prose-a:no-underline hover:prose-a:underline prose-a:font-medium
                    prose-code:text-sm prose-code:font-mono prose-code:text-green-600 dark:prose-code:text-green-400 prose-code:bg-neutral-100 dark:prose-code:bg-neutral-900 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
                    prose-pre:my-8 prose-pre:bg-neutral-900 dark:prose-pre:bg-neutral-950 prose-pre:p-6 prose-pre:rounded-xl prose-pre:border prose-pre:border-neutral-800
                    prose-blockquote:my-8 prose-blockquote:border-l-4 prose-blockquote:border-green-500 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-neutral-600 dark:prose-blockquote:text-neutral-400
                    prose-hr:my-12 prose-hr:border-neutral-300 dark:prose-hr:border-neutral-700
                    prose-img:my-8 prose-img:rounded-xl">
                    <MDXComponent>{content}</MDXComponent>
                </article>
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