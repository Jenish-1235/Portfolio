"use client";

import { motion, useScroll } from "framer-motion";
import { useRef } from "react";
import styles from "./AboutMeSection.module.css";
import PersonalStory from "./PersonalStory";
import SkillsSection from "./SkillsSection";
import Image from "next/image";
import ExperienceSection from "./ExperienceSection";

export default function AboutMeSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div className={styles.aboutContainer} ref={containerRef}>
      {/* Section 1: Personal Story */}
      <section className={styles.personalStorySection}>
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.2 }}
        >
          Who I Am & What I Do
        </motion.h2>
        <div className={styles.personalSection}>
          <motion.div
            className={styles.profileImageContainer}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <div className={styles.profileImage}>
              <Image
                src="/profile-2.jpeg"
                alt="Jenish Togadiya"
                layout="fill"
                objectFit="cover"
              />
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
        <SkillsSection />
      </section>

      {/* Section 3: Experience */}
      <section className={styles.experienceSection}>
        <ExperienceSection />
      </section>
    </div>
  );
}


