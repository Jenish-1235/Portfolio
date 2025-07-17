import skills from '@/data/skills.json';
import styles from './SkillsSection.module.css';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import React, { useRef } from 'react';

interface SkillCategory {
  category: string;
  technologies: string[];
}

const SkillsSection = () => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 50, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    const rect = (ref.current as HTMLDivElement).getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const grad1x = useTransform(mouseXSpring, [0, 1200], ['30%', '70%']);
  const grad1y = useTransform(mouseYSpring, [0, 500], ['20%', '80%']);
  const grad2x = useTransform(mouseXSpring, [0, 1200], ['70%', '30%']);
  const grad2y = useTransform(mouseYSpring, [0, 500], ['80%', '20%']);

  return (
    <motion.div 
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={styles.skillsSection}
      style={{
        '--grad1x': grad1x,
        '--grad1y': grad1y,
        '--grad2x': grad2x,
        '--grad2y': grad2y,
      } as React.CSSProperties}
    >
      <motion.h2 
        className={styles.title}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.2 }}
      >
        Skills & Technical Expertise
      </motion.h2>
      <div className={styles.skillsGrid}>
        {skills.skills.map((skillCategory, index) => (
          <SkillCard key={skillCategory.category} skillCategory={skillCategory} index={index} />
        ))}
      </div>
    </motion.div>
  );
};

const SkillCard = ({ skillCategory, index }: { skillCategory: SkillCategory, index: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 50, damping: 20 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ['7deg', '-7deg']);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ['-7deg', '7deg']);

  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
    cardX.set(e.clientX - rect.left);
    cardY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    cardX.set(0);
    cardY.set(0);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
        '--spotlight-x': useTransform(cardX, (val) => `${val}px`),
        '--spotlight-y': useTransform(cardY, (val) => `${val}px`),
      } as React.CSSProperties}
      className={styles.skillCard}
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.3 }}
    >
      <div style={{ 
        transform: 'translateZ(50px)',
        animationDelay: `${index * 0.2}s` 
      }}>
        <h3 className={styles.categoryTitle}>{skillCategory.category}</h3>
        <motion.div 
          className={styles.technologies}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          {skillCategory.technologies.map((tech: string) => (
            <MagneticTechItem key={tech}>
              <motion.div
                className={styles.techItem}
                variants={itemVariants}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {tech}
              </motion.div>
            </MagneticTechItem>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

const MagneticTechItem = ({ children }: { children: React.ReactNode }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      animate={{ x, y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

export default SkillsSection;
