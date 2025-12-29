import fs from "fs";
import path from "path";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import matter from "gray-matter";

import { MdxFileProps } from "../types/mdx";

/**
 * Load MDX files from a specific directory
 * @param dirName - Directory name (e.g., 'projects' or 'blog')
 * @returns Array of MDX file contents
 */
const loadMdxFromDirectory = (dirName: string): MdxFileProps[] => {
  const dirPath = path.join(process.cwd(), "contents", dirName);

  if (!fs.existsSync(dirPath)) {
    return [];
  }

  const files = fs.readdirSync(dirPath);

  const contents = files
    .filter((file) => file.endsWith(".mdx")) // Only process .mdx files
    .map((file) => {
      const filePath = path.join(dirPath, file);
      const source = fs.readFileSync(filePath, "utf-8");
      const { content, data } = matter(source);

      const mdxCompiler = remark()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkMdx);
      const mdxContent = mdxCompiler.processSync(content).toString();

      return {
        slug: file.replace(".mdx", ""),
        frontMatter: data,
        content: mdxContent,
      };
    });

  return contents;
};

/**
 * Load all MDX files from both projects and blog directories
 * @returns Array of all MDX file contents
 */
export const loadMdxFiles = (): MdxFileProps[] => {
  const projectContents = loadMdxFromDirectory("projects");
  const blogContents = loadMdxFromDirectory("blog");

  // Combine both arrays
  return [...projectContents, ...blogContents];
};

/**
 * Load MDX files only from projects directory
 * @returns Array of project MDX file contents
 */
export const loadProjectMdxFiles = (): MdxFileProps[] => {
  return loadMdxFromDirectory("projects");
};

/**
 * Load MDX files only from blog directory
 * @returns Array of blog MDX file contents
 */
export const loadBlogMdxFiles = (): MdxFileProps[] => {
  return loadMdxFromDirectory("blog");
};

/**
 * Get single MDX file by slug from any directory
 * @param slug - File slug (filename without .mdx extension)
 * @returns MDX file content or undefined
 */
export const getMdxFileBySlug = (slug: string): MdxFileProps | undefined => {
  const allContents = loadMdxFiles();
  return allContents.find((content) => content.slug === slug);
};