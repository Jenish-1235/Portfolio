import { allBlogs } from ".contentlayer/generated";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return allBlogs.map((post) => ({ slug: post.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = allBlogs.find((p) => p.slug === slug);
  if (!post) return notFound();

  return (
    <article className="prose mx-auto py-10">
      <h1>{post.title}</h1>
      <div className="whitespace-pre-wrap">{post.body.raw}</div>
    </article>
  );
}
