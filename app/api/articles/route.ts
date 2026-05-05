import { NextResponse } from "next/server";

import { getArticlesData } from "@/services/articles";

export const GET = async (req: Request) => {
    try {
        const { searchParams } = new URL(req.url);
        const pageParam = Number(searchParams.get("page") ?? "1");
        const limitParam = Number(searchParams.get("limit") ?? "6");

        const page = Number.isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;
        const limit = Number.isNaN(limitParam) || limitParam < 1 ? 6 : limitParam;

        const query = searchParams.get("query")?.trim() ?? "";
        const category = searchParams.get("category")?.trim() ?? "";

        const { data, count } = await getArticlesData({
            page,
            limit,
            query,
            category,
        });

        const total = count ?? 0;
        const hasMore = page * limit < total;

        return NextResponse.json(
            {
                data,
                page,
                limit,
                total,
                hasMore,
            },
            { status: 200 },
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 },
        );
    }
};
