"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useLocale, useTranslations } from "next-intl";
import { BsSun, BsMoon } from "react-icons/bs";
import { HiMagnifyingGlass } from "react-icons/hi2";

import { MENU_ITEMS } from "@/common/constants/menu";
import { useCommandPalette } from "@/common/stores/commandPalette";
import { setUserLocale } from "@/services/locale";
import { Locale } from "@/config";

interface PaletteItem {
    id: string;
    label: string;
    icon?: React.ReactNode;
    onSelect: () => void;
    isActive?: boolean;
}

interface PaletteSection {
    id: string;
    title: string;
    items: PaletteItem[];
}

const CommandPalette = () => {
    const router = useRouter();
    const { resolvedTheme, setTheme } = useTheme();
    const locale = useLocale();
    const tNav = useTranslations("Navigation");
    const tPalette = useTranslations("CommandPalette");
    const { isOpen, closePalette, togglePalette } = useCommandPalette();
    const [query, setQuery] = useState("");
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPending, startTransition] = useTransition();
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
                event.preventDefault();
                togglePalette();
            }

            if (event.key === "Escape") {
                closePalette();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [togglePalette, closePalette]);

    useEffect(() => {
        if (!isOpen) return;
        setQuery("");
        inputRef.current?.focus();

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, [isOpen]);

    const handleNavigate = (href: string, isExternal: boolean) => {
        closePalette();

        if (isExternal) {
            window.open(href, "_blank", "noopener,noreferrer");
            return;
        }

        router.push(href);
    };

    const navigationItems: PaletteItem[] = useMemo(
        () =>
            MENU_ITEMS.filter((item) => item.isShow).map((item) => ({
                id: `nav-${item.title}`,
                label: tNav(item.title),
                icon: item.icon,
                onSelect: () => handleNavigate(item.href, item.isExternal ?? false),
            })),
        [tNav],
    );

    const themeItems: PaletteItem[] = [
        {
            id: "theme-light",
            label: tPalette("theme_light"),
            icon: <BsSun size={16} />,
            onSelect: () => {
                setTheme("light");
                closePalette();
            },
            isActive: resolvedTheme === "light",
        },
        {
            id: "theme-dark",
            label: tPalette("theme_dark"),
            icon: <BsMoon size={16} />,
            onSelect: () => {
                setTheme("dark");
                closePalette();
            },
            isActive: resolvedTheme === "dark",
        },
    ];

    const languageItems: PaletteItem[] = [
        {
            id: "lang-en",
            label: tPalette("lang_en"),
            onSelect: () => {
                startTransition(() => setUserLocale("en" as Locale));
                closePalette();
            },
            isActive: locale === "en",
        },
        {
            id: "lang-id",
            label: tPalette("lang_id"),
            onSelect: () => {
                startTransition(() => setUserLocale("id" as Locale));
                closePalette();
            },
            isActive: locale === "id",
        },
    ];

    const normalizedQuery = query.trim().toLowerCase();
    const filterItems = (items: PaletteItem[]) =>
        normalizedQuery
            ? items.filter((item) =>
                item.label.toLowerCase().includes(normalizedQuery),
            )
            : items;

    const sections: PaletteSection[] = [
        {
            id: "navigation",
            title: tPalette("section_navigation"),
            items: filterItems(navigationItems),
        },
        {
            id: "themes",
            title: tPalette("section_themes"),
            items: filterItems(themeItems),
        },
        {
            id: "language",
            title: tPalette("section_language"),
            items: filterItems(languageItems),
        },
    ].filter((section) => section.items.length > 0);

    const flatItems = useMemo(
        () => sections.flatMap((section) => section.items),
        [sections],
    );
    const itemIndexLookup = useMemo(() => {
        const map = new Map<string, number>();
        flatItems.forEach((item, index) => {
            map.set(item.id, index);
        });
        return map;
    }, [flatItems]);

    useEffect(() => {
        if (!isOpen) return;
        setActiveIndex(flatItems.length > 0 ? 0 : -1);
    }, [isOpen, normalizedQuery, flatItems.length]);

    useEffect(() => {
        if (!isOpen || activeIndex < 0) return;
        const listElement = listRef.current;
        if (!listElement) return;
        const activeElement = listElement.querySelector(
            `[data-palette-index="${activeIndex}"]`,
        );
        if (activeElement instanceof HTMLElement) {
            activeElement.scrollIntoView({ block: "nearest" });
        }
    }, [activeIndex, isOpen]);

    const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (flatItems.length === 0) return;

        if (event.key === "ArrowDown") {
            event.preventDefault();
            setActiveIndex((prev) => {
                const safeIndex = prev < 0 ? 0 : prev;
                return (safeIndex + 1) % flatItems.length;
            });
            return;
        }

        if (event.key === "ArrowUp") {
            event.preventDefault();
            setActiveIndex((prev) => {
                const safeIndex = prev < 0 ? 0 : prev;
                return (safeIndex - 1 + flatItems.length) % flatItems.length;
            });
            return;
        }

        if (event.key === "Enter") {
            const activeItem = flatItems[activeIndex];
            if (!activeItem || isPending) return;
            event.preventDefault();
            activeItem.onSelect();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center px-4 pt-20">
            <button
                type="button"
                className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-sm"
                aria-label={tPalette("aria_close")}
                onClick={closePalette}
            />
            <div
                className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/95 text-neutral-200 shadow-2xl"
                role="dialog"
                aria-modal="true"
            >
                <div className="flex items-center gap-2 border-b border-neutral-800 px-4 py-3">
                    <HiMagnifyingGlass className="text-neutral-500" size={16} />
                    <input
                        ref={inputRef}
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        onKeyDown={handleInputKeyDown}
                        placeholder={tPalette("placeholder")}
                        className="w-full bg-transparent text-sm text-neutral-200 placeholder:text-neutral-500 focus:outline-none"
                    />
                </div>

                <div
                    ref={listRef}
                    className="max-h-[60vh] space-y-5 overflow-y-auto px-4 py-4"
                >
                    {sections.length === 0 ? (
                        <div className="rounded-lg border border-dashed border-neutral-800 px-3 py-6 text-center text-sm text-neutral-500">
                            {tPalette("no_results")}
                        </div>
                    ) : (
                        sections.map((section) => (
                            <div key={section.id} className="space-y-2">
                                <div className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                                    {section.title}
                                </div>
                                <div className="space-y-1">
                                    {section.items.map((item) => {
                                        const itemIndex = itemIndexLookup.get(item.id);
                                        const isSelected = itemIndex === activeIndex;

                                        return (
                                            <button
                                                key={item.id}
                                                type="button"
                                                onClick={item.onSelect}
                                                disabled={isPending}
                                                data-palette-index={itemIndex}
                                                aria-selected={isSelected}
                                                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ${isSelected
                                                    ? "bg-neutral-800 text-neutral-100"
                                                    : "text-neutral-300 hover:bg-neutral-800/70"
                                                    } ${item.isActive && !isSelected ? "text-neutral-100" : ""}`}
                                            >
                                                {item.icon ? (
                                                    <span className="text-neutral-400">{item.icon}</span>
                                                ) : (
                                                    <span className="h-4 w-4 rounded-full border border-neutral-600" />
                                                )}
                                                <span className="flex-1">{item.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="flex flex-wrap items-center gap-2 border-t border-neutral-800 px-4 py-2 text-xs text-neutral-500">
                    <span className="inline-flex items-center gap-1 rounded-md border border-neutral-800 bg-neutral-900 px-2 py-0.5">
                        {tPalette("key_nav")}
                    </span>
                    <span>{tPalette("hint_navigate")}</span>
                    <span className="inline-flex items-center gap-1 rounded-md border border-neutral-800 bg-neutral-900 px-2 py-0.5">
                        {tPalette("key_enter")}
                    </span>
                    <span>{tPalette("hint_select")}</span>
                    <span className="inline-flex items-center gap-1 rounded-md border border-neutral-800 bg-neutral-900 px-2 py-0.5">
                        {tPalette("key_esc")}
                    </span>
                    <span>{tPalette("hint_close")}</span>
                </div>
            </div>
        </div>
    );
};

export default CommandPalette;
