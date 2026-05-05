import { NextResponse } from "next/server";

import { createClient } from "@/common/utils/server";

export const POST = async (
    _req: Request,
    { params }: { params: { slug: string } },
) => {
    try {
        const { slug } = params;

        const supabase = createClient();

        // Prefer calling RPC `record_article_view(article_slug)` which is
        // recommended to be created with SECURITY DEFINER so it can run
        // with elevated privileges and avoid RLS blocking anonymous inserts.
        const { data: rpcData, error: rpcError } = await supabase.rpc(
            "record_article_view",
            { article_slug: slug },
        );

        if (rpcError) {
            return NextResponse.json(
                {
                    message: "Failed to record view",
                    details: rpcError.message,
                    hint: rpcError.hint,
                },
                { status: 500 },
            );
        }

        return NextResponse.json({ ok: true, data: rpcData }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
};
