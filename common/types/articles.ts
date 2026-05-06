export type ArticleStatus = "draft" | "published" | "archived";

export type ArticleItem = {
    id: string;
    slug: string;
    title: string;
    description: string | null;
    image: string | null;
    author: string | null;
    categories: string[];
    tags: string[];
    is_featured: boolean;
    status: ArticleStatus;
    total_views: number | null;
    created_at: string;
    updated_at: string;
    content?: string | null;
};

export type ArticleListResponse = {
    data: ArticleItem[];
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
};
