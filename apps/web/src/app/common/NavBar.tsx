// /home/components/common/NavBar.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./NavBar.module.css";

interface NavBarProps {
  hideOnMobile?: boolean;
}

export default function NavBar({ hideOnMobile = false }: NavBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // If hideOnMobile is true and we're on mobile, don't render anything
  if (hideOnMobile && isMobile) {
    return null;
  }

  return (
    <>
      {isMobile ? (
        <>
          {/* Hamburger Menu Button */}
          <motion.button
            className={styles.hamburgerButton}
            onClick={toggleMenu}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className={`${styles.hamburgerLine} ${
                isMenuOpen ? styles.hamburgerLineOpen : ""
              }`}
            ></div>
            <div
              className={`${styles.hamburgerLine} ${
                isMenuOpen ? styles.hamburgerLineOpen : ""
              }`}
            ></div>
            <div
              className={`${styles.hamburgerLine} ${
                isMenuOpen ? styles.hamburgerLineOpen : ""
              }`}
            ></div>
          </motion.button>

          {/* Mobile Menu Overlay */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className={styles.mobileMenuOverlay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={closeMenu}
              >
                <motion.div
                  className={styles.mobileMenu}
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button className={styles.closeButton} onClick={closeMenu}>
                    ×
                  </button>
                  <ul className={styles.mobileNavList}>
                    <li>
                      <Link href="/" onClick={closeMenu}>
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link href="/projects" onClick={closeMenu}>
                        Projects
                      </Link>
                    </li>
                    <li>
                      <Link href="/blogs" onClick={closeMenu}>
                        Blogs
                      </Link>
                    </li>
                    <li>
                      <Link href="/papershelf" onClick={closeMenu}>
                        Papershelf
                      </Link>
                    </li>
                    <li>
                      <Link href="/now" onClick={closeMenu}>
                        Now
                      </Link>
                    </li>
                    <li>
                      <Link href="/resume" onClick={closeMenu}>
                        Resume
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact" onClick={closeMenu}>
                        Contact Me
                      </Link>
                    </li>
                  </ul>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        /* Desktop Navigation */
        <motion.nav
          className={styles.navBar}
          initial={{ opacity: 0, y: -20, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ left: "50%" }}
        >
          <ul className={styles.navList}>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/projects">Projects</Link>
            </li>
            <li>
              <Link href="/blogs">Blogs</Link>
            </li>
            <li>
              <Link href="/papershelf">Papershelf</Link>
            </li>
            <li>
              <Link href="/now">Now</Link>
            </li>
            <li>
              <Link href="/resume">Resume</Link>
            </li>
            <li>
              <Link href="/contact">Contact Me</Link>
            </li>
          </ul>
        </motion.nav>
      )}
    </>
  );
}
