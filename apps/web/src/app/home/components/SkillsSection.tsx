import skills from '@/data/skills.json';
import styles from './SkillsSection.module.css';
import { motion, MotionValue } from 'framer-motion';

const SkillsSection = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
  return (
    <div className={styles.skillsSection}>
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
          <motion.div 
            key={skillCategory.category}
            className={styles.skillCard}
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <h3 className={styles.categoryTitle}>{skillCategory.category}</h3>
            <div className={styles.technologies}>
              {skillCategory.technologies.map((tech) => (
                <motion.div 
                  key={tech} 
                  className={styles.techItem}
                  whileHover={{ scale: 1.1, rotate: 3, color: 'var(--accent-color)' }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;
