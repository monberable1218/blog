import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDir = path.join(process.cwd(), "content/blog");
export type TypePost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
};
export function getAllPosts():TypePost[]{
  const files = fs.readdirSync(postsDir);

  return files.map((file) => {
    const slug = file.replace(".md", "");
    const raw = fs.readFileSync(path.join(postsDir, file), "utf-8");
    const { data } = matter(raw);
    return { slug, ...(data as {title:string; date:string; excerpt: string;})};
  });
}


export type TypeTest = {
  slug: string;
  contentHtml: string;
  title: string;
  date: string;
  excerpt: string;
};
export async function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDir, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf-8");

  const { data, content } = matter(fileContents);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    contentHtml,
    ...(data as {title:string; date:string; excerpt: string;}),
  };
}

export async function getAllSlugs() {
  return fs
    .readdirSync(postsDir)
    .map((file) => file.replace(".md", ""));
}