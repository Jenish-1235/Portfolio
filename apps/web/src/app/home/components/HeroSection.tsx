"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./HeroSection.module.css";
import NavBar from "@/app/common/NavBar";
import PrimaryButton from "@/app/common/PrimaryButton";
import GhostButton from "@/app/common/GhostButton";

export default function HeroSection() {
  return (
    <section className={styles.heroSection}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <NavBar />
      </motion.div>

      <div className={styles.heroTextBlock}>
        <div className={styles.textWrapper}>
          {/* Title */}
          <motion.h1
            className={styles.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Hey, I’m <span className={styles.accent}>Jenish 👋</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            A system designer, builder & writer — crafting experiences in code,
            infra, and words.
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
        </div>
      </div>

      {/* Profile Image */}
      <motion.div
        className={styles.heroImageContainer}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className={styles.heroImageWrapper}>
          <Image
            src="/profile.png"
            alt="Jenish Togadiya"
            width={400}
            height={400}
            className={styles.heroImage}
            priority
          />
        </div>
      </motion.div>
    </section>
  );
}
