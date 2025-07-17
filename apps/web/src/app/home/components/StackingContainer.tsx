"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './StackingEffect.css';

const StackingContainer = ({ children }: { children: React.ReactNode[] }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start'],
  });

  const [hero, about] = children;

  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <>
      <div ref={targetRef} className="stacking-container">
        <motion.div className="sticky-hero" style={{ scale, opacity }}>
          {hero}
        </motion.div>
        <div className="scroll-over-content">
          {about}
        </div>
      </div>
      <div className="scroll-spacer" />
    </>
  );
};

export default StackingContainer;
