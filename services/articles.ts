import { createClient } from "@/common/utils/server";
import { ArticleItem, ArticleStatus } from "@/common/types/articles";

interface ArticleQuery {
    page?: number;
    limit?: number;
    query?: string;
    category?: string;
    status?: ArticleStatus;
}

export const getArticlesData = async ({
    page = 1,
    limit = 6,
    query = "",
    category = "",
    status = "published",
}: ArticleQuery) => {
    const supabase = createClient();

    let dbQuery = supabase
        .from("articles")
        .select("*", { count: "exact" })
        .eq("status", status)
        // show featured first, then by date desc
        .order("is_featured", { ascending: false })
        .order("date", { ascending: false });

    if (query) {
        dbQuery = dbQuery.or(
            `title.ilike.%${query}%,short_description.ilike.%${query}%`,
        );
    }

    if (category) {
        dbQuery = dbQuery.contains("categories", [category]);
    }

    if (limit) {
        const from = (page - 1) * limit;
        const to = from + limit - 1;
        dbQuery = dbQuery.range(from, to);
    }

    const { data, error, count } = await dbQuery;

    if (error) {
        throw error;
    }

    return {
        data: (data ?? []) as ArticleItem[],
        count: count ?? 0,
    };
};

export const getArticleDataBySlug = async (slug: string) => {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("articles")
        .select()
        .eq("slug", slug)
        .single();

    if (error) {
        throw error;
    }

    return data as ArticleItem;
};

export const getArticleCategories = async () => {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("articles")
        .select("categories")
        .eq("status", "published");

    if (error) {
        throw error;
    }

    const categories = Array.from(
        new Set(
            (data ?? [])
                .flatMap((item) => item.categories ?? [])
                .filter((category) => Boolean(category)),
        ),
    );

    return categories;
};
