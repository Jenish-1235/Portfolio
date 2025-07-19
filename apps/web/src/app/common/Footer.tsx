"use client";

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from './Footer.module.css';
import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp, FaEnvelope, FaTwitter } from 'react-icons/fa';
import Link from 'next/link';
import navigationFlow from '@/data/navigation.json';
import NextPageLoader from './NextPageLoader';

const Footer = () => {
  const pathname = usePathname();
  const [nextPage, setNextPage] = useState<{ path: string; title: string } | null>(null);

  useEffect(() => {
    // Check if we're on a project slug page
    const isProjectPage = pathname.startsWith('/projects/') && pathname !== '/projects';
    
    if (isProjectPage) {
      // For any project slug page, navigate back to projects
      setNextPage({ path: '/projects', title: 'Projects' });
    } else {
      // Use the normal navigation flow for other pages
      const currentPage = navigationFlow.find(page => page.path === pathname);
      if (currentPage && currentPage.nextPath) {
        setNextPage({ path: currentPage.nextPath, title: currentPage.nextTitle! });
      } else {
        setNextPage(null);
      }
    }
  }, [pathname]);

  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          <div className={styles.ctaSection}>
            <h2 className={styles.ctaHeading}>Have a project in mind?</h2>
            <a
              href="mailto:jenish.togadiya@gmail.com"
              className={styles.ctaButton}
            >
              Get in Touch
            </a>
          </div>

          <div className={styles.linksSection}>
            <div className={styles.navLinks}>
              <h3 className={styles.linksHeading}>Sitemap</h3>
              <Link href="/blogs">Blog</Link>
              <Link href="/papershelf">Papershelf</Link>
              <Link href="/projects">Projects</Link>
              <Link href="/about">About</Link>
            </div>
            <div className={styles.socialLinks}>
              <h3 className={styles.linksHeading}>Socials</h3>
              <a
                href="https://github.com/Jenish-1235"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/jenish-togadiya-a424b12bb/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin /> LinkedIn
              </a>
              <a
                href="https://www.instagram.com/_jenish_1235"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram /> Instagram
              </a>

              <a
              href='https://x.com/jenish_1235_'
              target="_blank"
              rel="noopener noreferrer"
              >
                  <FaTwitter /> Twitter/X
              </a>

              <a
                href="https://wa.me/919875035265"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp /> WhatsApp
              </a>



              <a href="mailto:jenishtogadiya549@gmail.com">
                <FaEnvelope /> Email
              </a>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>
            &copy; {new Date().getFullYear()} Jenish Togadiya. All rights
            reserved.
          </p>
        </div>
      </footer>
      {nextPage && <NextPageLoader path={nextPage.path} title={nextPage.title} />}
    </>
  );
};

export default Footer;
