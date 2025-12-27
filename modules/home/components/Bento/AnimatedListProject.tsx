"use client";

import useSWR from "swr";

import AnimatedList from "@/common/components/elements/AnimatedList";
import { ProjectItem } from "@/common/types/projects";
import { fetcher } from "@/services/fetcher";

const AnimatedListProject = () => {
  const { data } = useSWR("/api/projects", fetcher);

  const projects =
    data
      ?.filter((item: ProjectItem) => item?.is_show)
      .sort((a: ProjectItem, b: ProjectItem) => {
        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();
        return dateB - dateA;
      })
      .map((item: ProjectItem) => ({
        image: item.image.startsWith("http")
          ? item.image
          : `/images/projects/${item.image}`,
        href: `/projects/${item.slug}`,
      })) ?? [];

  return (
    <AnimatedList
      items={projects}
      itemImage={true}
      showGradients={false}
      displayScrollbar={false}
    />
  );
};

export default AnimatedListProject;