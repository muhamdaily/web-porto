import React, { useTransition } from "react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";

import { Locale } from "@/config";
import { setUserLocale } from "@/services/locale";

const IntlToggle = () => {
  const currentLocale = useLocale();
  const t = useTranslations("CommandPalette");

  const locales = [
    { value: "en" as Locale, flag: "🇺🇸" },
    { value: "id" as Locale, flag: "🇮🇩" },
  ];

  const [isPending, startTransition] = useTransition();

  const currentIndex = locales.findIndex(
    (locale) => locale.value === currentLocale,
  );
  const buttonWidth = 40;
  const totalWidth = buttonWidth * locales.length;
  const slidePosition = currentIndex * buttonWidth;

  const handleLocaleChange = (locale: Locale) => {
    if (locale === currentLocale || isPending) return;

    startTransition(() => {
      setUserLocale(locale);
    });
  };

  return (
    <div className="flex items-center justify-center">
      {/* Desktop */}
      <div
        className={`relative hidden items-center gap-1 rounded-full border-[1.5px] border-neutral-300 bg-neutral-100 p-1 dark:border-neutral-700 dark:bg-neutral-800 lg:flex ${isPending ? "pointer-events-none opacity-70" : ""
          }`}
        style={{ width: `${totalWidth + (locales.length - 1) * 4 + 10}px` }}
      >
        {/* Sliding Background */}
        <motion.div
          className="absolute bottom-1 top-1 w-10 rounded-full bg-green-500"
          animate={{
            x: slidePosition + currentIndex * 4,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        />

        {/* Locale Buttons */}
        {locales.map((locale, index) => (
          <div key={locale.value} className="tooltip-container relative group">
            <div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 hidden w-max max-w-xs rounded bg-neutral-500 px-2 py-1 text-xs font-medium text-neutral-100 dark:bg-neutral-100 dark:text-neutral-700 lg:block opacity-0 scale-95 transform transition-all duration-150 ease-in-out group-hover:opacity-100 group-focus-within:opacity-100 group-hover:scale-100 pointer-events-none">
              {t(`lang_${locale.value}`)}
            </div>

            <motion.button
              className="relative z-10 flex h-8 w-10 items-center justify-center transition duration-200"
              onClick={(e) => { handleLocaleChange(locale.value); (e.currentTarget as HTMLElement).blur(); }}
              whileHover={{ scale: isPending ? 1 : 1.15 }}
              whileTap={{ scale: isPending ? 1 : 0.9 }}
              disabled={isPending}
              aria-label={t(`lang_${locale.value}`)}
              tabIndex={0}
            >
              <motion.div
                className="flex flex-col items-center justify-center text-xs font-medium"
                animate={{
                  color: currentIndex === index ? "#FFFFFF" : "#737373",
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {locale.flag}
              </motion.div>
            </motion.button>
          </div>
        ))}
      </div>

      {/* Mobile */}
      <button
        className="flex items-center gap-2 rounded-full border-[1.5px] border-neutral-300 bg-neutral-100 p-1 transition duration-200 hover:scale-110 dark:border-neutral-700 dark:bg-neutral-800 lg:hidden"
        onClick={() =>
          handleLocaleChange(locales[(currentIndex + 1) % locales.length].value)
        }
        disabled={isPending}
      >
        <motion.div
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white"
        >
          {locales[(currentIndex + 1) % locales.length].flag}
        </motion.div>
      </button>
    </div>
  );
};

export default IntlToggle;
