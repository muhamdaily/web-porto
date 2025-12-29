import { NextResponse } from "next/server";
import { createClient } from "@/common/utils/server";

// GET - Fetch comments for a blog post
export const GET = async (
    req: Request,
    { params }: { params: { slug: string } }
) => {
    try {
        const { slug } = params;
        const supabase = createClient();

        const { data, error } = await supabase
            .from("blog_comments")
            .select("*")
            .eq("blog_slug", slug)
            .eq("is_approved", true)
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Supabase GET error:", error);
            return NextResponse.json(
                { message: "Failed to fetch comments", error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json(data || [], { status: 200 });
    } catch (error: any) {
        console.error("GET comments error:", error);
        return NextResponse.json(
            { message: "Internal Server Error", error: error.message },
            { status: 500 }
        );
    }
};

// POST - Create a new comment
export const POST = async (
    req: Request,
    { params }: { params: { slug: string } }
) => {
    try {
        const { slug } = params;

        // Parse body
        let body;
        try {
            body = await req.json();
        } catch (parseError) {
            console.error("JSON parse error:", parseError);
            return NextResponse.json(
                { message: "Invalid JSON format" },
                { status: 400 }
            );
        }

        const { name, email, comment } = body;

        console.log("Received comment data:", { slug, name, email, commentLength: comment?.length });

        // Validation
        if (!name || !email || !comment) {
            return NextResponse.json(
                { message: "Name, email, and comment are required" },
                { status: 400 }
            );
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { message: "Invalid email format" },
                { status: 400 }
            );
        }

        // Comment length validation
        if (comment.length < 10) {
            return NextResponse.json(
                { message: "Comment must be at least 10 characters long" },
                { status: 400 }
            );
        }

        if (comment.length > 1000) {
            return NextResponse.json(
                { message: "Comment must not exceed 1000 characters" },
                { status: 400 }
            );
        }

        const supabase = createClient();

        // Check if table exists and has correct structure
        const commentData = {
            blog_slug: slug,
            name: name.trim(),
            email: email.trim().toLowerCase(),
            comment: comment.trim(),
            is_approved: false, // Require manual approval
        };

        console.log("Inserting comment:", commentData);

        // Insert comment
        const { data, error } = await supabase
            .from("blog_comments")
            .insert([commentData])
            .select()
            .single();

        if (error) {
            console.error("Supabase INSERT error:", error);
            return NextResponse.json(
                {
                    message: "Failed to create comment",
                    error: error.message,
                    details: error.details,
                    hint: error.hint
                },
                { status: 500 }
            );
        }

        console.log("Comment created successfully:", data);

        return NextResponse.json(
            {
                message: "Comment submitted successfully and awaiting approval",
                data,
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("POST comment error:", error);
        return NextResponse.json(
            {
                message: "Internal Server Error",
                error: error.message,
                stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
            },
            { status: 500 }
        );
    }
};