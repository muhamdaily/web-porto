"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
    FaFacebookF as FacebookIcon,
    FaTwitter as TwitterIcon,
    FaLinkedinIn as LinkedinIcon,
    FaWhatsapp as WhatsappIcon,
    FaTelegram as TelegramIcon,
} from "react-icons/fa";
import { HiLink as LinkIcon, HiCheck as CheckIcon } from "react-icons/hi";
import { BiShareAlt as ShareIcon } from "react-icons/bi";

interface BlogShareProps {
    title: string;
    slug: string;
    description?: string;
}

const BlogShare = ({ title, slug, description }: BlogShareProps) => {
    const [copied, setCopied] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const t = useTranslations("BlogPage");

    const url = typeof window !== "undefined" ? window.location.href : "";
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const encodedDescription = encodeURIComponent(description || "");

    const shareLinks = [
        {
            name: "Facebook",
            icon: <FacebookIcon size={18} />,
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            color: "hover:bg-blue-600 hover:text-white",
            bgColor: "bg-blue-50 dark:bg-blue-900/20",
        },
        {
            name: "Twitter",
            icon: <TwitterIcon size={18} />,
            url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
            color: "hover:bg-sky-500 hover:text-white",
            bgColor: "bg-sky-50 dark:bg-sky-900/20",
        },
        {
            name: "LinkedIn",
            icon: <LinkedinIcon size={18} />,
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
            color: "hover:bg-blue-700 hover:text-white",
            bgColor: "bg-blue-50 dark:bg-blue-900/20",
        },
        {
            name: "WhatsApp",
            icon: <WhatsappIcon size={18} />,
            url: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
            color: "hover:bg-green-600 hover:text-white",
            bgColor: "bg-green-50 dark:bg-green-900/20",
        },
        {
            name: "Telegram",
            icon: <TelegramIcon size={18} />,
            url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
            color: "hover:bg-blue-500 hover:text-white",
            bgColor: "bg-blue-50 dark:bg-blue-900/20",
        },
    ];

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const handleShare = (shareUrl: string) => {
        window.open(shareUrl, "_blank", "width=600,height=400");
    };

    return (
        <div className="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900/50">
            <div className="mb-4 flex items-center gap-2">
                <ShareIcon className="text-green-600 dark:text-green-500" size={20} />
                <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
                    {t("share_article")}
                </h3>
            </div>

            <div className="space-y-4">
                {/* Social Share Buttons */}
                <div className="flex flex-wrap gap-3">
                    {shareLinks.map((social) => (
                        <button
                            key={social.name}
                            onClick={() => handleShare(social.url)}
                            className={`flex items-center gap-2 rounded-lg ${social.bgColor} px-4 py-2.5 text-sm font-medium text-neutral-700 transition-all dark:text-neutral-300 ${social.color}`}
                            title={`Share on ${social.name}`}
                        >
                            {social.icon}
                            <span className="hidden sm:inline">{social.name}</span>
                        </button>
                    ))}
                </div>

                {/* Copy Link Button */}
                <button
                    onClick={copyToClipboard}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-neutral-50 px-4 py-2.5 text-sm font-medium text-neutral-700 transition-all hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
                >
                    {copied ? (
                        <>
                            <CheckIcon size={18} className="text-green-600 dark:text-green-500" />
                            <span>{t("link_copied")}</span>
                        </>
                    ) : (
                        <>
                            <LinkIcon size={18} />
                            <span>{t("copy_link")}</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default BlogShare;