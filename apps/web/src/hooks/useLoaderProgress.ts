"use client";

import { useState, useEffect } from 'react';
import { useScroll, useMotionValueEvent, useSpring } from 'framer-motion';

const DECAY_RATE = 0.98; // Slower decay
const SCROLL_SENSITIVITY = 1.5; // Increase the effect of scrolling

export const useLoaderProgress = (targetRef: React.RefObject<HTMLElement>) => {
  const [progress, setProgress] = useState(0);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end 0.8'], // Start filling later
  });

  const smoothedProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useMotionValueEvent(smoothedProgress, "change", (latest) => {
    // Directly influence progress with the scroll value
    setProgress(latest * SCROLL_SENSITIVITY);
  });

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      setProgress(prev => {
        // Apply decay only if the user is not actively scrolling to the end
        if (smoothedProgress.get() < 0.9) {
          return prev * DECAY_RATE;
        }
        return prev;
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [smoothedProgress]);

  return Math.min(1, progress); // Ensure progress doesn't exceed 1
};
