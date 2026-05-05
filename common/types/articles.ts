export type ArticleStatus = "draft" | "published" | "archived";

export type ArticleContent = {
    rendered: string | null;
    markdown: string | null;
    protected: boolean | null;
};

export type ArticleExcerpt = {
    rendered: string | null;
    markdown: string | null;
    protected: boolean | null;
};

export type ArticleItem = {
    id: string;
    date: string;
    modified?: string | null;
    slug: string;
    status: ArticleStatus;
    title: string;
    short_description: string | null;
    content: ArticleContent | null;
    excerpt: ArticleExcerpt | null;
    author: string | null;
    is_featured: boolean;
    categories: string[];
    tags: string[];
    cover_image: string | null;
    total_views: number | null;
};

export type ArticleListResponse = {
    data: ArticleItem[];
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
};
