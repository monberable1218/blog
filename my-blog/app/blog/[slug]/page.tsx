import { getPostBySlug, getAllSlugs } from "@/lib/posts";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

// ✅ 明示的に型を付けず、Next.js が推論できるようにする
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return {
    title: `${post.title} | My Blog`,
    description: post.excerpt,
  };
}

// ✅ ページ本体
export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return (
    <article className="prose dark:prose-invert max-w-3xl mx-auto p-6">
      <h1 className="mb-2">{post.title}</h1>
      <p className="text-gray-500 text-sm mb-6">{post.date}</p>
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </article>
  );
}
