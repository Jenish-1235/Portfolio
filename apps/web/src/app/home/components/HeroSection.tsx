"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./HeroSection.module.css";
import PrimaryButton from "@/app/common/PrimaryButton";
import GhostButton from "@/app/common/GhostButton";

export default function HeroSection() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroTextBlock}>
        {/* Profile Image - will be reordered via CSS */}
        <motion.div
          className={styles.heroImageContainer}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className={styles.heroImageWrapper}>
            <Image
              src="/profile.jpeg"
              alt="Jenish Togadiya"
              width={400}
              height={400}
              className={styles.heroImage}
              priority
            />
          </div>
        </motion.div>

        <div className={styles.textWrapper}>
          {/* Title */}
          <motion.h1
            className={styles.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Hey, I&apos;m <span className={styles.accent}>Jenish 👋</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            I engineer systems — across backend, mobile, and infrastructure —
            with reliability and intent.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className={styles.ctaContainer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <PrimaryButton>Explore My Work</PrimaryButton>
            <GhostButton>Get in Touch</GhostButton>
          </motion.div>

          {/* Scroll Hint */}
          <motion.div
            className={styles.scrollHint}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <div className={styles.scrollIndicator}>
              <div className={styles.scrollArrow}></div>
              <span className={styles.scrollText}>Scroll to explore</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
