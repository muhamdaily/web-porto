import { NextResponse } from "next/server";
import { getBlogData } from "@/services/blog";

export const GET = async () => {
    try {
        const data = await getBlogData();
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 },
        );
    }
};