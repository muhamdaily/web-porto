import { NextResponse } from "next/server";

import { getArticleCategories } from "@/services/articles";

export const GET = async () => {
    try {
        const categories = await getArticleCategories();

        return NextResponse.json(categories, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 },
        );
    }
};
