import { getPostBySlug, getAllPosts } from "@/lib/posts";

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <p className="text-sm text-gray-500">{post.date}</p>
      <h1 className="mt-2 text-5xl font-bold tracking-tight">{post.title}</h1>
      <p className="mt-4 text-lg text-gray-600">{post.description}</p>

      <article
        className="prose prose-gray mt-10"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </main>
  );
}