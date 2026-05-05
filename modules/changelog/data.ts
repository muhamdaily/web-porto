export type ChangelogTag = "new" | "improved" | "fixed";

export interface ChangelogItem {
    type: ChangelogTag;
    text: string;
}

export interface ChangelogEntry {
    version: string;
    date: string;
    title: string;
    items: ChangelogItem[];
}

export const CHANGELOG_ENTRIES: ChangelogEntry[] = [
    {
        version: "v1.6.0",
        date: "2026-05-05",
        title: "Uses & Setup Page",
        items: [
            {
                type: "new",
                text: "Added a Uses & Setup page showcasing daily gear, apps, and tech stack.",
            },
            {
                type: "improved",
                text: "Included quick links to tools and services for faster access.",
            },
        ],
    },
    {
        version: "v1.5.0",
        date: "2026-03-31",
        title: "Links Rewrite Fixes",
        items: [
            {
                type: "fixed",
                text: "Added missing URL rewrite for image links.",
            },
            {
                type: "fixed",
                text: "Corrected rewrite destination for /links routes.",
            },
        ],
    },
    {
        version: "v1.4.0",
        date: "2026-03-30",
        title: "External Links Rewrites",
        items: [
            {
                type: "new",
                text: "Added URL rewrites for the external /links site.",
            },
            {
                type: "improved",
                text: "Streamlined rewrites in next.config.mjs and removed vercel.json.",
            },
            {
                type: "fixed",
                text: "Switched rewrites to afterFiles to ensure correct matching order.",
            },
        ],
    },
    {
        version: "v1.3.0",
        date: "2026-03-18",
        title: "Spotify Dynamic Routes & Project Docs",
        items: [
            {
                type: "new",
                text: "Added comprehensive documentation for the Kos Kia Tia project (features, architecture, real-world applications).",
            },
            {
                type: "fixed",
                text: "Marked Spotify API routes as dynamic to prevent static generation.",
            },
            {
                type: "fixed",
                text: "Ensured dynamic behavior and revalidation for the now-playing endpoint.",
            },
        ],
    },
    {
        version: "v1.2.0",
        date: "2025-12-29",
        title: "Intro Animation & Blog Experiment",
        items: [
            {
                type: "new",
                text: "Added wave animation to the Introduction component and updated Tailwind config.",
            },
            {
                type: "new",
                text: "Implemented blog module (listing, detail, comments, sharing).",
            },
            {
                type: "improved",
                text: "Adjusted blog featured image styling and article content layout.",
            },
            {
                type: "fixed",
                text: "Corrected blog category typing and uniqueness handling.",
            },
            {
                type: "improved",
                text: "Removed blog components and localization strings to keep the site focused.",
            },
        ],
    },
    {
        version: "v1.1.0",
        date: "2025-12-28",
        title: "SEO, Metadata & Project Docs",
        items: [
            {
                type: "new",
                text: "Added KuyBisnis project documentation for the Agribusiness Entrepreneurship course.",
            },
            {
                type: "new",
                text: "Added initial Bank Mini Semarak project documentation.",
            },
            {
                type: "new",
                text: "Added sitemap and robots using Next.js built-in routing.",
            },
            {
                type: "improved",
                text: "Enhanced metadata, keywords, and Open Graph support across pages.",
            },
            {
                type: "improved",
                text: "Refactored code structure for readability and maintainability.",
            },
            {
                type: "fixed",
                text: "Improved Codewars/Monkeytype API error handling and updated Codewars username/URL.",
            },
        ],
    },
    {
        version: "v1.0.1",
        date: "2025-12-27",
        title: "Bento & Data Refinements",
        items: [
            {
                type: "new",
                text: "Refactored the Bento component to use dynamic translations and enhanced chat preview.",
            },
            {
                type: "new",
                text: "Added jQuery icon to STACKS and introduced created_at on project items.",
            },
            {
                type: "fixed",
                text: "Refined leaderboard data handling for clearer structure.",
            },
        ],
    },
    {
        version: "v1.0.0",
        date: "2025-12-26",
        title: "Initial Setup & Stabilization",
        items: [
            {
                type: "new",
                text: "Initial project setup.",
            },
            {
                type: "fixed",
                text: "Normalized Monkeytype username casing and updated the Umami script website ID.",
            },
            {
                type: "fixed",
                text: "Corrected metadata text, Introduction typography, and ProfileHeader spacing.",
            },
            {
                type: "fixed",
                text: "Adjusted achievements and project sorting logic for consistent ordering.",
            },
            {
                type: "fixed",
                text: "Refactored Spotify API routes and updated component API calls.",
            },
            {
                type: "fixed",
                text: "Added type annotations for cookie setAll in server utils and middleware; removed unused project images.",
            },
        ],
    },
];
