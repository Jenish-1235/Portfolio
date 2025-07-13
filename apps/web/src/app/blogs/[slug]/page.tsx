import { allBlogs } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { useMDXComponent } from "next-contentlayer/hooks";

export async function generateStaticParams() {
  return allBlogs.map((post) => ({ slug: post.slug }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = allBlogs.find((p) => p.slug === params.slug);
  if (!post) return notFound();

  const MDXContent = useMDXComponent(post.body.code);

  return (
    <article className="prose mx-auto py-10">
      <h1>{post.title}</h1>
      <MDXContent />
    </article>
  );
}
