"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import styles from "./AboutMeSection.module.css";
import PersonalStory from "./PersonalStory";
import SkillsCloud from "./SkillsCloud";
import ExperienceTimeline from "./ExperienceTimeline";

export default function AboutMeSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest < 0.33) setCurrentSection(0);
      else if (latest < 0.66) setCurrentSection(1);
      else setCurrentSection(2);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div className={styles.aboutContainer} ref={containerRef}>
      {/* Section 1: Personal Story */}
      <section className={styles.section}>
        <div className={styles.personalSection}>
          <motion.div
            className={styles.profileImageContainer}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <div className={styles.profileImage}>
              <img src="/profile.png" alt="Jenish Togadiya" />
            </div>
          </motion.div>
          
          <motion.div
            className={styles.personalStoryContainer}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <PersonalStory />
          </motion.div>
        </div>
      </section>

      {/* Section 2: Skills */}
      <section className={styles.section}>
        <div className={styles.skillsSection}>
          <motion.div
            className={styles.skillsTextContainer}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3>Skills & Expertise</h3>
            <p>
              Over the years, I've mastered a diverse range of technologies and tools, 
              allowing me to build everything from elegant frontends to robust backend systems.
            </p>
            <p>
              My expertise spans across modern web technologies, cloud infrastructure, 
              and developer tools that enable teams to build amazing products.
            </p>
          </motion.div>
          
          <motion.div
            className={styles.skillsCloudContainer}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <SkillsCloud />
          </motion.div>
        </div>
      </section>

      {/* Section 3: Experience Timeline */}
      <section className={styles.section}>
        <motion.div
          className={styles.experienceSection}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <ExperienceTimeline />
        </motion.div>
      </section>
    </div>
  );
}
