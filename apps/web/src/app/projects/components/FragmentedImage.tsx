"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import styles from "./FragmentedImage.module.css";

interface FragmentedImageProps {
  src: string;
  alt: string;
  className?: string;
  "data-image-index"?: number;
}

const FragmentedImage = ({ 
  src, 
  alt, 
  className = "",
  "data-image-index": dataImageIndex 
}: FragmentedImageProps) => {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const imageElement = imageRef.current;
    if (!imageElement) return;

    // Initial state - hidden
    gsap.set(imageElement, { opacity: 0, scale: 1.1 });

    // Listen for custom animation trigger events
    const handleImageTrigger = (event: any) => {
      const { progress } = event.detail;
      animateImage(progress);
    };

    imageElement.addEventListener('triggerFragments', handleImageTrigger);

    // Auto-trigger animation after component mounts (fallback)
    const timer = setTimeout(() => {
      animateImage(0.5);
    }, 300);

    return () => {
      imageElement.removeEventListener('triggerFragments', handleImageTrigger);
      clearTimeout(timer);
    };
  }, [src]);

  const animateImage = (progress: number) => {
    const imageElement = imageRef.current;
    if (!imageElement) return;

    // Blur-to-clear transition with fade-in
    gsap.fromTo(imageElement, {
      opacity: 0,
      scale: 1.05,
      filter: "blur(20px)"
    }, {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      duration: 1.8,
      ease: "power2.out",
    });
  };

  return (
    <div 
      className={`${styles.imageContainer} ${className}`}
      data-image-index={dataImageIndex}
      ref={imageRef}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className={styles.mainImage}
        sizes="100vw"
        priority
      />
    </div>
  );
};

export default FragmentedImage;
