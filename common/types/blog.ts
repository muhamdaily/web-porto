export type BlogItem = {
    id: string;
    title: string;
    slug: string;
    description: string;
    image: string;
    category: string;
    tags: string[];
    content?: string | null;
    is_show: boolean;
    is_featured: boolean;
    reading_time_minutes: number;
    created_at: string;
    updated_at?: string;
};

export type BlogItemProps = {
    blog: BlogItem[];
};