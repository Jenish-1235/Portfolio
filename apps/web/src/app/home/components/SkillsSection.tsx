import skills from '@/data/skills.json';
import styles from './SkillsSection.module.css';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import React, { useRef } from 'react';
import useIsMobile from '@/hooks/useIsMobile';

interface SkillCategory {
  category: string;
  technologies: string[];
}

const SkillsSection = () => {
  const isMobile = useIsMobile();
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
      onMouseMove={!isMobile ? handleMouseMove : undefined}
      onMouseLeave={!isMobile ? handleMouseLeave : undefined}
      className={styles.skillsSection}
      style={!isMobile ? {
        '--grad1x': grad1x,
        '--grad1y': grad1y,
        '--grad2x': grad2x,
        '--grad2y': grad2y,
      } as any : {}}
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
          <SkillCard 
            key={skillCategory.category} 
            skillCategory={skillCategory} 
            index={index} 
            isMobile={isMobile}
          />
        ))}
      </div>
    </motion.div>
  );
};

const SkillCard = ({ skillCategory, index, isMobile }: { skillCategory: SkillCategory, index: number, isMobile: boolean }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 50, damping: 20 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ['7deg', '-7deg']);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ['-7deg', '7deg']);

  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);
  
  const spotlightX = useTransform(cardX, (val) => `${val}px`);
  const spotlightY = useTransform(cardY, (val) => `${val}px`);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
    cardX.set(e.clientX - rect.left);
    cardY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
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
      style={!isMobile ? {
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
        '--spotlight-x': spotlightX,
        '--spotlight-y': spotlightY,
      } as any : {}}
      className={styles.skillCard}
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.3 }}
    >
      <div style={{ 
        transform: !isMobile ? 'translateZ(50px)' : 'none',
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
            <MagneticTechItem key={tech} isMobile={isMobile}>
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

const MagneticTechItem = ({ children, isMobile }: { children: React.ReactNode, isMobile: boolean }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (isMobile || !ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
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
