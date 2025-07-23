import { allBlogs } from ".contentlayer/generated";
import Link from "next/link";
import Footer from "../common/Footer";
import NavBar from "../common/NavBar";

export default function BlogList() {
  return (
    <>
      <NavBar />
      <main className="p-6" style={{ minHeight: "100vh", paddingTop: "10rem", paddingLeft: "2rem" }}>
        <h1 className="text-3xl font-bold mb-6">Blog</h1>
        <p>This page is under construction.</p>
        <ul className="space-y-4">
          {allBlogs.map((post) => (
            <li key={post.slug}>
              <Link href={`/blogs/${post.slug}`}>
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p className="text-gray-500 text-sm">{post.date}</p>
                <p>{post.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
