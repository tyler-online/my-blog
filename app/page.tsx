// TBC: THIS FILE CONTROLS THE HOME PAGE. LAST EDIT: REMOVED DESCRIPTION OF ARTICLES 05-13-2026
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-5xl font-bold tracking-tight">Tyler Miller</h1>
      <p className="mt-4 text-lg text-gray-600">
        Interested in frontier technology. Founder, investor, likes adventures, and now apparently writing.
      </p>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">Posts</h2>

        <div className="mt-6 space-y-6">
          {posts.map((post) => (
            <article key={post.slug}>
              <Link href={`/posts/${post.slug}`}>
                <h3 className="text-xl font-semibold hover:underline">
                  {post.title}
                </h3>
              </Link>
              <p className="mt-1 text-sm text-gray-500">{post.date}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}