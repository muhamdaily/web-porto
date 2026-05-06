"use client";

import { useState } from "react";
import { FiShare2 } from "react-icons/fi";
import { useTranslations } from "next-intl";

type Props = {
    title: string;
    slug: string;
    compact?: boolean;
    className?: string;
};

const ArticleShareButton = ({ title, slug, compact = false, className = "" }: Props) => {
    const t = useTranslations("ArticlesPage");
    const [isSharing, setIsSharing] = useState(false);

    const buildShareUrl = () => {
        if (typeof window === "undefined") {
            return `/articles/${slug}`;
        }

        return `${window.location.origin}/articles/${slug}`;
    };

    const handleShare = async () => {
        if (isSharing) return;

        setIsSharing(true);
        const shareUrl = buildShareUrl();

        try {
            if (navigator.share) {
                await navigator.share({
                    title,
                    text: title,
                    url: shareUrl,
                });
                return;
            }

            await navigator.clipboard.writeText(shareUrl);
        } catch (error) {
            if (error instanceof DOMException && error.name === "AbortError") {
                return;
            }

            try {
                await navigator.clipboard.writeText(shareUrl);
                return;
            } catch (clipboardError) {
                // No notification requested; fail silently.
            }
        } finally {
            setIsSharing(false);
        }
    };

    return (
        <button
            type="button"
            onClick={handleShare}
            className={`group inline-flex items-center justify-center gap-2 rounded-full border border-neutral-300 bg-neutral-100 px-2.5 py-2 text-xs font-medium text-neutral-700 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-neutral-400 hover:bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:border-neutral-600 dark:hover:bg-neutral-700 sm:px-3 sm:py-1.5 ${className}`}
            aria-label={t("share")}
            disabled={isSharing}
        >
            <FiShare2 size={14} />
            {compact ? (
                <span className="hidden max-w-0 -translate-x-1 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:max-w-20 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:max-w-20 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 sm:inline-block">
                    {t("share")}
                </span>
            ) : (
                <span className="hidden sm:inline">{t("share")}</span>
            )}
        </button>
    );
};

export default ArticleShareButton;
