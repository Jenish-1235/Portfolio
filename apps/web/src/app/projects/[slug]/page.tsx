import { allProjects } from ".contentlayer/generated";
import { notFound } from "next/navigation";
import NavBar from "../../common/NavBar";
import Footer from "../../common/Footer";
import ProjectDetailClient from "./ProjectDetailClient";

export async function generateStaticParams() {
  return allProjects.map((project) => ({ slug: project.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetail({ params }: PageProps) {
  const { slug } = await params;
  const project = allProjects.find((p) => p.slug === slug);
  
  if (!project) {
    notFound();
  }

  return (
    <>
      <NavBar hideOnMobile={false} />
      <ProjectDetailClient project={project} />
      <Footer />
    </>
  );
}
