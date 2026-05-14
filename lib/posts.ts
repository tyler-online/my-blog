import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

export type PostPreview = {
  slug: string;
  title: string;
  date: string;
  description: string;
};

export type FullPost = PostPreview & {
  contentHtml: string;
};

export function getAllPosts(): PostPreview[] {
  const fileNames = fs.readdirSync(postsDirectory);

  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug,
      title: String(data.title),
      date: String(data.date),
      description: String(data.description),
    };
  });

  return posts.sort((a, b) => {
    const tb = Date.parse(b.date);
    const ta = Date.parse(a.date);
    const nb = Number.isNaN(tb) ? 0 : tb;
    const na = Number.isNaN(ta) ? 0 : ta;
    return nb - na;
  });
}

export async function getPostBySlug(slug: string): Promise<FullPost> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    title: String(data.title),
    date: String(data.date),
    description: String(data.description),
    contentHtml,
  };
}