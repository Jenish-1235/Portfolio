"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import styles from "./AboutMeSection.module.css";
import PersonalStory from "./PersonalStory";

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
    </div>
  );
}
