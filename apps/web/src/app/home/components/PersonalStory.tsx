"use client";

import { motion } from "framer-motion";
import styles from "./PersonalStory.module.css";

export default function PersonalStory() {
  return (
    <div className={styles.storyContainer}>
      <motion.h3
        className={styles.storyTitle}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false, amount: 0.3 }}
      >
        My Journey
      </motion.h3>

      <div className={styles.storyContent}>
        <motion.div
          className={styles.storyBlock}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <p>
            I&apos;m <strong>Jenish Togadiya</strong> — a systems-minded
            engineer exploring how code, infrastructure, and mobile technologies
            come together to solve real-world problems.
          </p>
        </motion.div>

        <motion.div
          className={styles.storyBlock}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <p>
            My journey began with curiosity — building static pages, scripting
            tools, and eventually diving into scalable systems. Along the way,
            I’ve developed full-stack applications, mobile platforms, and
            backend systems built with performance and clarity in mind.
          </p>
        </motion.div>

        <motion.div
          className={styles.storyBlock}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <p>
            I care deeply about engineering systems that are not just functional
            — but maintainable, observable, and thoughtfully designed. And I
            share what I learn along the way, whether through code,
            documentation, or mentoring.
          </p>
        </motion.div>

        <motion.div
          className={styles.currentFocus}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <h4>Currently focusing on:</h4>
          <ul>
            <li>Engineering reliable full-stack and mobile applications</li>
            <li>Exploring AI/ML applications in developer workflows</li>
            <li>Contributing to and growing open-source ecosystems</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
