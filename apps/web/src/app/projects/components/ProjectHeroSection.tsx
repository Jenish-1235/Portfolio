"use client";

import {
  motion,
  Variants,
  useScroll,
  useTransform,
} from "framer-motion";
import styles from "./ProjectHeroSection.module.css";
import { FiArrowDown } from "react-icons/fi";
import PrimaryButton from "@/app/common/PrimaryButton";
import GhostButton from "@/app/common/GhostButton";
import { useRef } from "react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.5,
    },
  },
};

const textVariants: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1], // EaseOutExpo
    },
  },
};

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const ProjectHeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const animationStart = 0.15; // Start animation after 15% of scroll
  const animationEnd = 0.65; // End animation at 65% of scroll

  // Define a fixed distance for symmetrical travel
  const exitDistance = "-40rem";
  const entryDistance = "40rem";

  // Animate title moving left, rotating, and fading out on scroll
  const titleX = useTransform(
    scrollYProgress,
    [animationStart, animationEnd],
    ["0rem", exitDistance]
  );
  const titleOpacity = useTransform(
    scrollYProgress,
    [animationStart, animationEnd],
    [1, 0]
  );
  const titleRotate = useTransform(
    scrollYProgress,
    [animationStart, animationEnd],
    [0, -110]
  );
  const titleSkew = useTransform(
    scrollYProgress,
    [animationStart, animationEnd],
    [0, -10]
  );

  // Animate subtitle moving right, rotating, and fading out on scroll
  const subtitleX = useTransform(
    scrollYProgress,
    [animationStart, animationEnd],
    ["0rem", entryDistance]
  );
  const subtitleOpacity = useTransform(
    scrollYProgress,
    [animationStart, animationEnd],
    [1, 0]
  );
  const subtitleRotate = useTransform(
    scrollYProgress,
    [animationStart, animationEnd],
    [0, 110]
  );
  const subtitleSkew = useTransform(
    scrollYProgress,
    [animationStart, animationEnd],
    [0, 10]
  );

  // Animate CTA and scroll indicator fading out
  const ctaOpacity = useTransform(
    scrollYProgress,
    [animationStart, animationEnd],
    [1, 0]
  );

  const handleScroll = () => {
    const showcase = document.getElementById("project-showcase");
    if (showcase) {
      showcase.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.section
      ref={heroRef}
      className={styles.hero}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className={styles.textContainer}>
        <div className={styles.animatingTextWrapper}>
          <motion.h1
            className={styles.title}
            variants={textVariants}
            style={{
              x: titleX,
              opacity: titleOpacity,
              rotate: titleRotate,
              skew: titleSkew,
            }}
          >
            Selected Works
          </motion.h1>
        </div>
        <div className={styles.animatingTextWrapper}>
          <motion.p
            className={styles.subtitle}
            variants={textVariants}
            style={{
              x: subtitleX,
              opacity: subtitleOpacity,
              rotate: subtitleRotate,
              skew: subtitleSkew,
            }}
          >
            A collection of projects where I&apos;ve turned complex problems into
            elegant, user-centric solutions.
          </motion.p>
        </div>
      </div>
      <motion.div
        className={styles.ctaContainer}
        variants={fadeIn}
        style={{ opacity: ctaOpacity }}
      >
        <PrimaryButton onClick={handleScroll}>
          Explore Projects
        </PrimaryButton>
        <GhostButton>Get in Touch</GhostButton>
      </motion.div>
      <motion.div
        className={styles.scrollIndicator}
        variants={fadeIn}
        style={{ opacity: ctaOpacity }}
      >
        <FiArrowDown />
      </motion.div>
    </motion.section>
  );
};

export default ProjectHeroSection;
