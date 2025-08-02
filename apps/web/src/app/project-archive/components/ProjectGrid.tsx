"use client";

import { Project } from ".contentlayer/generated";
import { motion } from "framer-motion";
import styles from "./ProjectGrid.module.css";

interface ProjectGridProps {
  projects: Project[];
}

const ProjectGrid = ({ projects }: ProjectGridProps) => {
  return (
    <section id="project-grid" className={styles.gridSection}>
      <div className={styles.container}>
        <motion.h2 
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          All Projects ({projects.length})
        </motion.h2>
        
        <div className={styles.grid}>
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              className={styles.projectCard}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: "easeOut" 
              }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <p className={styles.projectDescription}>{project.description}</p>
              <div className={styles.projectMeta}>
                <span className={styles.projectYear}>
                  {new Date(project.date).getFullYear()}
                </span>
                <span className={styles.projectCategory}>
                  {project.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectGrid; 