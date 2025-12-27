export type ProjectItem = {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  link_demo?: string | null;
  link_github?: string | null;
  stacks: string[];
  content?: string | null;
  is_show: boolean;
  is_featured: boolean;
  created_at: string;
};

export type ProjectItemProps = {
  projects: ProjectItem[];
}
