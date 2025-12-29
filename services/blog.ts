import { createClient } from "@/common/utils/server";

export const getBlogData = async () => {
    const supabase = createClient();

    let { data } = await supabase.from("blog").select();
    return data;
};

export const getBlogDataBySlug = async (slug: string) => {
    const supabase = createClient();

    let { data } = await supabase
        .from("blog")
        .select()
        .eq("slug", slug)
        .single();
    return data;
};