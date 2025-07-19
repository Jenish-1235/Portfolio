"use client";

import {
  motion,
  useTransform,
  MotionValue,
} from "framer-motion";
import { Project } from ".contentlayer/generated";
import Link from "next/link";
import Image from "next/image";
import styles from "./ProjectShowcaseSection.module.css";

interface ProjectCardProps {
  project: Project;
  index: number;
  totalProjects: number;
  scrollYProgress: MotionValue<number>;
}

const ProjectCard = ({
  project,
  index,
  totalProjects,
  scrollYProgress,
}: ProjectCardProps) => {
  const targetScale = 1 - (totalProjects - index) * 0.05;
  const scale = useTransform(
    scrollYProgress,
    [index / totalProjects, 1],
    [1, targetScale]
  );

  const opacity = useTransform(
    scrollYProgress,
    [(index - 0.5) / totalProjects, (index + 0.5) / totalProjects],
    [1, 0]
  );

  return (
    <motion.div
      className={styles.projectCardWrapper}
      style={{
        scale,
        opacity,
        top: `${index * 3}rem`,
      }}
    >
      <div className={styles.projectCard}>
        <Link href={`/projects/${project.slug}`} className={styles.cardLink}>
          <div className={styles.imageContainer}>
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              className={styles.projectImage}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className={styles.cardContent}>
            <div className={styles.cardHeader}>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <span className={styles.projectYear}>
                {new Date(project.date).getFullYear()}
              </span>
            </div>
            <p className={styles.projectDescription}>{project.description}</p>
            <div className={styles.tags}>
              {project.techStack.map((tag: string) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Link>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
