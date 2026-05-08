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
        version: "v1.6.8",
        date: "2026-05-08",
        title: "Articles UI Adjustments",
        items: [
            {
                type: "new",
                text: "Added estimated reading time on article cards and detail pages (with clock icon).",
            },
            {
                type: "improved",
                text: "Removed date from article cards and adjusted metadata spacing so author, reading time, and views display clearly.",
            },
            {
                type: "improved",
                text: "Adjusted metadata font sizes responsively: smaller on mobile, normal on desktop for better readability.",
            },
            {
                type: "fixed",
                text: "Ensured category filter dropdown appears above article images on mobile by increasing z-index.",
            },
        ],
    },
    {
        version: "v1.6.7",
        date: "2026-05-07",
        title: "Articles MDX Migration",
        items: [
            {
                type: "new",
                text: "Moved article content to local MDX files under contents/articles/{slug}.mdx.",
            },
            {
                type: "improved",
                text: "Kept the article list powered by Supabase metadata only, while detail pages merge metadata and local MDX content.",
            },
            {
                type: "fixed",
                text: "Reworked article view counting to use articles.total_views instead of a separate article_views table.",
            },
        ],
    },
    {
        version: "v1.6.6",
        date: "2026-05-06",
        title: "Sidebar Tooltips & UX",
        items: [
            {
                type: "new",
                text: "Added hover tooltips for language (EN/ID) and theme (Light/Dark) icons in the sidebar.",
            },
            {
                type: "improved",
                text: "Tooltips are hidden on mobile and appear on hover/focus for desktop users.",
            },
            {
                type: "fixed",
                text: "Fixed tooltip centering so labels align above their respective buttons.",
            },
            {
                type: "fixed",
                text: "Tooltips now hide immediately when the icon is clicked (blur applied).",
            },
        ],
    },
    {
        version: "v1.6.5",
        date: "2026-05-06",
        title: "Article Sharing",
        items: [
            {
                type: "new",
                text: "Added share actions on article detail pages.",
            },
            {
                type: "new",
                text: "Enabled native share when available and clipboard copy fallback for other browsers.",
            },
            {
                type: "improved",
                text: "Adjusted mobile typography for author, date, and views so metadata stays cleaner in one row on article cards and detail pages.",
            },
            {
                type: "fixed",
                text: "Kept the Featured badge visible on featured article cards even after cover images finish loading.",
            },
        ],
    },
    {
        version: "v1.6.4",
        date: "2026-05-06",
        title: "Articles Feature",
        items: [
            {
                type: "new",
                text: "Added an Articles page with search, category filter, featured ordering, and infinite scroll.",
            },
            {
                type: "new",
                text: "Added article detail pages with markdown rendering, cover images, and metadata such as author, date, and views.",
            },
            {
                type: "new",
                text: "Connected the feature to Supabase with API routes for listing, detail, categories, and view tracking.",
            },
            {
                type: "improved",
                text: "Refined article card layout so titles and descriptions stay compact and consistent.",
            },
            {
                type: "fixed",
                text: "Adjusted remote image handling so external article thumbnails render correctly.",
            },
        ],
    },
    {
        version: "v1.6.3",
        date: "2026-05-05",
        title: "Profile Border",
        items: [
            {
                type: "new",
                text: "Added new navigation for Links."
            },
            {
                type: "new",
                text: "Added an open-to-work border around the profile picture to indicate availability for new opportunities, only visible on desktop version.",
            },
        ],
    },
    {
        version: "v1.6.2",
        date: "2026-05-05",
        title: "Command Palette",
        items: [
            {
                type: "new",
                text: "Added a Command Palette with Navigation, Themes, and Language shortcuts.",
            },
            {
                type: "new",
                text: "Added Ctrl + K shortcut and sidebar button to open the palette.",
            },
        ],
    },
    {
        version: "v1.6.1",
        date: "2026-05-05",
        title: "Custom Cursor",
        items: [
            {
                type: "new",
                text: "Added a custom cursor across the site for a distinct feel.",
            },
        ],
    },
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
