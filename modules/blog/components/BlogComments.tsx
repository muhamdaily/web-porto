"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { HiChatAlt2 as CommentIcon } from "react-icons/hi";
import { BiUser as UserIcon, BiTime as TimeIcon } from "react-icons/bi";
import useSWR, { mutate } from "swr";

interface Comment {
    id: string;
    blog_slug: string;
    name: string;
    email: string;
    comment: string;
    created_at: string;
    is_approved: boolean;
}

interface BlogCommentsProps {
    slug: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const BlogComments = ({ slug }: BlogCommentsProps) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{
        type: "success" | "error" | null;
        message: string;
    }>({ type: null, message: "" });

    const t = useTranslations("BlogPage");

    const { data: comments, isLoading } = useSWR<Comment[]>(
        `/api/blog/${slug}/comments`,
        fetcher,
        { refreshInterval: 30000 } // Refresh every 30 seconds
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({ type: null, message: "" });

        try {
            const response = await fetch(`/api/blog/${slug}/comments`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, comment }),
            });

            const data = await response.json();

            if (response.ok) {
                setSubmitStatus({
                    type: "success",
                    message: t("comment_success"),
                });
                setName("");
                setEmail("");
                setComment("");
                // Refresh comments list
                mutate(`/api/blog/${slug}/comments`);
            } else {
                setSubmitStatus({
                    type: "error",
                    message: data.message || t("comment_error"),
                });
            }
        } catch (error) {
            setSubmitStatus({
                type: "error",
                message: t("comment_error"),
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInMs = now.getTime() - date.getTime();
        const diffInMinutes = Math.floor(diffInMs / 60000);
        const diffInHours = Math.floor(diffInMs / 3600000);
        const diffInDays = Math.floor(diffInMs / 86400000);

        if (diffInMinutes < 1) return t("time_just_now");
        if (diffInMinutes < 60) return t("time_minutes_ago", { count: diffInMinutes });
        if (diffInHours < 24) return t("time_hours_ago", { count: diffInHours });
        if (diffInDays < 7) return t("time_days_ago", { count: diffInDays });

        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const approvedComments = comments?.filter((c) => c.is_approved) || [];

    return (
        <div className="space-y-8">
            {/* Comments Section */}
            <div className="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900/50">
                <div className="mb-6 flex items-center gap-2">
                    <CommentIcon className="text-green-600 dark:text-green-500" size={20} />
                    <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
                        {t("comments")} ({approvedComments.length})
                    </h3>
                </div>

                {/* Comments List */}
                <div className="space-y-4">
                    {isLoading ? (
                        <div className="text-center text-neutral-500 dark:text-neutral-400">
                            {t("loading_comments")}
                        </div>
                    ) : approvedComments.length === 0 ? (
                        <div className="text-center text-neutral-500 dark:text-neutral-400">
                            {t("no_comments")}
                        </div>
                    ) : (
                        approvedComments.map((commentItem) => (
                            <div
                                key={commentItem.id}
                                className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800/50"
                            >
                                <div className="mb-2 flex items-start justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white">
                                            <UserIcon size={20} />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-neutral-800 dark:text-neutral-200">
                                                {commentItem.name}
                                            </p>
                                            <div className="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400">
                                                <TimeIcon size={12} />
                                                <span>{formatDate(commentItem.created_at)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p className="mt-2 text-neutral-700 dark:text-neutral-300">
                                    {commentItem.comment}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Comment Form */}
            <div className="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900/50">
                <h3 className="mb-4 text-lg font-semibold text-neutral-800 dark:text-neutral-200">
                    {t("leave_comment")}
                </h3>

                {submitStatus.type && (
                    <div
                        className={`mb-4 rounded-lg p-4 ${submitStatus.type === "success"
                                ? "bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                                : "bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                            }`}
                    >
                        {submitStatus.message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                {t("name")} <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-neutral-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
                                placeholder={t("name_placeholder")}
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                {t("email")} <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-neutral-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
                                placeholder={t("email_placeholder")}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                            {t("comment_label")} <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                            rows={5}
                            className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-neutral-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
                            placeholder={t("comment_placeholder")}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition-all hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-green-500 dark:hover:bg-green-600"
                    >
                        {isSubmitting ? t("submitting") : t("submit_comment")}
                    </button>

                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        {t("comment_note")}
                    </p>
                </form>
            </div>
        </div>
    );
};

export default BlogComments;