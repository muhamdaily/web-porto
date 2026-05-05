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
        name: "DESKTOP PC",
        description: "12th Gen Intel(R) Core(TM) i3-12100F, 16 GB RAM, AMD Radeon RX 580 2048SP (8 GB), 1 TB storage.",
      },
      {
        name: "Lenovo Legion R24e",
        description: "Primary external monitor for a more productive workflow.",
      },
      {
        name: "Logitech G502 HERO",
        description: "Reliable mouse with programmable buttons and good ergonomics.",
      },
      {
        name: "Ajazz AK820",
        description: "Mechanical keyboard with tactile feedback for long coding sessions.",
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
        name: "GitHub Theme",
        description: "My go-to VS Code theme for clean, readable code.",
        href: "https://marketplace.visualstudio.com/items?itemName=GitHub.github-vscode-theme",
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
        name: "Supabase",
        description: "Open-source backend — PostgreSQL database, auth, and realtime.",
        href: "https://supabase.com",
      },
      {
        name: "Vercel",
        description: "Cloud platform for static sites and serverless functions with global CDN.",
        href: "https://vercel.com",
      }
    ],
  },
];
