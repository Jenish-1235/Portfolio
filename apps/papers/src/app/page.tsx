import { allPapers } from "contentlayer/generated";
export default function BlogHome() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Blog</h1>
      {allPapers.map((post) => (
        <div key={post._id} className="mb-6">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="text-sm text-gray-500">{post.date}</p>
          <p>{post.summary}</p>
        </div>
      ))}
    </div>
  );
}
