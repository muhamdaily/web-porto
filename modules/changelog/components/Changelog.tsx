import { CHANGELOG_ENTRIES } from "../data";

const TAG_STYLES = {
    new: {
        label: "New",
        className:
            "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    },
    improved: {
        label: "Improved",
        className:
            "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400",
    },
    fixed: {
        label: "Fixed",
        className:
            "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    },
} as const;

const Changelog = () => {
    return (
        <section className="flex flex-col gap-6">
            {CHANGELOG_ENTRIES.map((entry, entryIndex) => (
                <div key={`${entry.version}-${entryIndex}`}>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="rounded-full bg-green-500 px-3 py-0.5 text-xs font-bold text-neutral-900">
                                {entry.version}
                            </span>
                            <span className="text-xs text-neutral-400 dark:text-neutral-500">
                                {entry.date}
                            </span>
                            <h2 className="text-base font-semibold text-neutral-800 dark:text-neutral-200">
                                {entry.title}
                            </h2>
                        </div>

                        <ul className="space-y-2">
                            {entry.items.map((item, itemIndex) => {
                                const tagStyle = TAG_STYLES[item.type];

                                return (
                                    <li
                                        key={`${entry.version}-${itemIndex}`}
                                        className="flex items-start gap-3"
                                    >
                                        <span
                                            className={`mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${tagStyle.className}`}
                                        >
                                            {tagStyle.label}
                                        </span>
                                        <span className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                                            {item.text}
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {entryIndex < CHANGELOG_ENTRIES.length - 1 && (
                        <hr className="my-6 border-neutral-200 dark:border-neutral-800" />
                    )}
                </div>
            ))}
        </section>
    );
};

export default Changelog;
