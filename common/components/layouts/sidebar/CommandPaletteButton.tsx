"use client";

import { useTranslations } from "next-intl";
import { BiSolidKeyboard } from "react-icons/bi";

import { useCommandPalette } from "@/common/stores/commandPalette";

const CommandPaletteButton = () => {
    const { openPalette } = useCommandPalette();
    const tPalette = useTranslations("CommandPalette");

    return (
        <button
            type="button"
            onClick={openPalette}
            className="flex w-full items-center justify-between rounded-lg border border-neutral-300/60 bg-neutral-100 px-3 py-2 text-sm text-neutral-700 transition-colors hover:bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-800/80 dark:text-neutral-200 dark:hover:bg-neutral-700"
        >
            <span className="flex items-center gap-2 font-medium">
                <BiSolidKeyboard size={18} className="text-green-500" />
                {tPalette("title")}
            </span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">&#8984;K</span>
        </button>
    );
};

export default CommandPaletteButton;
