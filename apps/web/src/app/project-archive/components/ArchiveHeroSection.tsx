"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { FiArrowDown, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import SplitText from "./SplitText";
import styles from "./ArchiveHeroSection.module.css";

const ArchiveHeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Hero content slides
  const heroSlides = [
    {
      title: "Project Archive",
      subtitle: "Explore my complete collection of work",
      description: "From web applications to mobile apps, APIs to tools - discover the full spectrum of my engineering journey.",
      accent: "archive"
    },
    {
      title: "Innovation Hub",
      subtitle: "Where ideas become reality",
      description: "Each project represents a unique challenge solved with creativity, technical expertise, and user-centered design.",
      accent: "innovation"
    },
    {
      title: "Code & Craft",
      subtitle: "Engineering with purpose",
      description: "Building systems that scale, interfaces that delight, and solutions that make a difference.",
      accent: "craft"
    }
  ];

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, heroSlides.length]);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  // Manual navigation
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after manual interaction
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  // Scroll animations
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  const handleScroll = () => {
    const projectGrid = document.getElementById("project-grid");
    if (projectGrid) {
      projectGrid.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.section
      ref={heroRef}
      className={styles.hero}
      style={{ opacity: heroOpacity, y: heroY }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Back to Projects Link */}
      <motion.div
        className={styles.backLink}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Link href="/projects" className={styles.backButton}>
          <FiArrowLeft />
          <span>Back to Projects</span>
        </Link>
      </motion.div>

      {/* Background Elements */}
      <div className={styles.backgroundElements}>
        <div className={styles.floatingShapes}>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={styles.floatingShape}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + (i % 3) * 30}%`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero Content */}
      <div className={styles.heroContent}>
        <div className={styles.carouselContainer}>
          {heroSlides.map((slide, index) => (
            <motion.div
              key={index}
              className={styles.slide}
              initial={{ opacity: 0, x: 100 }}
              animate={{
                opacity: currentSlide === index ? 1 : 0,
                x: currentSlide === index ? 0 : 100,
              }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.4, 0.25, 1],
              }}
            >
              <div className={styles.slideContent}>
                <SplitText
                  text={slide.title}
                  className={styles.heroTitle}
                  delay={50}
                  duration={0.8}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 60, rotateX: -90 }}
                  to={{ opacity: 1, y: 0, rotateX: 0 }}
                  threshold={0.1}
                  rootMargin="-50px"
                  textAlign="center"
                />
                
                <motion.p
                  className={styles.heroSubtitle}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {slide.subtitle}
                </motion.p>
                
                <motion.p
                  className={styles.heroDescription}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  {slide.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Carousel Navigation */}
        <div className={styles.carouselNav}>
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`${styles.navDot} ${
                currentSlide === index ? styles.active : ""
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className={styles.scrollIndicator}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <button onClick={handleScroll} className={styles.scrollButton}>
            <FiArrowDown />
            <span>Explore Projects</span>
          </button>
        </motion.div>
      </div>

      {/* Gradient Overlay */}
      <div className={styles.gradientOverlay} />
    </motion.section>
  );
};

export default ArchiveHeroSection; 