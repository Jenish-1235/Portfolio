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
            I'm <strong>Jenish Togadiya</strong> — a passionate system designer, builder, and lifelong learner who thrives at the intersection of <em>code, infrastructure, and design</em>.
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
            My journey began with a curiosity about how things work behind the scenes. What started as simple HTML pages evolved into architecting <strong>scalable microservices</strong> handling millions of requests daily.
          </p>
        </motion.div>

        <motion.div
          className={styles.storyBlock}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <p>
            I believe in creating <em>developer experiences that feel magical</em> — where complex systems become intuitive tools that empower teams to build amazing things.
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
            When I'm not coding, you'll find me contributing to <strong>open-source projects</strong>, mentoring fellow developers, or exploring the latest technologies that push the boundaries of what's possible.
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
            <li>Building next-generation developer tools</li>
            <li>Exploring AI/ML integration in web applications</li>
            <li>Contributing to the open-source community</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
