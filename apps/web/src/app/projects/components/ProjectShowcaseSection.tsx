"use client";

import { Project } from ".contentlayer/generated";
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import styles from "./ProjectShowcaseSection.module.css";
import AnimatedCurve from "./AnimatedCurve";
import ProjectModal from "./ProjectModal";

interface ProjectShowcaseSectionProps {
  projects: Project[];
}

const ProjectShowcaseSection = ({
  projects,
}: ProjectShowcaseSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <>
      <section
        ref={containerRef}
        id="project-showcase"
        className={styles.showcase}
      >
        <AnimatedCurve containerRef={containerRef} />
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <motion.h2 
              className={styles.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              Featured Projects
            </motion.h2>
            <motion.p 
              className={styles.description}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              A curated selection of my latest work, showcasing innovation and craftsmanship.
            </motion.p>
        </div>

        <div className={styles.projectGrid}>
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.slug} 
              project={project} 
              index={index}
              onLearnMore={() => openModal(project)}
            />
          ))}
        </div>
      </div>
    </section>

    <ProjectModal 
      project={selectedProject}
      isOpen={isModalOpen}
      onClose={closeModal}
    />
  </>
  );
};

interface ProjectCardProps {
  project: Project;
  index: number;
  onLearnMore: () => void;
}

const ProjectCard = ({ project, index, onLearnMore }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.98]);

  return (
    <motion.article
      ref={cardRef}
      className={`${styles.projectCard} ${index % 2 === 1 ? styles.reversed : ''}`}
      style={{ 
        y, 
        opacity, 
        scale
      }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        ease: [0.25, 0.4, 0.25, 1]
      }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className={styles.imageContainer}>
        <motion.div
          className={styles.imageWrapper}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className={styles.projectImage}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className={styles.imageOverlay} />
        </motion.div>
        
        <motion.div 
          className={styles.projectNumber}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {String(index + 1).padStart(2, '0')}
        </motion.div>
      </div>

      <div className={styles.projectContent}>
        <div className={styles.projectMeta}>
          <span className={styles.year}>{new Date(project.date).getFullYear()}</span>
          <div className={styles.tags}>
            {project.techStack?.slice(0, 3).map((tech: string, i: number) => (
              <span key={i} className={styles.tag}>{tech}</span>
            ))}
          </div>
        </div>

        <motion.h3 
          className={styles.projectTitle}
          whileHover={{ x: 10 }}
          transition={{ duration: 0.3 }}
        >
          {project.title}
        </motion.h3>
        
        <p className={styles.projectDescription}>
          {project.description}
        </p>

        <motion.div 
          className={styles.projectLinks}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {/* Learn More button - Opens modal */}
          <motion.button
            className={styles.projectLink}
            onClick={onLearnMore}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            Learn More
            <svg className={styles.linkIcon} viewBox="0 0 24 24" fill="none">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>

          {/* Source Code button - Always present */}
          {project.github && (
            <motion.a
              href={project.github}
              className={`${styles.projectLink} ${styles.secondary}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              Source Code
              <svg className={styles.linkIcon} viewBox="0 0 24 24" fill="none">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.a>
          )}

          {/* Live URL button - Optional, only if available */}
          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              className={`${styles.projectLink} ${styles.live}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              View Live
              <svg className={styles.linkIcon} viewBox="0 0 24 24" fill="none">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="15,3 21,3 21,9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="10" y1="14" x2="21" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.a>
          )}
        </motion.div>
      </div>
    </motion.article>
  );
};

export default ProjectShowcaseSection;
