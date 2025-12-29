import { NextResponse } from "next/server";
import { getBlogDataBySlug } from "@/services/blog";

export const GET = async (
    req: Request,
    { params }: { params: { slug: string } },
) => {
    try {
        const { slug } = params;
        const data = await getBlogDataBySlug(slug);
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 },
        );
    }
};