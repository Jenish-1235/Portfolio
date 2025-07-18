"use client";

import { Project } from ".contentlayer/generated";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./ProjectModal.module.css";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  const router = useRouter();
  const [shareButtonText, setShareButtonText] = useState("Share");
  const [isIconChanged, setIsIconChanged] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on the client side to prevent hydration mismatches
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle share URL functionality
  const handleShare = useCallback(async () => {
    if (!project || !isClient) return;
    
    const shareUrl = `${window.location.origin}/projects/${project.slug}`;
    
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareButtonText("URL Copied!");
      setIsIconChanged(true);
      
      // Reset button text and icon after 2.5 seconds
      setTimeout(() => {
        setShareButtonText("Share");
        setIsIconChanged(false);
      }, 2500);
    } catch (err) {
      // Fallback for browsers that don't support clipboard API
      console.error("Failed to copy URL:", err);
      setShareButtonText("Copy failed");
      setIsIconChanged(true);
      setTimeout(() => {
        setShareButtonText("Share");
        setIsIconChanged(false);
      }, 2500);
    }
  }, [project]);

  // Handle ESC key and browser back button
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  }, [onClose]);

  const handlePopState = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      window.addEventListener("popstate", handlePopState);
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("popstate", handlePopState);
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("popstate", handlePopState);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleKeyDown, handlePopState]);

  // Separate effect for URL management to avoid unnecessary re-renders
  useEffect(() => {
    if (!isClient) return; // Only run on client
    
    if (isOpen && project) {
      // Only update URL when modal opens, not on every render
      const currentUrl = new URL(window.location.href);
      if (!currentUrl.searchParams.has('modal')) {
        router.push(`/projects?modal=${project.slug}`, { scroll: false });
      }
    } else if (!isOpen) {
      // Only reset URL when modal closes
      const currentUrl = new URL(window.location.href);
      if (currentUrl.searchParams.has('modal')) {
        router.push("/projects", { scroll: false });
      }
    }
  }, [isOpen, project?.slug, router, isClient]);

  // Don't render anything during SSR to prevent hydration issues
  if (!isClient || !project) return null;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div key={`modal-${project.slug}`} className={styles.modalOverlay}>
          {/* Backdrop - Full screen blur that appears first and fades with modal */}
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.4,
              ease: [0.25, 0.4, 0.25, 1]
            }}
            onClick={onClose}
          />
          
          {/* Modal Content - Slides in after blur, fades out in place */}
          <motion.div
            className={styles.modalContent}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ 
              x: {
                duration: 0.6,
                ease: [0.25, 0.4, 0.25, 1],
                delay: 0.2 // Slide-in starts after blur begins
              },
              opacity: {
                duration: 0.5,
                ease: [0.25, 0.4, 0.25, 1]
              }
            }}
          >
            {/* Header Buttons */}
            <div className={styles.headerButtons}>
              {/* Share Button */}
              <button
                className={styles.shareButton}
                onClick={handleShare}
                aria-label="Share project URL"
              >
                {isIconChanged ? (
                  // Checkmark icon when copied
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  // Share icon by default
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                )}
                <span className={styles.buttonText}>{shareButtonText}</span>
              </button>

              {/* Close Button */}
              <button
                className={styles.closeButton}
                onClick={onClose}
                aria-label="Close project details"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Scrollable Content */}
            <div className={styles.scrollContainer}>
              {/* Project Header */}
              <div className={styles.projectHeader}>
                <div className={styles.projectMeta}>
                  <span className={styles.category}>{project.category}</span>
                  <span className={styles.date}>
                    {new Date(project.date).toLocaleDateString()}
                  </span>
                </div>
                
                <h1 className={styles.projectTitle}>{project.title}</h1>
                <p className={styles.projectDescription}>{project.description}</p>
                
                {/* Project Links */}
                <div className={styles.projectLinks}>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.projectLink}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      Source Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.projectLink} ${styles.live}`}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      View Live
                    </a>
                  )}
                </div>
              </div>

              {/* Project Cover Image */}
              {project.coverImage && (
                <div className={styles.imageContainer}>
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    width={800}
                    height={500}
                    className={styles.coverImage}
                    priority
                  />
                </div>
              )}

              {/* Tech Stack */}
              <div className={styles.techStack}>
                <h2 className={styles.sectionTitle}>Tech Stack</h2>
                <div className={styles.techGrid}>
                  {project.techStack.map((tech, index) => (
                    <span key={index} className={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Content */}
              <div className={styles.projectContent}>
                <h2 className={styles.sectionTitle}>Project Details</h2>
                <div className={styles.contentBody}>
                  {project.body.raw.split('\n').map((paragraph, index) => (
                    paragraph.trim() && (
                      <p key={index} className={styles.paragraph}>
                        {paragraph}
                      </p>
                    )
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
