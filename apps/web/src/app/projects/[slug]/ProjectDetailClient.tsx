'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { RobustMDXContent } from "@/utils/robust-mdx";
import styles from './ProjectDetail.module.css';

interface ProjectDetailClientProps {
  project: any;
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const [readingProgress, setReadingProgress] = useState(0);

  // Reading progress tracker
  useEffect(() => {
    const updateReadingProgress = () => {
      const article = document.querySelector(`.${styles.articleContent}`);
      if (!article) return;

      const articleRect = article.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const articleHeight = articleRect.height;
      const scrollTop = window.pageYOffset;
      const articleTop = (article as HTMLElement).offsetTop;

      // Calculate how much of the article has been scrolled through
      const progress = Math.max(0, Math.min(100, 
        ((scrollTop + windowHeight - articleTop) / articleHeight) * 100
      ));
      
      setReadingProgress(progress);
    };

    window.addEventListener('scroll', updateReadingProgress);
    updateReadingProgress(); // Initial calculation
    
    return () => window.removeEventListener('scroll', updateReadingProgress);
  }, []);

  return (
    <div className={styles.pageContainer}>
      {/* Reading Progress Bar */}
      <div className={styles.progressBar}>
        <motion.div 
          className={styles.progressFill}
          style={{ width: `${readingProgress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${readingProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Simple Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>            <Link href="/projects" className={styles.backButton}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              See All Projects
            </Link>
          
          <div className={styles.headerMeta}>
            <span className={styles.readingTime}>
              {Math.ceil((project.body.raw.split(' ').length || 0) / 200)} min read
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className={styles.mainContainer}>
        {/* Project Header */}
        <motion.header 
          className={styles.projectHeader}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className={styles.projectTitle}>{project.title}</h1>
          
          {project.description && (
            <p className={styles.projectDescription}>{project.description}</p>
          )}

          {/* Project Actions & Meta */}
          <div className={styles.projectMeta}>
            <div className={styles.projectActions}>
              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.actionButton} ${styles.primary}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15,3 21,3 21,9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  Live Demo
                </motion.a>
              )}
              
              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.actionButton} ${styles.secondary}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                  View Code
                </motion.a>
              )}
            </div>

            <div className={styles.metaInfo}>
              {project.category && (
                <span className={styles.category}>{project.category}</span>
              )}
              {project.date && (
                <span className={styles.date}>
                  {new Date(project.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              )}
            </div>
          </div>
        </motion.header>

        {/* Cover Image */}
        {project.coverImage && (
          <motion.div 
            className={styles.coverImageContainer}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Image
              src={project.coverImage}
              alt={project.title}
              width={800}
              height={450}
              className={styles.coverImage}
              priority
            />
          </motion.div>
        )}

        {/* Article Content */}
        <motion.article 
          className={styles.articleContent}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className={styles.prose}>
            <RobustMDXContent 
              raw={project.body.raw}
              className={styles.mdxContent}
            />
          </div>
        </motion.article>

        {/* Tech Stack */}
        {project.techStack && project.techStack.length > 0 && (
          <motion.section 
            className={styles.techSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className={styles.techTitle}>Built with</h3>
            <div className={styles.techList}>
              {project.techStack.map((tech: string, index: number) => (
                <span key={index} className={styles.techItem}>
                  {tech}
                </span>
              ))}
            </div>
          </motion.section>
        )}

        {/* Discussion Section */}
        <motion.section 
          className={styles.discussionSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className={styles.discussionCard}>
            <h3 className={styles.discussionTitle}>Have thoughts on this project?</h3>
            <p className={styles.discussionText}>
              I&apos;d love to hear your feedback, questions, or ideas for improvement.
            </p>
            <motion.button
              className={`${styles.actionButton} ${styles.discussButton} ${styles.disabled}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled
            >
              Start a Discussion (Coming Soon)
            </motion.button>
          </div>
        </motion.section>

        {/* Explore More Section */}
        <motion.section 
          className={styles.exploreMoreSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link href="/projects" className={styles.exploreMoreButton}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
              <span>Explore More Projects</span>
            </Link>
          </motion.div>
        </motion.section>
      </main>
    </div>
  );
}
