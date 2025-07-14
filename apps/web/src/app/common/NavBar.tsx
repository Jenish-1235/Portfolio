// /home/components/common/NavBar.tsx
"use client";

import { motion } from "framer-motion";
import styles from "./NavBar.module.css";

export default function NavBar() {
  return (
    <motion.nav 
      className={styles.navBar}
      initial={{ opacity: 0, y: -20, x: "-50%" }}
      animate={{ opacity: 1, y: 0, x: "-50%" }}
      transition={{ duration: 0.6, delay: 0.1 }}
      style={{ left: "50%" }}
    >
      <ul className={styles.navList}>
        <li>
          <a href="#projects">Projects</a>
        </li>
        <li>
          <a href="#resume">Resume</a>
        </li>
        <li>
          <a href="#blogs">Blogs</a>
        </li>
        <li>
          <a href="#papers">Papershelf</a>
        </li>
        <li>
          <a href="#now">Now</a>
        </li>
      </ul>
    </motion.nav>
  );
}
