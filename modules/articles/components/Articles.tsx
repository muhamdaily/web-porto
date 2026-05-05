"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import { useTranslations } from "next-intl";
import { useDebounceValue } from "usehooks-ts";
import { FiSearch as SearchIcon } from "react-icons/fi";
import { useRouter, useSearchParams } from "next/navigation";

import EmptyState from "@/common/components/elements/EmptyState";
import { fetcher } from "@/services/fetcher";
import { ArticleItem, ArticleListResponse } from "@/common/types/articles";

import ArticleCard from "./ArticleCard";
import ArticleSkeleton from "./ArticleSkeleton";
import CategoryFilter from "./CategoryFilter";

const ITEMS_PER_PAGE = 4;

const Articles = () => {
    const t = useTranslations("ArticlesPage");
    const router = useRouter();
    const searchParams = useSearchParams();

    const initialSearch = searchParams.get("search") || "";
    const initialCategory = searchParams.get("category") || "";

    const [searchInput, setSearchInput] = useState(initialSearch);
    const [debouncedSearch] = useDebounceValue(searchInput, 600);
    const [activeCategory, setActiveCategory] = useState(initialCategory);

    const { data: categoryData } = useSWR<string[]>(
        "/api/articles/categories",
        fetcher,
    );

    const categories = useMemo(() => {
        if (!categoryData) return [];
        return [...categoryData].sort((a, b) => a.localeCompare(b));
    }, [categoryData]);

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        const searchValue = debouncedSearch.trim();
        const currentSearch = searchParams.get("search") || "";
        const currentCategory = searchParams.get("category") || "";
        let changed = false;

        if (searchValue !== currentSearch) {
            if (searchValue) {
                params.set("search", searchValue);
            } else {
                params.delete("search");
            }
            changed = true;
        }

        if (activeCategory !== currentCategory) {
            if (activeCategory) {
                params.set("category", activeCategory);
            } else {
                params.delete("category");
            }
            changed = true;
        }

        if (changed) {
            const queryString = params.toString();
            router.push(`/articles${queryString ? `?${queryString}` : ""}`);
        }
    }, [activeCategory, debouncedSearch, router, searchParams]);

    const getKey = (
        pageIndex: number,
        previousPageData: ArticleListResponse | null,
    ) => {
        if (previousPageData && !previousPageData.data.length) return null;

        const params = new URLSearchParams();
        params.set("page", String(pageIndex + 1));
        params.set("limit", String(ITEMS_PER_PAGE));

        if (debouncedSearch) params.set("query", debouncedSearch);
        if (activeCategory) params.set("category", activeCategory);

        return `/api/articles?${params.toString()}`;
    };

    const {
        data,
        error,
        isLoading,
        size,
        setSize,
    } = useSWRInfinite<ArticleListResponse>(getKey, fetcher, {
        revalidateFirstPage: false,
    });

    const articles: ArticleItem[] = useMemo(() => {
        return data ? data.flatMap((page) => page.data) : [];
    }, [data]);

    const total = data?.[0]?.total ?? 0;
    const hasMore = data ? data[data.length - 1]?.hasMore : false;
    const isLoadingMore =
        isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");

    const loadMoreRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setSize(1);
    }, [activeCategory, debouncedSearch, setSize]);

    useEffect(() => {
        const sentinel = loadMoreRef.current;
        if (!sentinel || !hasMore) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isLoadingMore) {
                    setSize((prev) => prev + 1);
                }
            },
            { rootMargin: "200px" },
        );

        observer.observe(sentinel);

        return () => observer.disconnect();
    }, [hasMore, isLoadingMore, setSize]);

    return (
        <section className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex w-full items-center gap-2 rounded-lg bg-neutral-50 p-2 outline outline-neutral-300 focus-within:outline-neutral-400 dark:bg-neutral-900 dark:outline-neutral-700">
                    <SearchIcon className="text-neutral-500" size={17} />
                    <input
                        type="search"
                        placeholder={t("search_placeholder")}
                        value={searchInput}
                        className="w-full bg-transparent pr-2 text-sm outline-none placeholder:text-neutral-500"
                        onChange={(event) => setSearchInput(event.target.value)}
                    />
                </div>

                <CategoryFilter
                    categories={categories}
                    value={activeCategory}
                    onChange={setActiveCategory}
                />
            </div>

            {/* <div className="ml-1 text-sm text-neutral-500 dark:text-neutral-400">
                {t("total", { total })}
            </div> */}

            {isLoading && articles.length === 0 && (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {[...Array(4)].map((_, i) => (
                        <ArticleSkeleton key={i} />
                    ))}
                </div>
            )}

            {error && <EmptyState message={t("error")} />}

            {!isLoading && !error && articles.length === 0 && (
                <EmptyState message={t("no_data")} />
            )}

            {articles.length > 0 && (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {articles.map((article, index) => (
                        <ArticleCard key={`${article.slug}-${index}`} {...article} />
                    ))}
                </div>
            )}

            {articles.length > 0 && (
                <div className="flex flex-col items-center gap-2">
                    <div ref={loadMoreRef} className="h-2 w-full" />
                    {isLoadingMore && (
                        <span className="text-sm text-neutral-500 dark:text-neutral-400">
                            {t("loading_more")}
                        </span>
                    )}
                    {!hasMore && !isLoadingMore && (
                        <span className="text-sm text-neutral-500 dark:text-neutral-400">
                            {t("end_message")}
                        </span>
                    )}
                </div>
            )}
        </section>
    );
};

export default Articles;
