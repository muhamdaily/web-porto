export type UsesSectionId =
  | "terminal"
  | "apps"
  | "browser"
  | "tech"
  | "hardware"
  | "editor";

export interface UsesItem {
  name: string;
  description: string;
  href?: string;
}

export interface UsesSection {
  id: UsesSectionId;
  title: string;
  items: UsesItem[];
}

export const USES_SECTIONS: UsesSection[] = [
  {
    id: "hardware",
    title: "Hardware",
    items: [
      {
        name: "ASUS Laptop",
        description: "My daily driver for all development work.",
      },
      {
        name: "External Monitor",
        description: "Extended display for a more productive dual-screen setup.",
      },
      {
        name: "Mechanical Keyboard",
        description: "Tactile feedback that helps during long coding sessions.",
      },
      {
        name: "Wireless Mouse",
        description: "Ergonomic mouse for comfortable everyday use.",
      },
    ],
  },
  {
    id: "editor",
    title: "Editor",
    items: [
      {
        name: "Visual Studio Code",
        description: "My primary editor for web and full-stack development.",
        href: "https://code.visualstudio.com/",
      },
      {
        name: "Android Studio",
        description: "Official IDE for native Android development with Kotlin.",
        href: "https://developer.android.com/studio",
      },
      {
        name: "One Dark Pro",
        description: "My go-to VS Code color theme — easy on the eyes.",
      },
      {
        name: "JetBrains Mono",
        description: "Monospace font designed for code readability with ligature support.",
        href: "https://www.jetbrains.com/lp/mono/",
      },
    ],
  },
  {
    id: "terminal",
    title: "Terminal",
    items: [
      {
        name: "Windows Terminal",
        description: "Modern terminal with tab support and a clean interface.",
        href: "https://aka.ms/terminal",
      },
      {
        name: "Git Bash",
        description: "Unix-like shell on Windows for consistent Git workflows.",
      },
      {
        name: "bun",
        description: "Fast all-in-one JavaScript runtime and package manager.",
        href: "https://bun.sh/",
      },
      {
        name: "Claude Code",
        description: "AI coding assistant in the terminal for complex engineering tasks.",
        href: "https://claude.ai/code",
      },
    ],
  },
  {
    id: "apps",
    title: "Apps",
    items: [
      {
        name: "Figma",
        description: "Design tool for UI mockups, prototyping, and component exploration.",
        href: "https://figma.com",
      },
      {
        name: "Notion",
        description: "All-in-one workspace for notes, planning, and documentation.",
        href: "https://notion.so",
      },
      {
        name: "Postman",
        description: "API testing and development environment for REST APIs.",
        href: "https://postman.com",
      },
      {
        name: "TablePlus",
        description: "GUI client for managing PostgreSQL, MySQL, and SQLite databases.",
        href: "https://tableplus.com",
      },
    ],
  },
  {
    id: "browser",
    title: "Browser",
    items: [
      {
        name: "Google Chrome",
        description: "Primary browser with DevTools for web development and debugging.",
        href: "https://google.com/chrome",
      },
      {
        name: "React Developer Tools",
        description: "Browser extension for inspecting React component trees and state.",
      },
      {
        name: "Wappalyzer",
        description: "Identifies the tech stack of any website at a glance.",
      },
    ],
  },
  {
    id: "tech",
    title: "Tech Stack",
    items: [
      {
        name: "Next.js",
        description: "React framework for full-stack web apps with SSR, ISR, and API routes.",
        href: "https://nextjs.org",
      },
      {
        name: "TypeScript",
        description: "Strongly typed JavaScript — strict mode always enabled, no any.",
        href: "https://typescriptlang.org",
      },
      {
        name: "Tailwind CSS",
        description: "Utility-first CSS framework for rapid and consistent UI development.",
        href: "https://tailwindcss.com",
      },
      {
        name: "Kotlin",
        description: "Primary language for native Android app development.",
        href: "https://kotlinlang.org",
      },
      {
        name: "Supabase",
        description: "Open-source backend — PostgreSQL database, auth, and realtime.",
        href: "https://supabase.com",
      },
      {
        name: "Framer Motion",
        description: "Production-ready motion library for smooth React animations.",
        href: "https://framer.com/motion",
      },
    ],
  },
];
