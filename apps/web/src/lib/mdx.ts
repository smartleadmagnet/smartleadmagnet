import matter from "gray-matter";
import fs from "fs";
import path from "path";
import type { MDXFrontMatter } from "@/lib/types";

export type BlogMetadata = {
  title: string;
  date: string;
  modifiedTime: string;
  summary: string;
  slug: string;
  image?: string;
};

type GetAllPostsOptions = {
  limit?: number;
};

export type TOC = {
  title: string;
  url: string;
  depth: number;
};

const root = process.cwd();

export const getMdx = (fileName: string, filePath?: string) => {
  const postsPath = filePath ?? path.join(root, "posts");
  const fullPath = path.join(postsPath, fileName);
  const docSource = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(docSource);

  return {
    frontMatter: {
      ...data,
      slug: fileName.replace(".mdx", ""),
    } as MDXFrontMatter,
    content,
  };
};

const readFile = (filePath: string) => {
  return fs.readFileSync(filePath, "utf8");
};

export const readMDXFile = <T>(filePath: string) => {
  const rawContent = readFile(filePath);
  const { content, data } = matter(rawContent);

  return {
    content,
    metadata: data as T,
  };
};

export const getAllPages = <T>(directoryPath: string, options: GetAllPostsOptions = {}) => {
  const { limit } = options;

  const pagesDirectory = path.join(root, directoryPath);

  const fileNames = fs.readdirSync(pagesDirectory).filter((fileName) => fileName.endsWith(".mdx"));

  return fileNames
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(pagesDirectory, fileName);
      const { metadata } = readMDXFile<T>(fullPath);

      return {
        ...metadata,
        slug,
      } as T;
    })
    .slice(0, limit);
};

export const getPage = <T>(filePath: string) => {
  const fullPath = path.join(root, `${filePath}.mdx`);
  console.log(fullPath);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const { content, metadata } = readMDXFile<T>(fullPath);

  return {
    content,
    metadata: {
      ...metadata,
      slug: filePath.split("/").pop(),
    } as T,
  };
};
