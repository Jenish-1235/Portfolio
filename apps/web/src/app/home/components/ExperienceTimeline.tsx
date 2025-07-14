"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { experienceData } from "../data/experiences";
import styles from "./ExperienceTimeline.module.css";

interface Experience {
  id: number;
  company: string;
  position: string;
  duration: string;
  period: string;
  type: string;
  description: string;
  achievements: string[];
  technologies: string[];
  logo: string;
}

export default function ExperienceTimeline() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const experiences: Experience[] = experienceData.experiences;

  useEffect(() => {
    if (!isAutoScrolling) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= experiences.length - 1) {
          setIsAutoScrolling(false);
          return prev;
        }
        return prev + 1;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoScrolling, experiences.length]);

  const handleCardClick = (index: number) => {
    setCurrentIndex(index);
    setIsAutoScrolling(false);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
    setIsAutoScrolling(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(experiences.length - 1, prev + 1));
    setIsAutoScrolling(false);
  };

  return (
    <div className={styles.timelineContainer}>
      <motion.h3
        className={styles.timelineTitle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Experience Timeline
      </motion.h3>

      <div className={styles.timelineWrapper}>
        {/* Timeline Line */}
        <div className={styles.timelineLine}>
          <motion.div
            className={styles.progressLine}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: (currentIndex + 1) / experiences.length }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </div>

        {/* Timeline Markers */}
        <div className={styles.timelineMarkers}>
          {experiences.map((_, index) => (
            <motion.div
              key={index}
              className={`${styles.marker} ${index <= currentIndex ? styles.active : ''}`}
              style={{ left: `${(index / (experiences.length - 1)) * 100}%` }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => handleCardClick(index)}
            />
          ))}
        </div>

        {/* Experience Cards */}
        <div className={styles.cardsContainer}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className={styles.experienceCard}
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <div className={styles.companyLogo}>
                    {experiences[currentIndex].logo}
                  </div>
                  <div className={styles.cardInfo}>
                    <h4 className={styles.position}>
                      {experiences[currentIndex].position}
                    </h4>
                    <h5 className={styles.company}>
                      {experiences[currentIndex].company}
                    </h5>
                    <span className={styles.duration}>
                      {experiences[currentIndex].duration}
                    </span>
                  </div>
                </div>

                <p className={styles.description}>
                  {experiences[currentIndex].description}
                </p>

                <div className={styles.achievements}>
                  <h6>Key Achievements:</h6>
                  {experiences[currentIndex].achievements.map((achievement, i) => (
                    <motion.div
                      key={i}
                      className={styles.achievement}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                    >
                      • {achievement}
                    </motion.div>
                  ))}
                </div>

                <div className={styles.technologies}>
                  <h6>Technologies:</h6>
                  <div className={styles.techTags}>
                    {experiences[currentIndex].technologies.map((tech, i) => (
                      <motion.span
                        key={i}
                        className={styles.techTag}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className={styles.navigation}>
          <button
            className={styles.navButton}
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            ←
          </button>
          <span className={styles.indexIndicator}>
            {currentIndex + 1} / {experiences.length}
          </span>
          <button
            className={styles.navButton}
            onClick={handleNext}
            disabled={currentIndex === experiences.length - 1}
          >
            →
          </button>
        </div>

        {isAutoScrolling && (
          <div className={styles.autoScrollIndicator}>
            <span>Auto-scrolling...</span>
          </div>
        )}
      </div>
    </div>
  );
}
