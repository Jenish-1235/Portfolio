import { allProjects } from ".contentlayer/generated";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import NavBar from "../../common/NavBar";
import Footer from "../../common/Footer";
import { RobustMDXContent } from "@/utils/robust-mdx";

export async function generateStaticParams() {
  return allProjects.map((project) => ({ slug: project.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetail({ params }: PageProps) {
  const { slug } = await params;
  const project = allProjects.find((p) => p.slug === slug);
  
  if (!project) return notFound();

  return (
    <>
      <NavBar />
      <main className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
        {/* Back Button */}
        <section className="pt-32 pb-8 px-4">
          <div className="max-w-4xl mx-auto">
            <Link 
              href="/projects"
              className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-lg transition-colors"
              style={{ 
                color: 'var(--text-secondary)',
                background: 'var(--bg-secondary)'
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Projects
            </Link>
          </div>
        </section>

        {/* Project Hero Section */}
        <section className="pb-16 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Project Header */}
            <div className="text-center mb-12">
              <h1 
                className="text-5xl font-bold mb-4"
                style={{ color: 'var(--text-primary)' }}
              >
                {project.title}
              </h1>
              <p 
                className="text-xl mb-8"
                style={{ color: 'var(--text-secondary)' }}
              >
                {project.description}
              </p>
              
              {/* Project Meta */}
              <div className="flex justify-center items-center gap-6 mb-8">
                <span 
                  className="px-3 py-1 rounded-full text-sm"
                  style={{ 
                    background: 'var(--bg-secondary)', 
                    color: 'var(--text-secondary)' 
                  }}
                >
                  {project.category}
                </span>
                <span style={{ color: 'var(--text-secondary)' }}>
                  {new Date(project.date).toLocaleDateString()}
                </span>
              </div>

              {/* Project Links */}
              <div className="flex justify-center gap-4 mb-12">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-lg transition-colors hover:opacity-90"
                    style={{ 
                      background: 'var(--accent-primary)',
                      color: 'var(--text-inverse)'
                    }}
                  >
                    View Source
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-lg transition-colors hover:opacity-90"
                    style={{ 
                      background: 'var(--accent-secondary)',
                      color: 'var(--text-inverse)'
                    }}
                  >
                    View Live
                  </a>
                )}
              </div>
            </div>

            {/* Project Cover Image */}
            {project.coverImage && (
              <div className="mb-12">
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  width={800}
                  height={500}
                  className="w-full h-96 object-cover rounded-xl shadow-lg"
                  priority
                />
              </div>
            )}

            {/* Tech Stack */}
            <div className="mb-12">
              <h2 
                className="text-2xl font-bold mb-4"
                style={{ color: 'var(--text-primary)' }}
              >
                Tech Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full text-sm"
                    style={{ 
                      background: 'var(--accent-primary-alpha)',
                      color: 'var(--accent-primary)'
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Project Content */}
        <section className="pb-16 px-4">
          <div className="max-w-4xl mx-auto">
            <article 
              className="prose prose-lg max-w-none"
              style={{ color: 'var(--text-primary)' }}
            >
              <RobustMDXContent 
                raw={project.body.raw}
                className="whitespace-pre-wrap leading-relaxed text-lg"
              />
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
