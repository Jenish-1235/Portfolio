"use client";

import { Project } from ".contentlayer/generated";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import styles from "./ProjectShowcaseSection.module.css";

interface ProjectShowcaseSectionProps {
  projects: Project[];
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const ProjectShowcaseSection = ({
  projects,
}: ProjectShowcaseSectionProps) => {
  return (
    <section className={styles.showcase}>
      {projects.map((project, i) => (
        <motion.div
          key={project.slug}
          className={styles.projectCard}
          custom={i}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={cardVariants}
        >
          <Link href={`/projects/${project.slug}`} className={styles.cardLink}>
            <div className={styles.imageContainer}>
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                className={styles.projectImage}
              />
            </div>
            <div className={styles.content}>
              <div className={styles.header}>
                <h2 className={styles.projectTitle}>{project.title}</h2>
                <span className={styles.projectYear}>
                  {new Date(project.date).getFullYear()}
                </span>
              </div>
              <p className={styles.projectCategory}>{project.category}</p>
              <p className={styles.projectDescription}>{project.description}</p>
              <div className={styles.techStack}>
                {project.techStack.map((tech: string) => (
                  <span key={tech} className={styles.techTag}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </section>
  );
};

export default ProjectShowcaseSection;
