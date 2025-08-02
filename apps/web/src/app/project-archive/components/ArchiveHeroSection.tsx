"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import SplitText from "./SplitText";
import styles from "./ArchiveHeroSection.module.css";

const ArchiveHeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Scroll animations
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  return (
    <motion.section
      ref={heroRef}
      className={styles.hero}
      style={{ opacity: heroOpacity, y: heroY }}
    >
      {/* Back to Projects Link */}
      <motion.div
        className={styles.backLink}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Link href="/projects" className={styles.backButton}>
          <FiArrowLeft />
          <span>Back to Projects</span>
        </Link>
      </motion.div>

      {/* Background Elements */}
      <div className={styles.backgroundElements}>
        <div className={styles.floatingShapes}>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={styles.floatingShape}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + (i % 3) * 30}%`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero Content */}
      <div className={styles.heroContent}>
        <div className={styles.slideContent}>
          <SplitText
            text="Project Archive"
            className={styles.heroTitle}
            splitType="chars"
            delay={50}
            duration={0.8}
            ease="power3.out"
            from={{ opacity: 0, y: 60 }}
            to={{ opacity: 1, y: 0 }}
            textAlign="center"
          />

          <motion.p
            className={styles.heroSubtitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Explore my complete collection of work
          </motion.p>

          <motion.p
            className={styles.heroDescription}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            From web applications to mobile apps, APIs to tools - discover the full
            spectrum of my engineering journey.
          </motion.p>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className={styles.gradientOverlay} />
    </motion.section>
  );
};

export default ArchiveHeroSection;