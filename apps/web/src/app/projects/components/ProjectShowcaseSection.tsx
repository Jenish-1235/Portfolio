"use client";

import { Project } from ".contentlayer/generated";
import { useScroll } from "framer-motion";
import styles from "./ProjectShowcaseSection.module.css";
import { useRef } from "react";
import ProjectCard from "./ProjectCard";

interface ProjectShowcaseSectionProps {
  projects: Project[];
}

const ProjectShowcaseSection = ({
  projects,
}: ProjectShowcaseSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      id="project-showcase"
      className={styles.showcase}
    >
      <div className={styles.stickyContainer}>
        {projects.map((project, i) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={i}
            totalProjects={projects.length}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectShowcaseSection;
