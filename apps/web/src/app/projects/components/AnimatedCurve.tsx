"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import styles from "./AnimatedCurve.module.css";

interface AnimatedCurveProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const AnimatedCurve = ({ containerRef }: AnimatedCurveProps) => {
  const [windowSize, setWindowSize] = useState({ width: 1600, height: 1200 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Smooth spring animation for path length
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const pathLength = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), springConfig);
  
  // Fade out as soon as the track reaches the right screen edge
  const stripOpacity = useSpring(
    useTransform(scrollYProgress, [0, 0.85, 1], [0, 0.7, 0]),
    { stiffness: 200, damping: 25 } // Quick fade when reaching right edge
  );

  // Create roller coaster-like smooth flowing curves
  const createRollerCoasterPath = (width: number, height: number) => {
    const w = width;
    const h = height;
    
    return [
      // Start from top-left corner
      `M-100,${h * 0.15}`,
      
      // First gentle hill up and down
      `Q${w * 0.1},${h * 0.05} ${w * 0.2},${h * 0.1}`,
      `Q${w * 0.25},${h * 0.12} ${w * 0.3},${h * 0.25}`,
      `Q${w * 0.35},${h * 0.4} ${w * 0.4},${h * 0.3}`,
      
      // Big swooping dip
      `Q${w * 0.45},${h * 0.2} ${w * 0.5},${h * 0.6}`,
      `Q${w * 0.55},${h * 1.0} ${w * 0.6},${h * 0.4}`,
      
      // Rolling hills section
      `Q${w * 0.65},${h * 0.2} ${w * 0.7},${h * 0.35}`,
      `Q${w * 0.75},${h * 0.5} ${w * 0.8},${h * 0.3}`,
      `Q${w * 0.85},${h * 0.1} ${w * 0.9},${h * 0.25}`,
      
      // Final swooping curve down and out
      `Q${w * 0.95},${h * 0.4} ${w + 50},${h * 0.7}`,
      `Q${w + 100},${h * 0.9} ${w + 150},${h + 50}`
    ].join(' ');
  };

  // Update window size on resize
  useEffect(() => {
    const updateSize = () => {
      setWindowSize({
        width: Math.max(1600, window.innerWidth * 1.2),
        height: Math.max(1200, window.innerHeight * 1.5)
      });
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const spiralPath = createRollerCoasterPath(windowSize.width, windowSize.height);

  return (
    <div className={styles.curveContainer}>
      <svg
        className={styles.curveSvg}
        viewBox={`0 0 ${windowSize.width} ${windowSize.height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Gradient for the fat strip */}
          <linearGradient id="spiralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d1e23c" stopOpacity="0.2" />
            <stop offset="25%" stopColor="#d1e23c" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#d1e23c" stopOpacity="0.8" />
            <stop offset="75%" stopColor="#d1e23c" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#d1e23c" stopOpacity="0.3" />
          </linearGradient>
          
          {/* Enhanced glow filter for rounded rectangle effect */}
          <filter id="spiralGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
            <feOffset dx="0" dy="1" result="offsetBlur"/>
            <feMerge> 
              <feMergeNode in="offsetBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Rounded rectangle mask for strip */}
          <filter id="roundedRect" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3"/>
            <feComponentTransfer>
              <feFuncA type="discrete" tableValues="0 .5 .5 .7 .7 1 1"/>
            </feComponentTransfer>
          </filter>
        </defs>

        {/* Roller coaster track with smooth flowing curves */}
        <motion.path
          d={spiralPath}
          stroke="url(#spiralGradient)"
          strokeWidth="40"
          fill="none"
          strokeLinecap="butt"
          strokeLinejoin="round"
          filter="url(#spiralGlow)"
          style={{
            pathLength,
            opacity: stripOpacity,
          }}
          initial={{ 
            pathLength: 0,
            opacity: 0
          }}
          transition={{
            pathLength: {
              duration: 0.2, // Much faster animation
              ease: "easeOut"
            },
            opacity: {
              duration: 0, // Quick fade in/out
              ease: "easeInOut"
            }
          }}
        />
      </svg>
    </div>
  );
};

export default AnimatedCurve;
