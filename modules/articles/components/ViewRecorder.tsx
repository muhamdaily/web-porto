"use client";

import { useEffect } from "react";

const recordedViews = new Set<string>();
const pendingViews = new Set<string>();

type Props = {
    slug: string;
    // dedupe window in milliseconds (default 24 hours)
    windowMs?: number;
};

export default function ViewRecorder({ slug, windowMs = 24 * 60 * 60 * 1000 }: Props) {
    useEffect(() => {
        if (!slug) return;

        try {
            const key = `viewed_article_${slug}`;
            const isRecorded = recordedViews.has(key);
            const isPending = pendingViews.has(key);
            const existingCookie = document.cookie
                .split("; ")
                .find((item) => item.startsWith(`${key}=`));

            if (isRecorded || isPending || existingCookie) return;

            pendingViews.add(key);

            fetch(`/api/articles/${slug}/view`, { method: "POST" })
                .then((response) => {
                    if (!response.ok) {
                        pendingViews.delete(key);
                        return;
                    }

                    recordedViews.add(key);
                    pendingViews.delete(key);
                    document.cookie = `${key}=1; path=/; max-age=${Math.floor(windowMs / 1000)}; samesite=lax`;
                })
                .catch(() => {
                    pendingViews.delete(key);
                });
        } catch (error) {
            // ignore storage errors
        }
    }, [slug, windowMs]);

    return null;
}
