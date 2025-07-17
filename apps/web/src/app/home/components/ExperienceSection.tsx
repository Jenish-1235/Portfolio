"use client";

import React, { useRef } from 'react';
import styles from './ExperienceSection.module.css';
import experiences from '@/app/home/data/experiences.json';
import { motion, useInView, useScroll, useSpring } from 'framer-motion';
import useIsMobile from '@/hooks/useIsMobile';

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

const ExperienceItem = ({ exp, index }: { exp: Experience, index: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.3 });

    const itemVariants = {
        hidden: { opacity: 0, x: index % 2 === 0 ? -100 : 100, scale: 0.95 },
        visible: { 
            opacity: 1, 
            x: 0,
            scale: 1,
            transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }
        }
    };

    const contentVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6, ease: "easeOut", delay: 0.2 }
        }
    };

    return (
        <motion.div 
            ref={ref}
            key={exp.id}
            className={`${styles.timelineItem} ${index % 2 === 0 ? styles.left : styles.right}`}
            variants={itemVariants as any}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            <div className={`${styles.timelineDot} ${isInView ? styles.inView : ''}`}></div>
            <motion.div className={styles.timelineContent} variants={contentVariants as any}>
                <h3 className={styles.jobTitle}>{exp.position}</h3>
                <p className={styles.company}>{exp.company} &middot; {exp.duration}</p>
                <ul className={styles.responsibilities}>
                    {exp.achievements.map((point: string, i: number) => (
                        <motion.li 
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 + i * 0.1 }}
                        >
                            {point}
                        </motion.li>
                    ))}
                </ul>
                <div className={styles.tags}>
                    {exp.technologies.map((tag: string, i: number) => (
                         <motion.span 
                            key={tag} 
                            className={styles.tag}
                            initial={{ opacity: 0, y: 10 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.6 + i * 0.05 }}
                        >
                            {tag}
                        </motion.span>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
};

const ExperienceSection = () => {
    const timelineRef = useRef(null);
    const isMobile = useIsMobile();

    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ["start end", "end start"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

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
            <div ref={timelineRef} className={styles.timeline}>
                 {!isMobile && (
                    <motion.div 
                        className={styles.timelineProgress} 
                        style={{ scaleY }}
                    />
                 )}
                {experiences.experiences.map((exp: Experience, index: number) => (
                    <ExperienceItem key={exp.id} exp={exp} index={index} />
                ))}
            </div>
        </div>
    );
};

export default ExperienceSection;
