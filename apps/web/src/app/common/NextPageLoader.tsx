"use client";

import React, { useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import styles from './Footer.module.css';
import { useLoaderProgress } from '@/hooks/useLoaderProgress';

interface NextPageLoaderProps {
  path: string;
  title: string;
}

const NextPageLoader: React.FC<NextPageLoaderProps> = ({ path, title }) => {
  const router = useRouter();
  const loaderRef = useRef<HTMLDivElement>(null!);
  const progress = useLoaderProgress(loaderRef);

  useEffect(() => {
    if (progress >= 1) {
      // Use a timeout to ensure the user sees the full bar before redirecting
      const timer = setTimeout(() => {
        router.push(path);
      }, 200); // 200ms delay
      return () => clearTimeout(timer);
    }
  }, [progress, path, router]);

  return (
    <div ref={loaderRef} className={styles.loaderSection}>
      <div className={styles.loaderContent}>
        <h3 className={styles.loaderText}>
          Keep Scrolling <span>{title}</span>
        </h3>
        <div className={styles.loaderBar}>
          <motion.div
            className={styles.loaderProgress}
            style={{ scaleX: progress, transformOrigin: 'left' }}
          />
        </div>
      </div>
    </div>
  );
};

export default NextPageLoader;
