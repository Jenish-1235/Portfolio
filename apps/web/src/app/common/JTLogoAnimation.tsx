"use client";

import { motion, Variants } from "framer-motion";
import styles from "./JTLogoAnimation.module.css";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.2,
      staggerDirection: -1,
    },
  },
};

const jVariants: Variants = {
  hidden: { opacity: 0, y: -20, x: -10 },
  visible: {
    opacity: 1,
    y: 0,
    x: -10,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
    },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: {
      duration: 0.3,
    },
  },
};

const tVariants: Variants = {
  hidden: { opacity: 0, x: "100%" },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
      bounce: 0.4,
    },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: {
      duration: 0.3,
    },
  },
};

const JTLogoAnimation = () => {
  return (
    <motion.div
      className={styles.logoContainer}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.span className={styles.logoJ} variants={jVariants}>
        J
      </motion.span>
      <motion.span className={styles.logoT} variants={tVariants}>
        T
      </motion.span>
    </motion.div>
  );
};

export default JTLogoAnimation;
