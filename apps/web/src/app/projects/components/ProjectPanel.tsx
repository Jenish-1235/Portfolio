"use client";

import { Project } from ".contentlayer/generated";
import Link from "next/link";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import styles from "./ProjectPanel.module.css";
import PrimaryButton from "@/app/common/PrimaryButton";

interface ProjectPanelProps {
  project: Project;
  className?: string;
  "data-panel-index"?: number;
}

const ProjectPanel = ({ 
  project, 
  className = "",
  "data-panel-index": dataPanelIndex 
}: ProjectPanelProps) => {
  return (
    <div 
      className={`${styles.projectPanel} ${className}`}
      data-panel-index={dataPanelIndex}
    >
      <div className={styles.content}>
        <div className={styles.textContent}>
          <h3 className={styles.title}>{project.title}</h3>
          <p className={styles.description}>{project.description}</p>
          
          <div className={styles.techStack}>
            {project.techStack.slice(0, 4).map((tech: string) => (
              <span key={tech} className={styles.techTag}>
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className={styles.techTag}>
                +{project.techStack.length - 4}
              </span>
            )}
          </div>
        </div>

        <div className={styles.actionButtons}>
          {/* Conditional buttons for live URLs */}
          {(project.liveUrl || project.github) && (
            <div className={styles.topButtons}>
              {project.liveUrl && (
                <a 
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.linkButton}
                >
                  <FiExternalLink />
                  Live Site
                </a>
              )}
              
              {project.github && (
                <a 
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.linkButton}
                >
                  <FiGithub />
                  GitHub
                </a>
              )}
            </div>
          )}

          {/* Main CTA button */}
          <Link href={`/projects/${project.slug}`} className={styles.mainButtonLink}>
            <PrimaryButton>
              Learn More
            </PrimaryButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectPanel;
