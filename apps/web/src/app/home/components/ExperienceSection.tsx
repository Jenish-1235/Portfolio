"use client";

import React from 'react';
import styles from './ExperienceSection.module.css';
import experiences from '@/app/home/data/experiences.json';
import { motion } from 'framer-motion';

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

const ExperienceSection = () => {
  return (
    <div className={styles.experienceSection}>
      <motion.h2 
        className={styles.title}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.2 }}
      >
        Professional Experience
      </motion.h2>
      <div className={styles.timeline}>
        {experiences.experiences.map((exp: Experience, index: number) => (
          <motion.div 
            key={exp.id}
            className={`${styles.timelineItem} ${index % 2 === 0 ? styles.left : styles.right}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <div className={styles.timelineDot}></div>
            <div className={styles.timelineContent}>
              <h3 className={styles.jobTitle}>{exp.position}</h3>
              <p className={styles.company}>{exp.company} &middot; {exp.duration}</p>
              <ul className={styles.responsibilities}>
                {exp.achievements.map((point: string, i: number) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
              <div className={styles.tags}>
                {exp.technologies.map((tag: string) => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceSection;
