import { HiOutlineArrowUpRight } from "react-icons/hi2";
import {
  BiTerminal,
  BiGridAlt,
  BiGlobe,
  BiLayer,
  BiLaptop,
  BiCodeAlt,
} from "react-icons/bi";

import { USES_SECTIONS, UsesSectionId } from "../data";

const SECTION_ICONS: Record<UsesSectionId, React.ReactNode> = {
  terminal: <BiTerminal size={20} />,
  apps: <BiGridAlt size={20} />,
  browser: <BiGlobe size={20} />,
  tech: <BiLayer size={20} />,
  hardware: <BiLaptop size={20} />,
  editor: <BiCodeAlt size={20} />,
};

const Uses = () => {
  return (
    <section className="space-y-8">
      {USES_SECTIONS.map((section) => (
        <div key={section.id} className="flex flex-col gap-3">
          <div className="flex items-center gap-2 border-b border-dashed border-neutral-200 pb-3 dark:border-neutral-700">
            <span className="text-green-500">{SECTION_ICONS[section.id]}</span>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
              {section.title}
            </h2>
          </div>
          <ul className="space-y-2">
            {section.items.map((item) => {
              const itemContent = (
                <>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                      {item.name}
                    </span>
                    <span className="text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
                      {item.description}
                    </span>
                  </div>
                  {item.href ? (
                    <span
                      className="mt-0.5 shrink-0 text-neutral-400 transition-colors group-hover:text-green-500 dark:text-neutral-500 dark:group-hover:text-green-500"
                      aria-hidden="true"
                    >
                      <HiOutlineArrowUpRight size={16} />
                    </span>
                  ) : null}
                </>
              );

              return item.href ? (
                <li key={item.name}>
                  <a
                    className="group flex items-start justify-between gap-4 rounded-lg p-2 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Visit ${item.name}`}
                  >
                    {itemContent}
                  </a>
                </li>
              ) : (
                <li
                  key={item.name}
                  className="flex items-start justify-between gap-4 rounded-lg p-2"
                >
                  {itemContent}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </section>
  );
};

export default Uses;
