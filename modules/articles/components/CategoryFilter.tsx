import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { LuChevronsUpDown as ArrowIcon } from "react-icons/lu";
import { TiTick as ActiveIcon } from "react-icons/ti";
import { FiSearch as SearchIcon } from "react-icons/fi";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import cn from "@/common/libs/clsxm";
import Button from "@/common/components/elements/Button";

interface CategoryFilterProps {
    categories: string[];
    value: string;
    onChange: (value: string) => void;
}

const CategoryFilter = ({ categories, value, onChange }: CategoryFilterProps) => {
    const t = useTranslations("ArticlesPage");
    const [isOpen, setIsOpen] = useState(false);
    const [inputValueSearch, setInputValueSearch] = useState("");
    const comboBoxRef = useRef<HTMLDivElement>(null);

    const data = useMemo(
        () => [
            { label: t("category_all"), value: "" },
            ...categories.map((category) => ({ label: category, value: category })),
        ],
        [categories, t],
    );

    const filteredData = data.filter((item) =>
        item.label.toLowerCase().includes(inputValueSearch.toLowerCase()),
    );

    const handleClickOpen = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (newValue: string) => {
        onChange(value === newValue ? "" : newValue);
        setIsOpen(false);
    };

    const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValueSearch(event.target.value);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                comboBoxRef.current &&
                !comboBoxRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const selectedLabel =
        data.find((item) => item.value === value)?.label || t("filter_placeholder");

    return (
        <div ref={comboBoxRef} className="relative w-full md:w-[240px]">
            <Button
                className="flex w-full items-center justify-between gap-4 bg-neutral-100 p-2 text-neutral-900 outline outline-neutral-300 hover:bg-neutral-300 dark:bg-neutral-900 dark:text-neutral-400 dark:outline-neutral-700 dark:hover:bg-neutral-800"
                onClick={handleClickOpen}
                data-umami-event="click_filter_articles"
            >
                <span className="text-sm">{selectedLabel}</span>
                <ArrowIcon
                    className={cn("transition duration-200", isOpen && "scale-125")}
                />
            </Button>

            {isOpen && (
                <motion.div
                    initial={{ scale: 0, y: -20 }}
                    animate={{ scale: 1, y: 0 }}
                    className="absolute left-0 top-12 z-50 w-full"
                >
                    <div className="w-full overflow-hidden rounded-md bg-neutral-100 outline outline-neutral-300 dark:bg-neutral-900 dark:outline-neutral-600">
                        <div className="grid w-full grid-cols-[1.5rem_1fr] items-center border-b border-neutral-700 px-2 py-2">
                            <SearchIcon className="text-neutral-500" />
                            <input
                                type="search"
                                className="w-full border-0 bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-500 dark:text-neutral-50"
                                placeholder={t("category_search_placeholder")}
                                onChange={handleChangeInput}
                                value={inputValueSearch}
                            />
                        </div>

                        <div className="p-1">
                            {filteredData.length === 0 && (
                                <div className="px-4 py-2 text-center text-sm text-neutral-900 dark:text-neutral-50">
                                    {t("category_empty")}
                                </div>
                            )}

                            {filteredData.map((item) => (
                                <button
                                    key={item.value || "all"}
                                    className="grid w-full grid-cols-[1.5rem_1fr] items-center rounded-[4px] p-2 text-neutral-900 hover:bg-neutral-300 dark:text-neutral-50 dark:hover:bg-neutral-800"
                                    onClick={() => handleSelect(item.value)}
                                >
                                    {item.value === value && <ActiveIcon />}
                                    <span className="col-start-2 flex justify-start text-sm">
                                        {item.label}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default CategoryFilter;
