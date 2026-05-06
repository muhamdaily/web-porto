import { NextResponse } from "next/server";

import { loadMdxFiles } from "@/common/libs/mdx";
import { getArticleDataBySlug } from "@/services/articles";

export const GET = async (
    req: Request,
    { params }: { params: { slug: string } },
) => {
    try {
        const { slug } = params;
        const data = await getArticleDataBySlug(slug);
        const contents = loadMdxFiles("articles");
        const content = contents.find((item) => item.slug === slug);

        const response = {
            ...data,
            content: content?.content ?? null,
        };

        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 },
        );
    }
};
