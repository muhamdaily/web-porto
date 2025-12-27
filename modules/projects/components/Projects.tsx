"use client";

import { useState } from "react";
import useSWR from "swr";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  HiChevronLeft as PrevIcon,
  HiChevronRight as NextIcon,
  HiChevronDoubleLeft as FirstIcon,
  HiChevronDoubleRight as LastIcon
} from "react-icons/hi";

import ProjectSkeleton from "./ProjectSkeleton";
import ProjectCard from "./ProjectCard";
import EmptyState from "@/common/components/elements/EmptyState";
import { fetcher } from "@/services/fetcher";
import { ProjectItem } from "@/common/types/projects";

const ITEMS_PER_PAGE = 4;

const Projects = () => {
  const { data, isLoading, error } = useSWR("/api/projects", fetcher);
  const [currentPage, setCurrentPage] = useState(1);
  const t = useTranslations("ProjectsPage");

  const filteredProjects: ProjectItem[] = data
    ?.filter((item: ProjectItem) => item?.is_show)
    .sort((a: ProjectItem, b: ProjectItem) => {
      if (a.is_featured && !b.is_featured) return -1;
      if (!a.is_featured && b.is_featured) return 1;
      return b.created_at.localeCompare(a.created_at);
    });

  const totalPages = Math.ceil((filteredProjects?.length || 0) / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProjects = filteredProjects?.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (filteredProjects?.length === 0) {
    return <EmptyState message={t("no_data")} />;
  }

  if (error) {
    return <EmptyState message={t("error")} />;
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {[...Array(4)].map((_, i) => (
          <ProjectSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.section
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {currentProjects?.map((project, index) => (
            <motion.div
              key={`${currentPage}-${index}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </motion.section>
      </AnimatePresence>

      {totalPages > 1 && (
        <div className="mt-10 space-y-4">
          <div className="relative h-0.5 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800/50">
            <motion.div
              className="h-full bg-green-500"
              initial={{ width: 0 }}
              animate={{ width: `${(currentPage / totalPages) * 100}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>

          <div className="flex items-center justify-center gap-2">
            <div className="flex gap-2">
              <button
                onClick={() => goToPage(1)}
                disabled={currentPage === 1}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-200 text-neutral-500 transition-all hover:bg-neutral-300 hover:text-green-600 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-neutral-200 disabled:hover:text-neutral-500 dark:bg-neutral-800/50 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-green-500"
                aria-label="First page"
              >
                <FirstIcon size={16} />
              </button>

              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-200 text-neutral-500 transition-all hover:bg-neutral-300 hover:text-green-600 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-neutral-200 disabled:hover:text-neutral-500 dark:bg-neutral-800/50 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-green-500"
                aria-label="Previous page"
              >
                <PrevIcon size={18} />
              </button>
            </div>

            <div className="flex gap-2 px-2">
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                const isActive = currentPage === page;

                if (totalPages > 5) {
                  if (page === 1 || page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)) {
                    return (
                      <motion.button
                        key={page}
                        onClick={() => goToPage(page)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`relative h-9 min-w-[36px] rounded-lg px-3 font-medium transition-all ${isActive
                          ? "bg-green-500 text-white shadow-lg shadow-green-500/30"
                          : "bg-neutral-200 text-neutral-600 hover:bg-neutral-300 hover:text-neutral-900 dark:bg-neutral-800/50 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-white"
                          }`}
                      >
                        {page}
                        {isActive && (
                          <motion.div
                            layoutId="activePageBubble"
                            className="absolute inset-0 rounded-lg border border-green-400/50"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                          />
                        )}
                      </motion.button>
                    );
                  } else if (page === currentPage - 2 || page === currentPage + 2) {
                    return (
                      <div key={page} className="flex h-9 w-9 items-center justify-center text-neutral-400 dark:text-neutral-600">
                        ...
                      </div>
                    );
                  }
                  return null;
                }

                return (
                  <motion.button
                    key={page}
                    onClick={() => goToPage(page)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative h-9 min-w-[36px] rounded-lg px-3 font-medium transition-all ${isActive
                      ? "bg-green-500 text-white shadow-lg shadow-green-500/30"
                      : "bg-neutral-200 text-neutral-600 hover:bg-neutral-300 hover:text-neutral-900 dark:bg-neutral-800/50 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-white"
                      }`}
                  >
                    {page}
                    {isActive && (
                      <motion.div
                        layoutId="activePageBubble"
                        className="absolute inset-0 rounded-lg border border-green-400/50"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-200 text-neutral-500 transition-all hover:bg-neutral-300 hover:text-green-600 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-neutral-200 disabled:hover:text-neutral-500 dark:bg-neutral-800/50 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-green-500"
                aria-label="Next page"
              >
                <NextIcon size={18} />
              </button>

              <button
                onClick={() => goToPage(totalPages)}
                disabled={currentPage === totalPages}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-200 text-neutral-500 transition-all hover:bg-neutral-300 hover:text-green-600 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-neutral-200 disabled:hover:text-neutral-500 dark:bg-neutral-800/50 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-green-500"
                aria-label="Last page"
              >
                <LastIcon size={16} />
              </button>
            </div>
          </div>

          <motion.div
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2 text-sm text-neutral-600 dark:text-neutral-500"
          >
            <span className="font-medium text-green-600 dark:text-green-500">
              Page {currentPage} of {totalPages}
            </span>
            <span>•</span>
            <span>
              {startIndex + 1}-{Math.min(endIndex, filteredProjects?.length)} of {filteredProjects?.length} projects
            </span>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Projects;