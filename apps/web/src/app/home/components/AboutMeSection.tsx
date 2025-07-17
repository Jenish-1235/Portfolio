"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import styles from "./AboutMeSection.module.css";
import PersonalStory from "./PersonalStory";
import SkillsSection from "./SkillsSection";

export default function AboutMeSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest < 0.5) setCurrentSection(0);
      else setCurrentSection(1);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div className={styles.aboutContainer} ref={containerRef}>
      {/* Section 1: Personal Story */}
      <section className={styles.personalStorySection}>
        <div className={styles.personalSection}>
          <motion.div
            className={styles.profileImageContainer}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <div className={styles.profileImage}>
              <img src="/profile-2.jpeg" alt="Jenish Togadiya" />
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
      <section className={styles.skillsSection}>
        <SkillsSection scrollYProgress={scrollYProgress} />
      </section>
    </div>
  );
}


